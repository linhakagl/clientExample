import React from 'react'
import like from '../../../assets/FacebookIcons/like.png'
import love from '../../../assets/FacebookIcons/love.png'
import haha from '../../../assets/FacebookIcons/haha.png'
import wow from '../../../assets/FacebookIcons/wow.png'
import sad from '../../../assets/FacebookIcons/sad.png'
import angry from '../../../assets/FacebookIcons/angry.png'
import { Checkbox } from 'antd'

export default function MotionSelect(props) {
  const options = [
    {
      label: <img alt="like" src={like} className="img-motion" />,
      value: 'like'
    },
    {
      label: <img alt="love" src={love} className="img-motion" />,
      value: 'love'
    },
    {
      label: <img alt="haha" src={haha} className="img-motion" />,
      value: 'haha'
    },
    {
      label: <img alt="wow" src={wow} className="img-motion" />,
      value: 'wow'
    },
    {
      label: <img alt="sad" src={sad} className="img-motion" />,
      value: 'sad'
    },
    {
      label: <img alt="angry" src={angry} className="img-motion" />,
      value: 'angry'
    }
  ];

  function onChange(values){
    if(props.onChange){
      props.onChange(values);
    }
  }

  return (
    <Checkbox.Group className="motion-select" value={props.value} options={options} onChange={onChange}/>
  )
}
