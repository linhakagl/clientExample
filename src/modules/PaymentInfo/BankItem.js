import React from 'react'
import {  Card } from "antd";

function BankItem(props) {
    console.log(props)
    return (
        <div>
            <Card style={{ width: 300, margin: 'auto' }}>
                <p>Ngân hàng:   <span className='text-info'>{props.bankName}</span></p>
                <p>Chi Nhánh:   <span className='text-info'>{props.bankBranch}</span>	</p>
                <p>Số Tài Khoản:   <span className='text-info'>{props.bankNumber}</span></p>
                <p>Tên Tài Khoản:  <span className='text-info'>{props.bankAccount}</span></p>
            </Card>
        </div>
    )
}

export default BankItem
