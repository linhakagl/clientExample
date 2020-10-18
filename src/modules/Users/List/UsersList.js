import { Row, Col, Input, Button, Pagination } from "antd";
import UsersListTable from "./MainTable/UsersListTable";
import UsersDialog from "../Dialog/UsersDialog";
import ConfigRoleDialog from "../Dialog/ConfigRoleDialog";
import AddCoinDialog from "../Dialog/AddCoinDialog";
import React from "react";
import  UsersApi  from "../../../services/UsersApi";
import { Notification } from "../../../services/Notification";
import { withLoading } from "../../../common/HOC/WithLoading";
import ListBaseComponent from "../../../common/ListBaseComponent";
import  PageName  from "../../../common/CommonComponents/PageName"
import { AppContext } from "../../../context"

export class UsersList extends ListBaseComponent {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.Notification = new Notification();
    this.searchRef = React.createRef();
  }

  state = {
    data: [],
    filter: {
      paging: {
        pageSize: 15,
        currentPage: 1,
        rowsCount: 0
      }
    },
    UsersDialog: {
      show: false,
      isEdit: false,
      id: 0
    },
    ConfigRoleDialog: {
      show: false,
      id: 0
    },
    AddCoinDialog : {
      show: false,
      id: 0
    }
  };
  componentDidMount() {
    this.onSearch();
  }

  onSearch = (currentPage = 1) => {
    this.props.showLoading();
    let filter = { ...this.state.filter };
    filter.paging.currentPage = currentPage;
    filter.search = this.searchRef.current.input.value;
    filter.siteId  = this.context.siteInfo.siteId
    UsersApi.list(filter).then(res => {
      this.props.hideLoading();
      if (res && res.status === 200) {
        if (res.data) {
          let filter = { ...this.state.filter };
          filter.paging = res.data.paging;
          let data = res.data.list;
          let stt = res.data.paging.startRow;
          for (let item of data) {
            item.stt = stt;
            stt++;
          }
          this.setState({ data: res.data.list, filter: filter });
        }
      } else {
        if (res) {
          this.Notification.error(res.message);
        }
      }
    });
  };

  _OpenAddDialog = (isEdit = false, id = 0) => {
    let dialog = { ...this.state.UsersDialog };
    dialog.show = true;
    dialog.isEdit = isEdit;
    dialog.id = id;
    this.setState({ UsersDialog: dialog });
  };

  _OpenAddCoinDialog = ( id = 0) => {
    let dialog = { ...this.state.AddCoinDialog };
    dialog.show = true;
    dialog.id = id;
    this.setState({ AddCoinDialog: dialog });
  };

  _CloseAddCoinDialog = (callBack = false)=> {
      let dialog = { ...this.state.AddCoinDialog };
      dialog.show = false;
      dialog.id = 0;
      this.setState({ AddCoinDialog: dialog });
      if (callBack) {
        setTimeout(() => {
          this.onSearch();
      }, 100);
    }
  }

  _onConfigRole = (id)=>{
    let dialog = { ...this.state.ConfigRoleDialog };
    dialog.show = true;
    dialog.id = id;
    this.setState({ ConfigRoleDialog: dialog });
  }

  _CloseConfigRoleDialog = (callBack = false)=> {
        let dialog = { ...this.state.ConfigRoleDialog };
        dialog.show = false;
        dialog.id = 0;
        this.setState({ ConfigRoleDialog: dialog });
        if (callBack) {
          setTimeout(() => {
            this.onSearch();
        }, 100);
    }
  }

  _CloseAddDialog = (callBack = false) => {
    let dialog = { ...this.state.UsersDialog };
    dialog.show = false;
    dialog.isEdit = false;
    dialog.id = 0;
    this.setState({ UsersDialog: dialog });
    if (callBack) {
      setTimeout(() => {
        this.onSearch();
      }, 100);
    }
  };

  onDeleteItem = id => {
    UsersApi.delete(id).then(res => {
      if (res && res.status === 200) {
        this.Notification.success("Xóa thành công");
        this.onSearch();
      }
    });
  };
  render() {
    return (
      <>        
		<PageName text='Danh Sách Khách Hàng' />
        <div className="page-content">
          <div className="search-div">
            <Row gutter={16}>
              <Col span={12} sm={12} md={6} xs={24}>
                <Input
                  placeholder="Tìm kiếm"
                  onPressEnter={()=>this.onSearch(1)}
                  ref={this.searchRef}
                />
              </Col>
              <Col span={12} sm={12} md={18} xs={24}>
                <div className="btn-group-search">
                   <Button
                    icon="dollar"
                   	className='btn-info mr-10'
                   	type="primary"
                    onClick={this._OpenAddCoinDialog}
                  >
                    Nạp tiền
                  </Button>
                  <Button
                    icon="search"
                    loading={this.props.loading}
                    onClick={() => this.onSearch(1)}
                  >
                    Tìm kiếm
                  </Button>
                  
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <UsersListTable
              data={this.state.data}
              onEditItem={this._OpenAddDialog}
              onDeleteItem={this.onDeleteItem}
              onConfigRole={this._onConfigRole}
            />
            <div className="page-div">
              <Pagination
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                showTotal={(total, range) => range[0] + ' - ' + range[1] + ' of ' + total + ' items'}                
                onChange={this.onPageChange}
                defaultCurrent={1}
                total={this.state.filter.paging.rowsCount}
				        pageSizeOptions={['15', '20', '30', '40']}
                defaultPageSize={15}
              />
            </div>
          </div>
        </div>

        {this.state.UsersDialog.show ? (
          <UsersDialog
            onCloseDialog={this._CloseAddDialog}
            {...this.state.UsersDialog}
          />
        ) : null}
         {this.state.ConfigRoleDialog.show ? (
          <ConfigRoleDialog
            onCloseDialog={this._CloseConfigRoleDialog}
            {...this.state.ConfigRoleDialog}
          />
        ) : null}
         {this.state.AddCoinDialog.show ? (
          <AddCoinDialog
            onCloseDialog={this._CloseAddCoinDialog}
            {...this.state.AddCoinDialog}
          />
        ) : null}
        
      </>
    );
  }
}

export default withLoading(UsersList);
