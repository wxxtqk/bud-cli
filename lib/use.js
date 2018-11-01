'use strict'
var co = require('co')
var Radio = require('prompt-radio');
const coPrompt = require('co-prompt')
const config = require('../templates.json')
// 选择模板
const choice = () => {
  // 罗列出模板
  var tpls = Object.keys(config.tpl)
  var prompt = new Radio({
    name: 'tplchoices',
    message: 'You want to choose that template.',
    default: tpls[0],
    choices: tpls
  });
  return prompt.run()
    .then(function(answer) {
      console.log(answer);
      return new Promise((resolve, reject) => {
        if(answer){
          resolve(answer)
        }else{
          reject()
        }
      })
    })
}
module.exports = () => {
  co(function *() {
    // 输入项目名称
    const projectname = yield coPrompt('please input the project: ')
    // 获取选择的模板名
    const tplname = yield choice()
    require('./use-option')(tplname, projectname)
  })
}
