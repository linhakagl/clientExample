import React, { Component } from 'react'
import  PageName  from "../../common/CommonComponents/PageName"
import {  Card } from "antd";
import {  AppContext } from "../../context";
import BankItem from './BankItem'
export class PaymentInfo extends Component {
    static contextType = AppContext;
    
    componentDidUpdate () {
        console.log(this.context) 
    }
    render() {
        return (
            <>
                <PageName text='Thanh Toán' />
                <div style={{margin : '20px'}}>
                    <Card title="Nạp Tiền" bordered={false}>
                        <h3>Thông tin ngân hàng:</h3>
                        {this.context.siteInfo ? (
                            this.context.siteInfo.bankInfo.map(item => {
                                return <BankItem {...item}/>
                            })  
                        ): null}
                        <h3>Nội dung chuyển khoản:</h3>
                    </Card>
                </div>

              
                <div className="page-content">

               
                </div>
            </>
        )
    }
}

export default PaymentInfo
