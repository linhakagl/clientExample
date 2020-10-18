import React from 'react'
import { DatePicker, Select } from 'antd'
import { disabledStartDate, disabledEndDate } from '../../utility'

export default function Guarantee(props) {
  function onChangeGuarantee(value){
    if(props.onChangeGuarantee){
      props.onChangeGuarantee(value)
    }
  }
  function onChangeIGStartDate(value){
    if(props.onChangeIGStartDate){
      props.onChangeIGStartDate(value)
    }
  }
  function onChangeIGEndDate(value){
    if(props.onChangeIGEndDate){
      props.onChangeIGEndDate(value)
    }
  }
  return (
    <>
      <Select
        style={{ width: '100%' }}
        onChange={onChangeGuarantee}
        value={props.isGuarantee}
      >
        <Select.Option key={0} value={false}>Không</Select.Option>
        <Select.Option key={1} value={true}>Có</Select.Option>
      </Select>
      {props.isGuarantee ?
        <>
          <DatePicker
            allowClear={false}
            disabledDate={startdate => disabledStartDate(startdate, props.iGEndDate)}
            onChange={onChangeIGStartDate}
            style={{ float: 'left', marginRight: 10 }}
            placeholder="Start date"
            value={props.iGStartDate}
          />
          <DatePicker
            allowClear={false}
            disabledDate={enddate => disabledEndDate(enddate, props.iGStartDate)}
            onChange={onChangeIGEndDate}
            style={{ float: 'left' }}
            placeholder="End date"
            value={props.iGEndDate}
          />
        </>
        : null}
    </>
  )
}
