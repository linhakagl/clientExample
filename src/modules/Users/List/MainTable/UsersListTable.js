import React, { Component } from "react";
import { Table, Divider, Popconfirm ,Button, Icon} from "antd";

export class UsersListTable extends Component {
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

  onConfigRole = (text, record) => {
	if(this.props.onConfigRole){
      this.props.onConfigRole(text)
    }
  }

  render() {
    const columns = [
			{
				title: "STT",
				dataIndex: "stt",
				key: "1",
				width: "50px"
			},
	  		{
	  		  title: "Tài khoản",
	  		  dataIndex: "account",
	  		  key: "account"
	  		},
	  		{
	  		  title: "Email",
	  		  dataIndex: "email",
	  		  key: "email"
	  		},
	  	  
	  		{
	  		  title: "Cấp bậc",
	  		  dataIndex: "roleName",
	  		  key: "roleName"
	  		},
	  	  
	  		{
	  		  title: "Current Coin",
	  		  dataIndex: "coin",
	  		  key: "coin"
	  		},
	  	  
			{
				title: "Action",
				key: "4",
				dataIndex: "userID",
				render: (text, record) => (
				<span>
					<Button
						type="primary"
						size='small'
						className='btn-orange'
						onClick={() => {
							this.onConfigRole(text, record);
						}}
					>
						<Icon type="usergroup-add" />
						Cài đặt đại lý
					</Button>
					<Divider type="vertical" />
					<Button
						type="primary"
						size='small'
						onClick={() => {
							this.onEdit(text, record);
						}}
						className='btn-info'
					>
						<Icon type="edit" />
						Chỉnh sửa
					</Button>
					<Divider type="vertical" />
					<Popconfirm
					title="Bạn có chắc muốn xóa?"
					onConfirm={() => this.onDelete(text, record)}
					okText="Có"
					cancelText="Không"
					>
					<Button type="danger" size='small'>
						<Icon type="delete" />
						Xóa
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

export default UsersListTable;
