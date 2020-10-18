import React, { Component } from "react";
import { Modal, Form, Input,InputNumber } from "antd";
import  UsersApi  from "../../../services/UsersApi";
import { Notification } from "../../../services/Notification";

export class UsersDialog extends Component {
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
      submitData.userID = this.props.id;
      console.log(submitData)
      if (this.props.onCloseDialog) {
        UsersApi.update(submitData).then(res => {
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
    if (this.props.id) {
      UsersApi.getById(this.props.id).then(res => {
        if (res && res.status === 200) {
          console.log(this.props.form);
          debugger;
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
          title="Cập Nhật Khách Hàng"
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="Đóng"
          okText="Lưu"
        >
		        <Form className="dialog-form" {...formItemLayout}>

								  
							
								   <Form.Item label="Tên tài khoản">
										{getFieldDecorator("account", {
                                            rules: [{ required: true, message: 'Hãy nhập trường này!' }],
                                        })(								
											  <Input disabled/>
										)}
									</Form.Item>   
							
								   <Form.Item label="Số Coin">
										{getFieldDecorator("coin")(								
											  <InputNumber />
										)}
									</Form.Item>   
							
								   <Form.Item label="Email">
										{getFieldDecorator("email", {
                                            rules: [{ required: true, message: 'Hãy nhập trường này!' }],
                                        })(								
											  <Input disabled/>
										)}
									</Form.Item>   
                  <Form.Item label="Facebook">
										{getFieldDecorator("fuid")(								
											  <Input />
										)}
									</Form.Item>  
								   <Form.Item label="Họ và Tên">
										{getFieldDecorator("fullName")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="Số Điện Thoại">
										{getFieldDecorator("phoneNumber")(								
											  <Input />
										)}
									</Form.Item>    
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(UsersDialog);

