import React, { Component } from "react";
import { Modal, Form, Input , InputNumber } from "antd";
import  UsersApi  from "../../../services/UsersApi";
import { Notification } from "../../../services/Notification";
import UserPicker  from "../../../common/CommonComponents/UserPicker";
import { AppContext } from "../../../context"

export class AddCoinDialog extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.Notification = new Notification();
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => { 
      if(err){
        return;
      }

      let submitData = {...values};
      submitData.siteId  = this.context.siteInfo.siteId;
      this.submitForm(submitData)
   
    })   
  };

  submitForm = async (submitData)=> {
    var res = await UsersApi.AdminAddCoin(submitData);
    if(res && res.status === 200){
        this.props.onCloseDialog(true)
    }
  }

  handleCancel = () => {
    if (this.props.onCloseDialog) {
      this.props.onCloseDialog(false);
    }
  };

  componentDidMount() {
       
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    };
    return (
      <>
        <Modal
          title="Nạp tiền"
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="Đóng"
          okText="Lưu"
        >
		        <Form className="dialog-form" {...formItemLayout}>

								  
							
								   <Form.Item label="Tên tài khoản">
										{getFieldDecorator("userId", {
                                            rules: [{ required: true, message: 'Hãy chọn trường này!' }],
                                        })(								
											  <UserPicker />
										)}
									</Form.Item>   
							
								   <Form.Item label="Số Coin">
										{getFieldDecorator("coin", {
                                            rules: [{ required: true, message: 'Hãy nhập trường này!' }],
                                        })(								
											  <InputNumber />
										)}
									</Form.Item>   
							
								   
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(AddCoinDialog);

