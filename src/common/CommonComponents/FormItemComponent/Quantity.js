import React from 'react'
import { InputNumber } from 'antd'

export default function Quantity(props) {
  function onChange(value) {
    if(props.onChange){
      props.onChange(value);
    }
  }
  return (
    <InputNumber
      style={{ width: '100%' }}
      min={1}
      precision={0}
      onChange={onChange}
      value={props.value}
    />
  )
}
