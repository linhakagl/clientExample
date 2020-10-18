import React, { Component } from 'react'
import { Modal, Form ,InputNumber  } from "antd";
import { AppContext } from "../../../../context"
import CategoryApi from './../../../../services/CategoryApi';
import { Notification } from "../../../../services/Notification";

export class ConfigToolDialog extends Component {
    static contextType = AppContext;

    constructor(props) {
      super(props);
      this.Notification = new Notification();
    }

    state = {
      formData : []
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => { 
          if(err){
            return;
          }
          let submitData = Object.keys(values).map(key => {
              const item = {};
              item.code = key;
              item.price = values[key];
              item.siteId = this.context.siteInfo.siteId;
              item.roleId = this.props.SelecttedRole;
              return item;

          });
        
           if (this.props.onCloseDialog) {
            CategoryApi.UpdateConfigPrice(submitData).then(res => {
              if (res) {
                         this.Notification.success("Lưu thành công!");
                         this.props.onCloseDialog(true);
                }
            })       
           }
        })   
      };
    
      handleCancel = () => {
        if (this.props.onCloseDialog) {
          this.props.onCloseDialog(false);
        }
      };

      componentDidMount() {       
        this.loadData();
      }

      loadData = async ()=> {
        var res = await  CategoryApi.GetListConfigPriceByTargetId(this.context.siteInfo.siteId ,this.props.targetTypeId , this.props.SelecttedRole);
        if(res && res.status === 200){
          this.setState({formData : res.data})
          const dataInnit = res.data.reduce((acc, cur) => {
            acc[cur.code] = cur.price;
            return acc;
          }, {})
          this.props.form.setFieldsValue(dataInnit);
        }
      }

    render() {
        
        const { getFieldDecorator } = this.props.form;       
        return (
            <>
            <Modal
              title={"Cập Nhật Giá Mới"}
              visible={true}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText="Đóng"
              okText="Lưu"
            >
            <Form className="dialog-form" layout="vertical">
                  {this.state.formData.map((item, index) => {
                     return <Form.Item label={item.name} key={index}>
                              {getFieldDecorator(`${item.code}`)(								
                                    <InputNumber 
                                      min={0}
                                      max={1000000}
                                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                      //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                      />
                              )}
                          </Form.Item>
                  })}
                                     
                                                    
              </Form>
            </Modal>
          </>
        )
    }
}

export default Form.create({ name: "formDialog" })(ConfigToolDialog)
