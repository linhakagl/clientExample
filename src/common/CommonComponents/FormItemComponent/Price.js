import React from 'react'
import { InputNumber } from 'antd';

export default function Price(props) {
  function onChange(value){
    if(props.onChange){
      props.onChange(value);
    }
  }
  return (
    <InputNumber
      style={{ width: '100%' }}
      min={props.minPrice || 100}
      precision={0}
      onChange={value => onChange(value)}
      value={props.value || props.minPrice}
    />
  )
}
