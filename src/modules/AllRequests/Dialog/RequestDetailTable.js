import React from 'react'
import { Descriptions, Empty } from 'antd'
import { displayDateAndTime, formatNumber, displayDateTime2 } from '../../../common/utility';

export default function RequestDetailTable(props) {
  const { Item } = Descriptions;
  const data = props.data;
  return data ? (
    <Descriptions bordered size="small" column={2} className="request-detail-description">
      <Item label="Người tạo">{data.createdBy}</Item>
      <Item label="Ngày tạo">{displayDateAndTime(data.createdDate)}</Item>
      <Item label="Link" span={2}><a href={data.fbLink} target="_blank">{data.fbLink}</a></Item>
      <Item label="Loại đơn"><b>{data.categoryName}</b></Item>
      <Item label="Thời gian bảo hành">{data.isGuarantee ? displayDateTime2(data.igStartDate) + ' - ' + displayDateTime2(data.igEndDate) : null}</Item>
      {data.isVip ?
        <>
          <Item label="Lượng tăng VIP">{data.vipMinBuff + ' ~ ' + data.vipMaxBuff}</Item>
          <Item label="Lượng tăng VIP trong ngày">{data.vipRequestInOnceDay}</Item>
          <Item label="Số ngày VIP">{data.vipDays}</Item>
        </>
        : <Item label="Số lượng tăng">{formatNumber(data.numberBuff)}</Item>}
      <Item label="Giá mỗi tương tác">{formatNumber(data.requestCoin)}</Item>
    </Descriptions>
  ) : <Empty />
}
