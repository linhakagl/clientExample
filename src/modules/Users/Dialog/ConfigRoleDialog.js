import React, { Component } from 'react'
import { Modal, Form, Input,Select } from "antd";
import  UsersApi  from "../../../services/UsersApi";
import  RolesApi  from "../../../services/RolesApi";
import { Notification } from "../../../services/Notification";

export class ConfigRoleDialog extends Component {
    constructor(props) {
        super(props);
        this.Notification = new Notification();
      }
    state = {
        roles: []
    }
    handleOk = () => {
        this.props.form.validateFields((err, values) => { 
            if(err){
                return;
            }

            let submitData = {...values};
            submitData.userID = this.props.id;
            if (this.props.onCloseDialog) {
                UsersApi.updateUserRole(submitData).then(res => {
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
                let dataInnit = res.data;
                this.props.form.setFieldsValue(dataInnit);
                }
            });
        }
       this.loadAllRole();
    }

    loadAllRole = async () =>{
      var res = await  RolesApi.listAll();
      if(res && res.status === 200) {
          this.setState({roles : res.data});          
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
                title='Chỉnh Sửa Level Khách Hàng'
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                cancelText="Đóng"
                okText="Lưu"
            >
		        <Form className="dialog-form" {...formItemLayout}>

								   <Form.Item label="Tên tài khoản">
										{getFieldDecorator("account")(								
											  <Input disabled/>
										)}
									</Form.Item>   
							
								   <Form.Item label="Cấp độ hiện tại">
										{getFieldDecorator("roleName")(								
											  <Input disabled/>
										)}
									</Form.Item>   
							
								   <Form.Item label="Cài đặt cấp độ">
										{getFieldDecorator("roleId", {
                                            rules: [{ required: true, message: 'Hãy chọn trường này!' }],
                                        })(								
											  <Select
                                                allowClear
                                                placeholder="Chon cấp độ"                                           
                                                >
                                                {this.state.roles.map((c, index) => (
                                                    <Select.Option value={c.roleId} key={index}>{c.roleName}</Select.Option>
                                                ))}
                                            </Select>
										)}
									</Form.Item>   
							
							                    
                </Form>
            </Modal>
      </>
        )
    }
}

export default  Form.create({ name: "form" })(ConfigRoleDialog)

