import React from 'react'
import { Input } from 'antd';

export default function LinkUID(props) {
  function onChange(value) {
    if (props.onChange) {
      props.onChange(value);
    }
  }
  return (
    <Input value={props.value} onChange={e => onChange(e.target.value)} />
  )
}
