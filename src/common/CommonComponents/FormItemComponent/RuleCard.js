import React from 'react'
import { Card } from 'antd'

export default function RuleCard(props) {
  return (
    <Card style={{ padding: 10, background: '#f7d5d9' }}>
      <h2 style={{ textAlign: 'center' }}>QUY ĐỊNH</h2>
      {props.children}
    </Card>
  )
}
