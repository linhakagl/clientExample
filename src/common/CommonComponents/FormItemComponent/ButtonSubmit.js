import React from 'react'
import { Icon, Button } from 'antd'

export default function ButtonSubmit(props) {
  const total = props.total || 0;
  return (
    <Button
      className="btn-add"
      style={{ height: 'max-content', width: '60%', padding: 5 }}
      disabled={props.disabled}
      onClick={props.onSubmit}
    >
      <span>
        <h3 style={{ color: 'white' }}>Tổng cộng: {total} <Icon type="copyright" /></h3>
        <h2 style={{ color: 'white' }}>Create Request</h2>
      </span>
    </Button>
  )
}
