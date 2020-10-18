import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import  BankInfoApi  from "../../../../services/BankInfoApi";
import { Notification } from "../../../../services/Notification";
import { AppContext } from "../../../../context"

export class BankInfoDialog extends Component {
  constructor(props) {
    super(props);
    this.Notification = new Notification();
  }
  static contextType = AppContext;

  handleOk = () => {
    this.props.form.validateFields((err, values) => { 
      if(err){
        return;
      }

       let submitData = {...values};
       submitData.id = this.props.id;
       submitData.siteId = this.context.siteInfo.siteId;
       debugger;
      submitData.id = this.props.id;
      if (this.props.onCloseDialog) {
        BankInfoApi.update(submitData).then(res => {
          if (res) {
            this.Notification.success("Lưu thành công!");
            this.props.onCloseDialog(true);
          }
        });
      }
    })   
  };

  handleCancel = () => {
    if (this.props.onCloseDialog) {
      this.props.onCloseDialog(false);
    }
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.id) {
      BankInfoApi.getById(this.props.id).then(res => {
        if (res && res.status === 200) {
          let dataInnit = res.data;
          this.props.form.setFieldsValue(dataInnit);
        }
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <>
        <Modal
          title={this.props.isEdit ? "Cập Nhật Tài Khoản Ngân Hàng" : "Thêm Tài Khoản Ngân Hàng"}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="Đóng"
          okText="Lưu"
        >
		<Form className="dialog-form" {...formItemLayout}>

								   
							
								   <Form.Item label="Ngân Hàng:">
										{getFieldDecorator("bankName")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="Tên Chủ Tài Khoản:">
										{getFieldDecorator("bankAccount")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="Số Tài Khoản:">
										{getFieldDecorator("bankNumber")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="Chi Nhánh:">
										{getFieldDecorator("bankBranch")(								
											  <Input />
										)}
									</Form.Item>   
							                    
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(BankInfoDialog);

