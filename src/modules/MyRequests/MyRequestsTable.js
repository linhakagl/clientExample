import React from 'react'
import { Table, Icon, Button } from 'antd'
import { formatNumber, displayDateAndTime } from '../../common/utility';

export default function MyRequestsTable(props) {
  function showDetail(id) {
    if (props.showDetail) {
      props.showDetail(id);
    }
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "1",
      width: "50px"
    },
    {
      title: "Loại đơn hàng",
      dataIndex: "categroryTypeName",
      key: "categroryTypeName"
    },
    {
      title: "Bảo hành",
      dataIndex: "isGuarantee",
      key: "isGuarantee",
      render: text => {
        if (text) {
          return <Icon type="check" style={{ color: 'red' }} />
        }
      },
      width: 100
    },
    {
      title: "Giá tiền",
      dataIndex: "totalCoin",
      key: "totalCoin",
      render: text => formatNumber(text),
      className: 'td-money',
      width: '10%'
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: text => displayDateAndTime(text)
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Action",
      key: "4",
      dataIndex: "requestID",
      render: (text, record) => (
        <Button type="link" onClick={() => showDetail(text)}>
          Xem chi tiết
        </Button>
      )
    }
  ];

  return (
    <>
      <Table
        rowKey={record => record.requestID}
        columns={columns}
        dataSource={props.data}
        rowKey="id"
        pagination={false}
        loading={props.loading}
        className='table-custom table-striped'
        size='small'
      />
    </>
  )
}
