import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import  CategoryApi  from "../../../services/CategoryApi";
import { Notification } from "../../../services/Notification";

export class CategoryDialog extends Component {
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
        CategoryApi.update(submitData).then(res => {
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
      CategoryApi.getById(this.props.id).then(res => {
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
          title={this.props.isEdit ? "Update Category" : "Add Category"}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
		<Form className="dialog-form" {...formItemLayout}>

								   <Form.Item label="id">
										{getFieldDecorator("id")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="name">
										{getFieldDecorator("name")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="type">
										{getFieldDecorator("type")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="targetTypeId">
										{getFieldDecorator("targetTypeId")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="actionId">
										{getFieldDecorator("actionId")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="status">
										{getFieldDecorator("status")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="isGuarantee">
										{getFieldDecorator("isGuarantee")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="code">
										{getFieldDecorator("code")(								
											  <Input />
										)}
									</Form.Item>   
							                    
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(CategoryDialog);

