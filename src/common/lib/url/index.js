/**
 * Created by BIYY on 2018-6-23.
 */
export default {
  getParam (key) {
    return this.getParamAll()[key]||'';
  },

  getParamAll () {
    let param = {};
    const queryStr = location.href.split('?');
    if(queryStr.length<2){
      return param;
    }
    const params = queryStr[1].split('&');
    params.forEach((item) => {
      const arr = item.split('=');
      const key = arr[0];
      const value = arr[1];
      param[key] = value;
    });
    return param;
  }
}