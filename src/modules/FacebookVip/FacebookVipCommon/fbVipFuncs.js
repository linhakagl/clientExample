import Notification from "../../../services/Notification";
import RequestsApi from "../../../services/RequestsApi";

export async function createRequestFunc(submitData) {
  submitData.commentKeys = submitData.commentKeys.join(';');
  var res = await RequestsApi.createRequest(submitData);

  if (res) {
    if (res.status === 200) {
      if(res.message){
        new Notification().error(res.message);
      }
      else if (res.data > 0) {
        new Notification().success('Thành công');
      }
      else {
        new Notification().error('Không thành công');
      }
    }
    else {
      new Notification().error(res.message);
    }
  }
  else {
    new Notification().error('Api Connection Error');
  }
}

export function calTotal(data, minPrice) {
  return (data.requestCoin || minPrice) * data.vipMaxBuff * data.vipDays * data.vipRequestInOnceDay;
}