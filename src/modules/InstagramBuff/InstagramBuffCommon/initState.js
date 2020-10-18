export const initState = {
  linkUID: undefined,
  isGuarantee: false,
  iGStartDate: undefined,
  iGEndDate: undefined,
  advanceFilter: false,
  requestFilter: {
    gender: undefined,
    ageFrom: undefined,
    ageTo: undefined,
    friendFrom: undefined,
    friendTo: undefined
  },
  numberBuff: 1,
  requestCoin: undefined,
  comments: undefined,
  note: undefined
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};