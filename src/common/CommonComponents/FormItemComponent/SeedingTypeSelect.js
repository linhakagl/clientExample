import React from 'react'
import { Select } from 'antd'

export default function SeedingTypeSelect(props) {
  function onChange(value) {
    if(props.onChange){
      props.onChange(value)
    }
  }
  return (
    <Select
      style={{ width: '100%' }}
      value={props.value}
      onChange={onChange}
    >
      {props.seedingTypes && props.seedingTypes.map((c, index) => (
        <Select.Option key={index} value={c.value}>{c.name}</Select.Option>
      ))}
    </Select>
  )
}
