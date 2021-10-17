import moment from "moment";
import { isArray } from "util";

export function displayCurrency(str) {
  if (!str) return "";
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function getPermissionByName(arr, name) {
  if (!arr || arr.length === 0) return false;
  if (!name) return false;

  let findFunction = arr.find(c => c.name === name);
  if (findFunction) {
    return findFunction.value;
  }
  return false;
}

export function displayDateTime(date) {
  if (!date) return ''
  return moment(date).format('Do MMMM YYYY');
}

export function validateRequired(control, mess) {
  if (control) {
    if (isArray(control.value) && control.value.length > 0) {
      return true;
    }
    if (!isArray(control.value) && control.value) {
      return true;
    }
    control.validateStatus = "error";
    control.help = mess;
    return false;
  }
  return true;
};


export function locdau(word) {
  var str = word.toLowerCase()

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  //str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");  
  /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
  //str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-  
  str = str.replace(/^-+|-+$/g, "");
  //cắt bỏ ký tự - ở đầu và cuối chuỗi 
  return str;
}

export function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

export function formatNumber(num) {
  if(!num){
    return 0;
  }
  if (num !== Math.floor(num)) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function displayDateTime2(date) {
  if (moment(date).isValid()) {
    return moment(date).format('DD MMM, YYYY');
  }
  return '';
}

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function disabledStartDate(startValue, endValue) {
  if (!startValue || !endValue) {
    return false;
  }
  return startValue.valueOf() > endValue.valueOf();
};

export function disabledEndDate(endValue, startValue) {
  if (!endValue || !startValue) {
    return false;
  }
  return endValue.valueOf() <= startValue.valueOf();
};

export function getCategories(category, typeCode, targetCode) {
  if (!category || category.length === 0) {
    return [];
  }

  var typeObj = category.find(c => c.typeCode == typeCode);
  if (typeObj) {
    var targetTypes = typeObj.targetTypes;
    var targetType = targetTypes.find(c => c.targetCode == targetCode);
    if (targetType) {
      return targetType.categrories;
    }
  }
  return [];
}

export function getCategoryCodePrice(categories, actionName, targetCode, isGuarantee) {
  if (!categories || categories.length === 0) {
    return {};
  }
  var obj = categories.find(c => c.actionName === actionName
    && c.targetCode === targetCode
    && c.isGuarantee == isGuarantee);
  if (!obj) {
    return null;
  }
  return {
    code: obj.code,
    price: obj.price
  };
}

export function isStringNullOrEmpty(str){
  if(!str || str.trim().length === 0){
    return true;
  }
  return false;
}

export function displayDateAndTime(date) {
  if (!date) return ''
  return moment(date).format('DD/MM/YYYY HH:mm');
}