import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import  PaymentHistoryApi  from "../../../services/PaymentHistoryApi";
import { Notification } from "../../../services/Notification";

export class PaymentHistoryDialog extends Component {
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
      submitData.id = this.props.id;
      if (this.props.onCloseDialog) {
        PaymentHistoryApi.update(submitData).then(res => {
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
      PaymentHistoryApi.getById(this.props.id).then(res => {
        if (res && res.status === 200) {
          console.log(this.props.form);
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
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    return (
      <>
        <Modal
          title={this.props.isEdit ? "Update PaymentHistory" : "Add PaymentHistory"}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
		<Form className="dialog-form" {...formItemLayout}>

								   <Form.Item label="paymentID">
										{getFieldDecorator("paymentID")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="userID">
										{getFieldDecorator("userID")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="requestID">
										{getFieldDecorator("requestID")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="paymentMethod">
										{getFieldDecorator("paymentMethod")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="paymentType">
										{getFieldDecorator("paymentType")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="quantity">
										{getFieldDecorator("quantity")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="createdDate">
										{getFieldDecorator("createdDate")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="createdBy">
										{getFieldDecorator("createdBy")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="source">
										{getFieldDecorator("source")(								
											  <Input />
										)}
									</Form.Item>   
							                    
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(PaymentHistoryDialog);

