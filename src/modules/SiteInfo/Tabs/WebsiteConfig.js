import React, {useContext, useEffect} from 'react'
import {  Form, Input,Row,Col , Button , Icon} from "antd";
import SiteInfoApi from '../../../services/SiteInfoApi'
import { Notification } from "../../../services/Notification";
import { AppContext } from "../../../context"

const { TextArea } = Input;

function WebsiteConfig(props) {
	const appContext = useContext(AppContext)

	useEffect(() => {
		props.form.setFieldsValue(appContext.siteInfo)
	}, [])

    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 9 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
	  };
	  
	function Save (){
		props.form.validateFields((err, values) => { 
			if(err){
			  return;
			}
	  
			let submitData = {...values};
			submitData.siteId = appContext.siteInfo.siteId;
			console.log(appContext)
			console.log(submitData)
				SiteInfoApi.update(submitData).then(res => {
			 	if (res) {
				   new Notification().success("Lưu thành công!");
				   window.location.reload();
			 	}
			   });
		  })   
	}
    return (
        <div>
            <p className='card-subtitle'>Bạn có thể chỉnh sửa các 
                    <span className='code'> thông tin liên hệ </span> <span className='code'> giao diện, logo, favicon </span>
                    của trang
            </p>
            <Form className="dialog-form" {...formItemLayout}>

			<Row >
				<Col span={12}>
						<Form.Item label="Tên trang web:">
										{getFieldDecorator("siteName", {
                                            rules: [{ required: true, message: 'Hãy nhập trường này!' }],
                                        })(								
											  <Input />
										)}
						</Form.Item>   
				</Col>
				<Col span={12}>
						{/* <Form.Item label="Tên đơn vị tiền:">
										{getFieldDecorator("coin", {
                                            rules: [{ required: true, message: 'Hãy nhập trường này!' }],
                                        })(								
											  <Input />
										)}
						</Form.Item>  */}
						<Form.Item label="Email liên hệ:">
										{getFieldDecorator("email", {
                                            rules: [{ required: true, message: 'Hãy nhập trường này!' }],
                                        })(								
											  <Input/>
										)}
						</Form.Item>  
				</Col>
			</Row>
			<Row >
				<Col span={12}>
					<Form.Item label="Facebook liên hệ:">
										{getFieldDecorator("facebook")(								
											  <Input />
										)}
					</Form.Item>  
				</Col>
				<Col span={12}>
						<Form.Item label="Link Facebook chat:">
										{getFieldDecorator("facebookChat")(								
											  <Input />
										)}
						</Form.Item>    
				</Col>
			</Row>				
								   
			<Row >
				<Col span={12}>
					<Form.Item label="Số điện thoại liên hệ:">
										{getFieldDecorator("phoneNumber")(								
											  <Input />
										)}
						</Form.Item>    
				</Col>
				<Col span={12}>
						<Form.Item label="Link đến trang hướng dẫn:">
										{getFieldDecorator("guidePage")(								
											  <Input />
										)}
						</Form.Item> 
				</Col>
			</Row>				
								     
			<Row >
				<Col span={12}>
					<Form.Item label="Tên hiển thị cột bên trái:">
						{getFieldDecorator("siteHeader")(								
							<Input />
						)}
					</Form.Item>   
				</Col>
				<Col span={12}>
					<Form.Item label="Chữ hiển thị cuối trang:">
						{getFieldDecorator("siteFooter")(								
							<Input />
						)}
					</Form.Item>  
				</Col>
			</Row>				
			<Row >
				<Col span={12}>
					<Form.Item label="Nhập đường dẫn của ảnh logo:">
						{getFieldDecorator("logo")(								
							<TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
							)}
					</Form.Item>   
				</Col>
				<Col span={12}>
					<Form.Item label="Nhập đường dẫn của ảnh favicon:">
						{getFieldDecorator("favicon")(								
							<TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
						)}
					</Form.Item> 
				</Col>
			</Row>					   
                                 
            <Row >
				<Col span={12}>
						<Form.Item label="Mô tả :">
										{getFieldDecorator("description")(								
											  <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
										)}
						</Form.Item> 
				</Col>
				<Col span={12}>					  
					<Form.Item label="Keyword :">
										{getFieldDecorator("siteKeyword")(								
											  <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
										)}
					</Form.Item>  
				</Col>
			</Row>	      
			<Row>
				<Col span={24}>
					<Button type='primary' style={{float:'right'}} onClick={Save}><Icon type="save" /> Lưu Thông Tin</Button>	
				</Col>
			</Row>             
          </Form>
        </div>
    )
}

export default Form.create({ name: "WebsiteConfigForm" })(WebsiteConfig)
