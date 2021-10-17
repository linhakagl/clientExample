import React, { Component } from "react";
import { Table, Divider, Popconfirm ,Button, Icon} from "antd";

export class PaymentHistoryListTable extends Component {
  onEdit = (text, record) => {
    if (this.props.onEditItem) {
      this.props.onEditItem(true, text);
    }
  };

  onDelete = (text, record) => {
    if(this.props.onDeleteItem){
      this.props.onDeleteItem(text)
    }
  };

  render() {
    const columns = [
	  {
        title: "STT",
        dataIndex: "stt",
        key: "1",
        width: "50px"
      },

	  		{
	  		  title: "paymentID",
	  		  dataIndex: "paymentID",
	  		  key: "paymentID"
	  		},
	  	  
	  		{
	  		  title: "userID",
	  		  dataIndex: "userID",
	  		  key: "userID"
	  		},
	  	  
	  		{
	  		  title: "requestID",
	  		  dataIndex: "requestID",
	  		  key: "requestID"
	  		},
	  	  
	  		{
	  		  title: "paymentMethod",
	  		  dataIndex: "paymentMethod",
	  		  key: "paymentMethod"
	  		},
	  	  
	  		{
	  		  title: "paymentType",
	  		  dataIndex: "paymentType",
	  		  key: "paymentType"
	  		},
	  	  
	  		{
	  		  title: "quantity",
	  		  dataIndex: "quantity",
	  		  key: "quantity"
	  		},
	  	  
	  		{
	  		  title: "createdDate",
	  		  dataIndex: "createdDate",
	  		  key: "createdDate"
	  		},
	  	  
	  		{
	  		  title: "createdBy",
	  		  dataIndex: "createdBy",
	  		  key: "createdBy"
	  		},
	  	  
	  		{
	  		  title: "source",
	  		  dataIndex: "source",
	  		  key: "source"
	  		},
	  	  
      {
        title: "Action",
        key: "4",
        dataIndex: "id",
        render: (text, record) => (
           <span>
            <Button
              type="link"
              onClick={() => {
                this.onEdit(text, record);
              }}
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => this.onDelete(text, record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <>
        <Table
          columns={columns}
          dataSource={this.props.data}
          rowKey="id"
          pagination={false}
          loading={this.props.loading}
		  className='table-custom table-striped'
          size='small'
        />
      </>
    );
  }
}

export default PaymentHistoryListTable;
