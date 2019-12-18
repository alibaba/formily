import {notification } from 'antd';
import moment from 'moment';

export const copySchema = (schema) => {
  const oEle = document.createElement('textarea');
  oEle.value = schema;
  document.body.appendChild(oEle);
  oEle.select();
  document.execCommand('Copy'); 
  oEle.style.display = 'none';
  notification
  notification.open({
    message: 'shcema复制成功',
    duration: 2,
  });
}

export const downloadSchema = (schema) => {
  const aEle = document.createElement('a');
  aEle.download = `${moment().format('YYYYMMDD-HHmmss')}schema.json`;
  aEle.style.display = 'none';
  var blob = new Blob([schema], {type:'application/json,charset=utf-8;'});
  aEle.href = URL.createObjectURL(blob);
  document.body.appendChild(aEle);
  aEle.click();
  document.body.removeChild(aEle);
}
