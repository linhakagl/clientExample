import React from 'react'
import { Card, Row, Col, Radio, InputNumber } from 'antd';
import './FormItem.css'

export default function AdvanceFilter(props) {
  function onChangeGender(value) {
    if (props.onChangeGender) {
      props.onChangeGender(value);
    }
  }
  function onChangeFromAge(value) {
    if (props.onChangeFromAge) {
      props.onChangeFromAge(value);
    }
  }
  function onChangeToAge(value) {
    if (props.onChangeToAge) {
      props.onChangeToAge(value);
    }
  }
  function onChangeFromFriendQty(value) {
    if (props.onChangeFromFriendQty) {
      props.onChangeFromFriendQty(value);
    }
  }
  function onChangeToFriendQty(value) {
    if (props.onChangeToFriendQty) {
      props.onChangeToFriendQty(value);
    }
  }

  return (
    <>
      {props.advanceFilter ?
        <Card style={{ padding: 5 }}>
          <Row style={{ marginBottom: 10 }}>
            <Col span={8} style={{ float: 'left' }}>Giới tính: </Col>
            <Col span={16} style={{ float: 'left' }}>
              <Radio.Group
                className="gender-radio"
                onChange={e => onChangeGender(e.target.value)}
                value={props.filter.gender}
              >
                <Radio.Button value={1}>Nam</Radio.Button>
                <Radio.Button value={2}>Nữ</Radio.Button>
                <Radio.Button defaultChecked value={undefined}>Tất cả</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={8} style={{ float: 'left' }}>Tuổi: </Col>
            <Col span={16} style={{ float: 'left' }}>
              <div className="from-to-input-number">
                <InputNumber
                  className="advance-input-number"
                  placeholder="Từ"
                  min={10}
                  max={100}
                  precision={0}
                  value={props.filter.ageFrom}
                  onChange={onChangeFromAge}
                />
                <span>-</span>
                <InputNumber
                  placeholder="Đến"
                  min={props.filter.ageFrom || 10}
                  max={100}
                  precision={0}
                  value={props.filter.ageTo}
                  onChange={onChangeToAge}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col span={8} style={{ float: 'left' }}>Số bạn bè: </Col>
            <Col span={16} style={{ float: 'left' }}>
              <div className="from-to-input-number">
                <InputNumber
                  placeholder="Từ"
                  min={1}
                  precision={0}
                  value={props.filter.friendFrom}
                  onChange={onChangeFromFriendQty}
                />
                <span>-</span>
                <InputNumber
                  placeholder="Đến"
                  min={props.filter.friendFrom || 10}
                  precision={0}
                  value={props.filter.friendTo}
                  onChange={onChangeToFriendQty}
                />
              </div>
            </Col>
          </Row>
        </Card>
        : null}
    </>
  )
}
