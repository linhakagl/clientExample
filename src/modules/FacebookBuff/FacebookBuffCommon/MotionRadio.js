import React from 'react'
import { Radio } from 'antd'
import like from '../../../assets/FacebookIcons/like.png'
import love from '../../../assets/FacebookIcons/love.png'
import haha from '../../../assets/FacebookIcons/haha.png'
import wow from '../../../assets/FacebookIcons/wow.png'
import sad from '../../../assets/FacebookIcons/sad.png'
import angry from '../../../assets/FacebookIcons/angry.png'

export default function MotionRadio(props) {
  function onChangeMotion(e) {
    if (props.onChangeMotion) {
      props.onChangeMotion(e.target.value);
    }
  }

  return (
    <Radio.Group value={props.value} onChange={onChangeMotion} className="motion">
      <Radio.Button value="like" style={{ border: "none" }}>
        <img alt="like" src={like} className="img-motion" />
      </Radio.Button>
      <Radio.Button value="love" style={{ border: "none" }}>
        <img alt="love" src={love} className="img-motion" />
      </Radio.Button>
      <Radio.Button value="haha" style={{ border: "none" }}>
        <img alt="haha" src={haha} className="img-motion" />
      </Radio.Button>
      <Radio.Button value="wow" style={{ border: "none" }}>
        <img alt="wow" src={wow} className="img-motion" />
      </Radio.Button>
      <Radio.Button value="sad" style={{ border: "none" }}>
        <img alt="sad" src={sad} className="img-motion" />
      </Radio.Button>
      <Radio.Button value="angry" style={{ border: "none" }}>
        <img alt="angry" src={angry} className="img-motion" />
      </Radio.Button>
    </Radio.Group>
  )
}
