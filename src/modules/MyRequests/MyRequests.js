import React, { useState, useEffect, useRef } from 'react'
import { Pagination, Row, Col, Input, Button, Select } from 'antd'
import PageName from '../../common/CommonComponents/PageName'
import { withLoading } from '../../common/HOC/WithLoading'
import RequestsApi from '../../services/RequestsApi'
import Notification from '../../services/Notification'
import { usePagination } from '../../common/Hooks/usePagination'
import MyRequestsTable from './MyRequestsTable'
import RequestDetailDialog from '../AllRequests/Dialog/RequestDetailDialog'

export function MyRequests(props) {
  const [data, setData] = useState([]);
  const [paging, setPaging, onPageChange, onShowSizeChange] = usePagination(onSearch, 15);
  const [showDetailDialog, setShowDetailDialog] = useState({
    show: false,
    requestId: undefined
  });

  useEffect(() => {
    onSearch();
  }, []);

  async function onSearch() {
    props.showLoading();
    var res = await RequestsApi.getMyRequest({ paging });
    props.hideLoading();
    if (res) {
      if (res.status === 200 && res.data) {
        let newData = res.data.list;
        for (let i = 0; i < newData.length; i++) {
          newData[i].stt = i + 1;
        }
        setPaging(res.data.paging);
        setData(newData);
      }
      else {
        new Notification().error(res.message);
      }
    }
  };


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
        <div>
          <MyRequestsTable data={data} showDetail={showDetail} />
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
export default withLoading(MyRequests)