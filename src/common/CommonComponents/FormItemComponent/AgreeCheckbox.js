import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import './FormItem.css'

export default function AgreeCheckbox(props) {
  const [className, setClassname] = useState('');

  useEffect(() => {
    if(props.submitted && !props.checked){
      console.log('err')
      setClassname('agree-checkbox-unchecked')
    }
    else{
      console.log('ok')
      setClassname('');
    }
  }, [props.submitted, props.checked])

  return (
    <Checkbox
      checked={props.checked}
      onChange={props.onChange}
      className={className}
    >
      <span>Đồng ý với các quy định</span>
    </Checkbox>
  )
}
