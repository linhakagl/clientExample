import React, { useState, useEffect, useRef } from 'react'
import { Pagination, Row, Col, Input, Button, Select } from 'antd'
import PageName from '../../../common/CommonComponents/PageName'
import { withLoading } from '../../../common/HOC/WithLoading'
import AllRequestsTable from './AllRequestsTable'
import RequestsApi from '../../../services/RequestsApi'
import Notification from '../../../services/Notification'
import { usePagination } from '../../../common/Hooks/usePagination'
import { GetAllCategoryType } from '../../../common/functionLoadData'
import RequestDetailDialog from '../Dialog/RequestDetailDialog'

export function AllRequestsList(props) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    account: undefined,
    typeId: undefined,
    isVip: undefined,
    isGuarantee: undefined
  })
  const [categoryType, setCategoryType] = useState([]);
  const [showDetailDialog, setShowDetailDialog] = useState({
    show: false,
    requestId: undefined
  });
  const [paging, setPaging, onPageChange, onShowSizeChange] = usePagination(onSearch, 15);

  const searchRef = useRef('');

  useEffect(() => {
    onSearch();
    getAllCategoryType();
  }, [])

  async function getAllCategoryType() {
    var data = await GetAllCategoryType();
    if (data) {
      setCategoryType(data);
    }
  }

  async function onSearch(currentPage = 1) {
    props.showLoading();

    var res = await RequestsApi.getAllRequestsAdmin(filter);
    props.hideLoading();
    if (res) {
      if (res.status === 200 && res.data) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].stt = i + 1;
        }
        var newPaging = { ...paging };
        newPaging.rowsCount = res.data.length;
        setPaging(newPaging);
        setData(res.data);
      }
      else {
        new Notification().error(res.message);
      }
    }
  };

  function onChangeFilter(field, value) {
    var newFilter = { ...filter };
    newFilter[field] = value;
    setFilter(newFilter);
  }

  function showDetail(id) {
    var detailData = data.find(c => c.requestID === id);
    setShowDetailDialog({
      show: true,
      requestId: id,
      handleCancel: function () {
        setShowDetailDialog({
          show: false,
          requestId: undefined
        })
      },
      data: detailData
    });
  }

  return (
    <>
      <PageName text='Danh Sách Đơn Hàng' />
      <div className="page-content">
        <div className="search-div">
          <Row gutter={16}>
            <Col lg={4} sm={12} md={6} xs={24}>
              <Input
                placeholder="Tài khoản"
                onPressEnter={() => onSearch(1)}
                value={filter.account}
                onChange={e => onChangeFilter('account', e.target.value)}
              />
            </Col>
            <Col lg={4} sm={12} md={6} xs={24}>
              <Select
                style={{ width: '100%' }}
                placeholder="Loại đơn hàng"
                allowClear
                value={filter.typeId}
                onChange={val => onChangeFilter('typeId', val)}
              >
                {categoryType.map(c => (
                  <Select.Option value={c.typeId} key={c.typeId}>{c.categroryTypeName}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col lg={4} sm={12} md={6} xs={24}>
              <Select
                style={{ width: '100%' }}
                placeholder="Bảo hành"
                allowClear
                value={filter.isGuarantee}
                onChange={val => onChangeFilter('isGuarantee', val)}
              >
                <Select.Option value={0} key={0}>Không bảo hành</Select.Option>
                <Select.Option value={1} key={1}>Có bảo hành</Select.Option>
              </Select>
            </Col>
            <Col lg={4} sm={12} md={6} xs={24}>
              <div className="btn-group-search">
                <Button
                  icon="search"
                  loading={props.loading}
                  onClick={() => onSearch(1)}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <AllRequestsTable data={data} showDetail={showDetail} />
          <div className="page-div">
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              showTotal={(total, range) => range[0] + ' - ' + range[1] + ' of ' + total + ' items'}
              onChange={onPageChange}
              defaultCurrent={1}
              total={paging.rowsCount}
              pageSizeOptions={['15', '20', '30', '40']}
              defaultPageSize={15}
            />
          </div>
        </div>
      </div>
      {showDetailDialog.show ? <RequestDetailDialog {...showDetailDialog} /> : null}

    </>
  )
}
export default withLoading(AllRequestsList)