import React, { useState, useEffect, useContext } from 'react'
import Quantity from '../../common/CommonComponents/FormItemComponent/Quantity';
import Price from '../../common/CommonComponents/FormItemComponent/Price';
import { Form, Row, Col, Checkbox, InputNumber } from 'antd';
import PageName from '../../common/CommonComponents/PageName';
import LinkUID from '../../common/CommonComponents/FormItemComponent/LinkUID';
import RuleCard from '../../common/CommonComponents/FormItemComponent/RuleCard';
import { AppContext } from '../../context';
import moment from 'moment';
import ButtonSubmit from '../../common/CommonComponents/FormItemComponent/ButtonSubmit';
import { getCategories, getCategoryCodePrice } from '../../common/utility';
import { TypeCode } from '../../common/Constant';
import _ from 'lodash';
import Notification from '../../services/Notification';
import MotionRadio from '../FacebookBuff/FacebookBuffCommon/MotionRadio'
import { initState, formItemLayout } from './FacebookVipCommon/initState';
import { createRequestFunc, calTotal } from './FacebookVipCommon/fbVipFuncs';
import TextArea from 'antd/lib/input/TextArea';
import AgreeCheckbox from '../../common/CommonComponents/FormItemComponent/AgreeCheckbox';


export default function FacebookVipLike() {
  const typeCode = TypeCode.facebookVip;
  const targetCode = "vip-like-order";

  const [formData, setFormData] = useState({});
  const [code, setCode] = useState('');
  const [minPrice, setMinPrice] = useState(100);
  const [agreeRule, setAgreeRule] = useState(false);
  const [seedingType, setSeedingType] = useState('vip_seeding_like');
  const [validateLinkUID, setValidateLinkUID] = useState({
    validateStatus: '',
    help: ''
  });
  const [validateNumberBuff, setValidateNumberBuff] = useState({
    validateStatus: '',
    help: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const notification = new Notification();
  const context = useContext(AppContext);
  let categories = getCategories(context.category, typeCode, targetCode);

  useEffect(() => {
    var newFormData = _.cloneDeep(initState);
    setFormData(newFormData);
  }, [])

  useEffect(() => {
    getCodeAndPrice();
  }, [formData.motions])
  
  useEffect(() => {
    categories = getCategories(context.category, typeCode, targetCode);
    getCodeAndPrice();
  }, [context.category])

  function onChangeFormItem(value, field) {
    var newFormData = { ...formData };
    newFormData[field] = value;
    setFormData(newFormData);
  }

  function getCodeAndPrice() {
    var actionName = (formData.motions === 'like' || !formData.motions) ?
      seedingType
      : seedingType + '_' + formData.motions;
    var obj = getCategoryCodePrice(categories, actionName, targetCode, false);
    if (obj) {
      setCode(obj.code);
      setMinPrice(obj.price);
    }
  }

  function onSubmit() {
    setSubmitted(true);
    if (!validateField() || !agreeRule) {
      return;
    }

    var submitData = { ...formData };
    submitData.siteId = context.siteInfo.siteId;
    submitData.categoryCode = code;
    submitData.fbID = submitData.linkUID;
    submitData.fbLink = submitData.linkUID;
    submitData.totalCoin = calTotal(submitData);
    createRequestFunc(submitData);
  }

  function validateField() {
    var valid = true;
    if (!formData.linkUID) {
      setValidateLinkUID({
        validateStatus: 'error',
        help: 'Link/ UID không được bỏ trống'
      });
      valid = false;
    }
    else if (!formData.linkUID.startsWith('https://www.facebook.com')) {
      setValidateLinkUID({
        validateStatus: 'error',
        help: 'Link/ UID không hợp lệ'
      });
      valid = false;
    }
    if (formData.vipMinBuff > formData.vipMaxBuff) {
      setValidateNumberBuff({
        validateStatus: 'error',
        help: 'Lượng tăng nhỏ nhất phải nhỏ hơn lượng tăng lớn nhất'
      });
    }
    if (formData.requestCoin < minPrice) {
      valid = false;
      notification.error('Giá tiền phải lớn hơn hoặc bằng giá thấp nhất');
    }
    return valid;
  }

  return (
    <>
      <PageName text="Buff Like Facebook Vip" />
      <div className="page-content facebook-buff-div">
        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col lg={14}>
            <Form {...formItemLayout} className="login-form">
              <Form.Item label="Link or UID" required {...validateLinkUID}>
                <LinkUID
                  value={formData.linkUID}
                  onChange={value => {
                    setValidateLinkUID({});
                    onChangeFormItem(value, 'linkUID')
                  }}
                />
              </Form.Item>
              <Form.Item label="Loại cảm xúc">
                <MotionRadio value={formData.motions} onChangeMotion={value => onChangeFormItem(value, 'motions')} />
                {/* <MotionSelect value={formData.motions} onChange={value => onChangeFormItem(value, 'motions')} /> */}
              </Form.Item>
              <Form.Item
                label="Số lượng like ngẫu nhiên"
                className="min-max-buff"
                {...validateNumberBuff}
              >
                <InputNumber
                  placeholder="Từ"
                  min={1}
                  precision={0}
                  value={formData.vipMinBuff}
                  onChange={value => onChangeFormItem(value, 'vipMinBuff')}
                />
                &nbsp; - &nbsp;
                  <InputNumber
                  placeholder="Đến"
                  min={formData.vipMinBuff}
                  precision={0}
                  value={formData.vipMaxBuff}
                  onChange={value => onChangeFormItem(value, 'vipMaxBuff')}
                />
              </Form.Item>

              <Form.Item label="Lượng tăng trong ngày">
                <InputNumber
                  value={formData.vipRequestInOnceDay}
                  onChange={value => onChangeFormItem(value, 'vipRequestInOnceDay')}
                  min={0}
                  precision={0}
                />
              </Form.Item>
              <Form.Item label="Số ngày mua vip">
                <InputNumber
                  value={formData.vipDays}
                  onChange={value => onChangeFormItem(value, 'vipDays')}
                  min={1}
                  precision={0}
                />
              </Form.Item>
              <Form.Item label="Ghi chú">
                <TextArea
                  value={formData.note}
                  onChange={e => onChangeFormItem(e.target.value, 'note')}
                />
              </Form.Item>
              <Form.Item label="Giá mỗi tương tác" help={"Giá thấp nhất " + minPrice}>
                <Price
                  minPrice={minPrice}
                  value={formData.requestCoin}
                  onChange={value => onChangeFormItem(value, 'requestCoin')}
                />
              </Form.Item>
              <Row style={{ marginBottom: 10, marginTop: 10 }}>
                <Col span={6}></Col>
                <Col span={16} style={{ textAlign: 'center' }}>
                  <AgreeCheckbox checked={agreeRule} submitted={submitted} onChange={e => setAgreeRule(e.target.checked)}/>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col lg={8}>
            <RuleCard>{rule}</RuleCard>
          </Col>
        </Row>

        <Row style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <ButtonSubmit total={calTotal(formData, minPrice)} onSubmit={onSubmit} />
        </Row>
      </div>
    </>
  )
}


const rule = (
  <>
    <span className="bold-red">
      - Ngiêm cấm Buff các ID Seeding có nội dung vi phạm pháp luật, chính trị, đồ trụy... Nếu cố tình buff bạn sẽ bị trừ hết tiền và band khỏi hệ thống vĩnh viễn, và phải chịu hoàn toàn trách nhiệm trước pháp luật.
    </span>
    <br />
    - Hệ thống sử dụng 99% tài khoản người VN, fb thật để tương tác like, comment, share....
    <br />
    - Hỗ trợ trang cá nhân và fanpage. Khi đăng bài viết mới hệ thống sẽ tự động quét và tăng tương tác theo yêu cầu của gói
    <br />
    - Không bảo hành số lượng tương tác, Tự động hoàn tiền số ngày chưa sử dụng nếu bạn hủy vip
    <br />
    - Vui lòng lấy đúng id vip cần tạo và check kỹ vip tránh tạo nhầm, tính năng đang trong giai đoạn thử nghiệm nên sẽ không hoàn tiền nếu bạn tạo nhầm
    <br />
    - Tốc độ tăng nhanh chậm ngẫu nhiên tránh bị facebook phát hiện, nếu muốn tăng nhanh vui lòng set giá mỗi tương tác cao hơn giá tối thiểu
  </>
)