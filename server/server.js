const axios = require('axios')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use('/api', function (req, res) {
  // var url = 'http://120.26.6.213:3001/forward-service/api';
  // var url = 'http://178.128.31.228:5501/forward-service/api';
  // 测试环境
  var url = 'http://47.98.46.31:3001/forward-service/api';
  var _body = req.body;
  var param = 'code=' + _body.code + '&json=' + encodeURIComponent(_body.json);

  axios.post(url, param).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    res.json({ errorInfo: 'error', errorCode: 1 });
  });
  var now = new Date();
  let time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() +
    ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  console.log(time + ': {' + 'code: ' + _body.code + ', json: ' + _body.json + '}');
});

app.listen(9094, function(){
  console.log('Node app start at port 9094')
});
