import React from 'react'
import { Modal, Button } from 'antd'
import RequestDetailTable from './RequestDetailTable';

export default function RequestDetailDialog(props) {
  function handleCancel(){
    if(props.handleCancel){
      props.handleCancel();
    }
  }

  return (
    <Modal
      width={800}
      title="Thông tin đơn hàng"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Đóng
        </Button>
      ]}
      visible={true}
      onCancel={handleCancel}
    >
      <RequestDetailTable data={props.data}/>
    </Modal>
  )
}
