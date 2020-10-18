import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import  ConfigPriceApi  from "../../../services/ConfigPriceApi";
import { Notification } from "../../../services/Notification";

export class ConfigPriceDialog extends Component {
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
        ConfigPriceApi.update(submitData).then(res => {
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
      ConfigPriceApi.getById(this.props.id).then(res => {
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
          title={this.props.isEdit ? "Update ConfigPrice" : "Add ConfigPrice"}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
		<Form className="dialog-form" {...formItemLayout}>

								   <Form.Item label="configPriceId">
										{getFieldDecorator("configPriceId")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="categoryId">
										{getFieldDecorator("categoryId")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="roleSiteId">
										{getFieldDecorator("roleSiteId")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="basicPrice">
										{getFieldDecorator("basicPrice")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="price">
										{getFieldDecorator("price")(								
											  <Input />
										)}
									</Form.Item>   
							                    
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(ConfigPriceDialog);

