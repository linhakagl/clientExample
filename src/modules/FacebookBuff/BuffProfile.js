import React, { useState, useEffect, useContext } from 'react'
import Guarantee from '../../common/CommonComponents/FormItemComponent/Guarantee';
import AdvanceFilter from '../../common/CommonComponents/FormItemComponent/AdvanceFilter';
import Quantity from '../../common/CommonComponents/FormItemComponent/Quantity';
import Price from '../../common/CommonComponents/FormItemComponent/Price';
import { Form, Row, Col, Checkbox, Switch } from 'antd';
import PageName from '../../common/CommonComponents/PageName';
import LinkUID from '../../common/CommonComponents/FormItemComponent/LinkUID';
import SeedingTypeSelect from '../../common/CommonComponents/FormItemComponent/SeedingTypeSelect';
import RuleCard from '../../common/CommonComponents/FormItemComponent/RuleCard';
import { AppContext } from '../../context';
import moment from 'moment';
import ButtonSubmit from '../../common/CommonComponents/FormItemComponent/ButtonSubmit';
import { getCategories, getCategoryCodePrice } from '../../common/utility';
import { TypeCode } from '../../common/Constant';
import { initState, formItemLayout } from './FacebookBuffCommon/initState';
import _ from 'lodash';
import Notification from '../../services/Notification';
import { createRequestFunc, calTotal } from './FacebookBuffCommon/fbFuncs';
import AgreeCheckbox from '../../common/CommonComponents/FormItemComponent/AgreeCheckbox';

export default function BuffProfile() {
  const typeCode = TypeCode.facebookBuff;
  const targetCode = "order-seeding-sub";
  const seedingTypes = [{ name: 'Buff Subscribe', value: 'buff_sub' }];

  const [formData, setFormData] = useState({});
  const [code, setCode] = useState('');
  const [minPrice, setMinPrice] = useState(100);
  const [agreeRule, setAgreeRule] = useState(false);
  const [seedingType, setSeedingType] = useState(seedingTypes[0].value);
  const [validateLinkUID, setValidateLinkUID] = useState({
    validateStatus: '',
    help: ''
  })
  const [validateQuantity, setValidateQuantity] = useState({
    validateStatus: '',
    help: ''
  })
  const [submitted, setSubmitted] = useState(false);
  const notification = new Notification();
  const context = useContext(AppContext);
  let categories = getCategories(context.category, typeCode, targetCode);

  useEffect(() => {
    var newFormData = _.cloneDeep(initState);
    newFormData.iGStartDate = moment();
    newFormData.iGEndDate = moment().add(7, 'days');
    setFormData(newFormData);
  }, [])

  useEffect(() => {
    getCodeAndPrice();
  }, [seedingType, formData.isGuarantee])

  useEffect(() => {
    categories = getCategories(context.category, typeCode, targetCode);
    getCodeAndPrice();
  }, [context.category])

  function onChangeFormItem(value, field) {
    var newFormData = { ...formData };
    newFormData[field] = value;
    setFormData(newFormData);
  }

  function onChangeAdvanceFilter(value, field) {
    var newFormData = { ...formData };
    newFormData.requestFilter[field] = value;
    setFormData(newFormData);
  }

  function getCodeAndPrice() {
    var obj = getCategoryCodePrice(categories, seedingType, targetCode, formData.isGuarantee);

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
    if (!formData.numberBuff) {
      setValidateQuantity({
        validateStatus: 'error',
        help: 'Số lượng tăng phải lớn hơn 0'
      });
      valid = false;
    }
    if (formData.requestCoin < minPrice) {
      valid = false;
      notification.error('Giá tiền phải lớn hơn hoặc bằng giá thấp nhất');
    }
    return valid;
  }

  return (
    <>
      <PageName text="Buff Sub Profile" />
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
              <Form.Item label="Seeding Type">
                <SeedingTypeSelect
                  seedingTypes={seedingTypes}
                  value={seedingType}
                  onChange={value => setSeedingType(value)}
                />
              </Form.Item>
              <Form.Item label="Bảo hành">
                <Guarantee
                  isGuarantee={formData.isGuarantee}
                  iGStartDate={formData.iGStartDate}
                  iGEndDate={formData.iGEndDate}
                  onChangeGuarantee={value => onChangeFormItem(value, 'isGuarantee')}
                  onChangeIGStartDate={value => onChangeFormItem(value, 'iGStartDate')}
                  onChangeIGEndDate={value => onChangeFormItem(value, 'iGEndDate')}
                />
              </Form.Item>
              <Form.Item label="Lọc nâng cao">
                <Switch
                  checked={formData.advanceFilter}
                  onChange={value => onChangeFormItem(value, 'advanceFilter')}
                />
                <AdvanceFilter
                  advanceFilter={formData.advanceFilter}
                  filter={formData.requestFilter}
                  onChangeGender={value => onChangeAdvanceFilter(value, 'gender')}
                  onChangeFromAge={value => onChangeAdvanceFilter(value, 'ageFrom')}
                  onChangeToAge={value => onChangeAdvanceFilter(value, 'ageTo')}
                  onChangeFromFriendQty={value => onChangeAdvanceFilter(value, 'friendFrom')}
                  onChangeToFriendQty={value => onChangeAdvanceFilter(value, 'friendTo')}
                />
              </Form.Item>
              <Form.Item label="Số lượng" required {...validateQuantity}>
                <Quantity
                  value={formData.numberBuff}
                  onChange={value => {
                    setValidateQuantity({});
                    onChangeFormItem(value, 'numberBuff')
                  }}
                />
              </Form.Item>
              <Form.Item label="Giá mỗi tương tác" help={"Giá thấp nhất " + minPrice}>
                <Price
                  value={formData.requestCoin}
                  minPrice={minPrice}
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
    - Hệ thống sử dụng 99 % tài khoản người VN, fb thật để tương tác like, comment, share....<br />
    - Thời gian làm việc(tăng seeding) và bảo hành tính từ ngày bắt đầu cho đến ngày kết thúc job, tối đa là 1 tuần< br />
    - Hết thời gian của job đã order nếu không đủ số lượng hệ thống sẽ tự động hoàn lại số tiền seeding chưa tăng cho bạn
    <span style={{ fontWeight: 'bold' }}>
      trong vòng 1 đến 3 ngày
    </span >
    <br />
    - Vui lòng lấy đúng id bài viết, công khai và check kỹ job tránh tạo nhầm,
    tính năng đang trong giai đoạn thử nghiệm nên sẽ không hoàn tiền nếu bạn tạo nhầm< br />
    - Chỉ nhận id hoặc link trang cá nhân<br />
    <span style={{ fontWeight: 'bold' }}>
      - Nhập id lỗi hoặc trong thời gian chạy die id thì hệ thống không hoàn lại tiền.
    </span >
    <br />
    - Mỗi id có thể <span style={{ fontWeight: 'bold' }}> Buff tối đa 10 lần trên hệ thống để tránh Spam</span >,
    max 1k trong ngày(hoặc hơn nếu order giá cao), trên 1k thời gian lên chậm hơn trong vòng 7 ngày
  </>
)
