import config from '@/config/index'
const _MIDEA_COMMON = 'MideaCommon' // 通用组件
export default {

  /**
   * 获取设备平台
   * @returns {number}
   */
  getPlatForm() {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    let flatform = 0
    if (isAndroid) {
      flatform = 2
    } else if (isiOS) {
      flatform = 1
    }
    return flatform
  },
  /**
   * 拍照或选择图片
   * @param params {object} 参数
   * @return {*}
   */
  getPicture: function (params) {
    const imgPackageHeader = 'data:image/jpeg;base64,'
    const imgDefaultBase64Code = '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMzM5RDY2ODMyNzQxMUU1QTJENkEwOTg5MjdGQTczNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMzM5RDY2OTMyNzQxMUU1QTJENkEwOTg5MjdGQTczNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMzMzlENjY2MzI3NDExRTVBMkQ2QTA5ODkyN0ZBNzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMzMzlENjY3MzI3NDExRTVBMkQ2QTA5ODkyN0ZBNzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAEAAQAwERAAIRAQMRAf/EAG8AAAMBAAAAAAAAAAAAAAAAAAQFBggBAAIDAAAAAAAAAAAAAAAAAAMEBQcIEAABBAEDBAMAAAAAAAAAAAABAgMEBQYAERIhMUEHYSIUEQACAgAGAgMBAAAAAAAAAAABAhEDACFREgQFMUFhoRQi/9oADAMBAAIRAxEAPwDWfripp7WwyFy7q13MWmoZtmzXIecYLr0ct8U82vsN+RGq06+pHZt67gqkxMZiNMaH73k3U11ip9hexV3QDAafRywd7BxuorKfDchrKaXjLmTtTVS8cmPl9TP5HUIQ8hTiUOcHgokch46EjronP46IldiqV3T/ACTMQfOsH5wHpOfdddfRY62CsrDqIncCSDBIlYzjXPCbBMsGHy76ehyUxNn0kuvq5UTYLZlPFBbcKipJSElPUjc/Gg8LlfnZmzkqQI9E4a7jrf3pWhAKrYrMD4KiZHg64mLW4tr2WqfdWcq1mrASqVLdW85xHZIUskgDwOw0tbc9rbnJJ+c8SHG4tXGTZUgVdAAB9Y//2Q=='
    if (config.env === 'local') {// 本地调试
      return new Promise((resolve, reject) => {
        resolve({
          base64Code: imgDefaultBase64Code,
          base64Url: imgPackageHeader + imgDefaultBase64Code
        })
      })
    } else {// 测试或者生产环境
      let Camera = {
        DestinationType: {
          THUMB_URL_AND_FILE_URI: -1, // 非cordova自带类型, 返回略缩图和原图的url的json对象
          DATA_URL: 0, // Return image as base64-encoded string
          FILE_URI: 1, // Return image file URI
          NATIVE_URI: 2 // Return image native URI (e.g. assets-library:// on iOS or content:// on Android)
        },
        PictureSourceType: {
          PHOTOLIBRARY: 0,
          CAMERA: 1,
          SAVEDPHOTOALBUM: 2
        },
        EncodingType: {
          JPEG: 0, // Return JPEG encoded image
          PNG: 1 // Return PNG encoded image
        },
        MediaType: {
          PICTURE: 0, // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
          VIDEO: 1, // allow selection of video only, WILL ALWAYS RETURN FILE_URI
          ALLMEDIA: 2 // allow selection from all media types
        },
        Direction: {
          BACK: 0, // Use the back-facing camera
          FRONT: 1 // Use the front-facing camera
        }
      }
      let opt = {
        quality: params.quality || 75,
        destinationType: params.destinationType || Camera.DestinationType.DATA_URL,
        allowEdit: params.allowEdit || false,
        encodingType: params.encodingType || 0,
        saveToPhotoAlbum: params.saveToPhotoAlbum || false,
        sourceType: params.sourceType || Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: params.mediaType || Camera.MediaType.PICTURE,
        correctOrientation: params.correctOrientation || true,
        cameraDirection: params.cameraDirection || Camera.Direction.BACK
      }
      return new Promise((resolve, reject) => {
        try {
          navigator.camera.getPicture(
            async (data) => {
              let base64Url = imgPackageHeader + data
              if (data.indexOf('file://') > -1) {//安卓照相
                const obj = await this.callApi('MideaCommon', 'getBase64s', [data])
                console.log('base64Url', base64Url)
                base64Url = imgPackageHeader + obj.base64[0]
                resolve({
                  base64Code: data,
                  base64Url: base64Url
                })
              } else {
                resolve({
                  base64Code: data,
                  base64Url: base64Url
                })
              }
            },
            (data) => {
              reject(data)
            }, opt)
        } catch (e) {
          console.log('_warn', 'Cordova maybe not exist.')
          reject(e)
        }
      })
    }
  },
  /**
   * 获取通讯录
   * @param fields {string} 查找内容
   * @param options {array} 参数
   * @return {*}
   */
  getContact: function (fields, options) {
    var promise = new Promise((resolve, reject) => {
      try {
        navigator.service.contacts.find(fields,
          function (msg) {
            resolve(msg)
          }, function (msg) {
            reject(msg)
          }, options)
      } catch (e) {
        console.log('_warn', 'Cordova maybe not exist.')
        reject(e)
      }
    })

    return promise
  },
  /**
   * 获取当前语言
   * 当没有引入cordova的时候，获取浏览器的语言环境，返回值需要处理才能设置语言环境比如 zh-cn 要对应到CN才能设置
   * @return {*|promise}
   */
  language: function () {
    if (config.env === 'local') {
      return new Promise((resolve, reject) => {
        resolve({language: config.language})
      })
    } else {
      if (window.cordova) {
        return this.callApi(_MIDEA_COMMON, 'language', [])
      } else {
        let lan = (navigator.language || navigator.browserLanguage).toLowerCase()
        return {
          language: lan
        }
      }
    }
  },
  /**
   * 退出应用
   * @return {*|promise}
   */
  exit: function () {
    if (window.cordova) {
      return this.callApi(_MIDEA_COMMON, 'exit', null)
    } else {
      window.history.go(-1)
    }
  },
}
