'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates.json')
const chalk = require('chalk')
const fs = require('fs')
// 检查url是否正确
const checkUrl = (urlString) => {
  if (urlString != "") {
    var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    if (!reg.test(urlString)) {
      return false
    }
  } else {
    return false
  }
  return true
}

module.exports = () => {
  co(function* () {
    // 接受用户输入
    const tplName = yield prompt('please input the template name: ')
    const gitUtl = yield prompt('please the template git url: ')
    const desc = yield prompt('please input the description: ')
    console.log(tplName)
    console.log(gitUtl)
    // 检测url是否有效
    if (!checkUrl(gitUtl)) {
      console.log(chalk.red('please input valid giturl'))
      process.exit()
    }
    // 避免重复添加
    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['giturl'] = gitUtl
      config.tpl[tplName]['desc'] = desc
    } else {
      console.log(chalk.red('this template is already'))
      process.exit()
    }
    // 写入到模板中去
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
      if (err) {
        throw err
      } else {
        console.log(chalk.green('New template added!\n'))
        console.log(chalk.grey('The last template list is: \n'))
        require('./list')()
        console.log('\n')
        process.exit()
      }
    })
  })
}