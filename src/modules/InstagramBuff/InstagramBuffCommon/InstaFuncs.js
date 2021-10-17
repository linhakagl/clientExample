import Notification from "../../../services/Notification";
import RequestsApi from "../../../services/RequestsApi";
import { percentAdvanceFilter } from "../../../common/Constant";

export async function createRequestFunc(submitData) {
  if (!submitData.advanceFilter) {
    submitData.requestFilter = null;
  }
  if (!submitData.isGuarantee) {
    submitData.iGStartDate = null;
    submitData.iGEndDate = null;
  }
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
  var countFilter = 0;
  var price = (data.requestCoin || minPrice) * data.numberBuff;
  if (data.advanceFilter) {
    let filter = data.requestFilter;
    countFilter += (filter.ageFrom || filter.ageTo) ? 1 : 0;
    countFilter += (filter.friendFrom || filter.friendTo) ? 1 : 0;
    countFilter += filter.gender ? 1 : 0;
  }
  return Math.round(price + countFilter * price * percentAdvanceFilter / 100);
}