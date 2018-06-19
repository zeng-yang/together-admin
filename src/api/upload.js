// 跟用户有关的API

import { axios } from './index'
import qs from 'qs'
import * as qiniu from 'qiniu-js'
const upload = {
  /**
   * 使用密码登录,client_id (返回的token写在store中,然后在用拦截器来给所有请求增加header)
   * @param {String} username 用户名
   * @param {String} password 密码
   * @param {String} client_id 目前是写死,暂无作用但必须提供
   */
  initUpload () {
    var config = {}
    data.AccessKey = 'Hx3hejEdZulPyRHggbtuJlcQG5UYk0xEV1rsdEDY'
    data.SecretKey = 'c2GY1xD70Twm1wu70ekDXvNWhKwEWIVKSWhEqJke'
    data.Bucket = 'together'
    data.Port = '9000'
    data.UptokenUrl='http://upload-z2.qiniup.com'
    data.Domain='p9mhxf2ng.bkt.clouddn.com'
    var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
    var config2 = new qiniu.conf.Config();
    // 这里主要是为了用 node sdk 的 form 直传，结合 demo 中 form 方式来实现无刷新上传
    config2.zone = qiniu.zone.Zone_z2;
    var formUploader = new qiniu.form_up.FormUploader(config2);
    var putExtra = new qiniu.form_up.PutExtra();
    var options = {
      scope: config.Bucket,
      deleteAfterDays: 1,
      returnBody:
        '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };

    var putPolicy = new qiniu.rs.PutPolicy(options);
    var bucketManager = new qiniu.rs.BucketManager(mac, null);

    var token = putPolicy.uploadToken(mac);
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
      res.json({
        uptoken: token,
        domain: config.Domain
      });
      return res
    }
  }
}

export default upload