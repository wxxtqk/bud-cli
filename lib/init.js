'use strict'
const exec = require('child_process').exec // 踊跃创建线程方面的
const tpls = require('../templates.json')
const co = require('co') // 处理异步
const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const rm = require('rimraf')
module.exports = (projectName) => {
  co(function*() {
    // 获取模板路径
    const giturl = tpls.tpl['react-admin'].giturl
    // 拉取项目
    // v1.0.0默认是react项目
    let cmdStr = `git clone ${giturl} ${projectName} && cd ${projectName}`
    // 开始创建项目
    console.log(chalk.white(`\n start generating the ${projectName}`))
    const spinner = ora(`generate ${projectName}...`)
    spinner.start()
    // 创建一个现场执行代码的克隆
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        throw error
      } else {
        // 删除.git文件
        rm(path.resolve(projectName, '.git'), err => {
          if (err) throw err
          // console.log(`文件路径${path.resolve(projectName, '.git')}`)
          spinner.stop()
          console.log(chalk.yellow('\n √ Generation completed! \n'))
          console.log(`\n cd ${projectName} && npm install \n`)
          console.log(`\n npm start \n`)
          process.exit()
        })
      }
    })
  })
}