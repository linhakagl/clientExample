import React, { Component } from "react";
import { Modal, Form, Input } from "antd";
import  ConfigurationApi  from "../../../services/ConfigurationApi";
import { Notification } from "../../../services/Notification";

export class ConfigurationDialog extends Component {
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
        ConfigurationApi.update(submitData).then(res => {
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
      ConfigurationApi.getById(this.props.id).then(res => {
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
          title={this.props.isEdit ? "Update Configuration" : "Add Configuration"}
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
		<Form className="dialog-form" {...formItemLayout}>

								   <Form.Item label="configurationID">
										{getFieldDecorator("configurationID")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="configKey">
										{getFieldDecorator("configKey")(								
											  <Input />
										)}
									</Form.Item>   
							
								   <Form.Item label="value">
										{getFieldDecorator("value")(								
											  <Input />
										)}
									</Form.Item>   
							                    
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create({ name: "form" })(ConfigurationDialog);

