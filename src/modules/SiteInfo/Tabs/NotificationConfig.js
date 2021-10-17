import React from 'react'
import {  Form, Input,InputNumber } from "antd";
const { TextArea } = Input;

function NotificationConfig(props) {
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
        <>
        <div>
            <p className='card-subtitle'>Thông báo sẽ được hiển ở trang <span className='code'>Home của Site</span></p>
            <p className='card-subtitle'>Không muốn thông báo bạn hãy <span className='code'>Xóa tiêu đề, nội dung và Lưu</span></p>
        </div>
        <Form className="dialog-form" {...formItemLayout}>							  
							
            <Form.Item label="Tiêu đề thông báo:">
                {getFieldDecorator("account")(								
                    <Input />
                )}
            </Form.Item>   
            
            <Form.Item label="Nội dung thông báo:">
                {getFieldDecorator("phoneNumber")(								
                    <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
                )}
            </Form.Item>    
        </Form>
        </>
        
    )
}

export default Form.create({ name: "NotificationConfigForm" })(NotificationConfig)
