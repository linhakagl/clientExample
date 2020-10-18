import React from 'react'
import {  Form, Input,InputNumber } from "antd";
const { TextArea } = Input;

function UiConfig(props) {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 }
        }
      };
    return (
        <div>
            <p className='card-subtitle'>Bạn có thể tùy chọn 
                    <span className='code'> giao diện, logo, favicon </span>
                    của trang tại đây
            </p>
            <Form className="dialog-form" {...formItemLayout}>							  
							
            <Form.Item label="Tên hiển thị cột bên trái:">
                {getFieldDecorator("account")(								
                    <Input />
                )}
            </Form.Item>   

            <Form.Item label="Chữ hiển thị cuối trang:">
                {getFieldDecorator("account")(								
                    <Input />
                )}
            </Form.Item>  

             <Form.Item label="Nhập đường dẫn của ảnh logo:">
                {getFieldDecorator("account")(								
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                    )}
            </Form.Item>   
            
            <Form.Item label="Nhập đường dẫn của ảnh favicon:">
                {getFieldDecorator("phoneNumber")(								
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                )}
                </Form.Item>    
            </Form>
        </div>
    )
}

export default  Form.create({ name: "UiConfigForm" })(UiConfig)
