/**
 * Created by huamin on 2018/4/3.
 */

export function getCookie(cookieName){  // 获取cookie   从cookie中获取 userId
  const strCookie = document.cookie;
  const arrCookie = strCookie.split("; ");
  for(let index in arrCookie){
    const arr = arrCookie[index].split("=");
    if(cookieName == arr[0]){
      return arr[1];
    }
  }
  return "";
}
