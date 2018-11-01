'use strict'
var co = require('co')
const chalk = require('chalk')
const exec = require('child_process').exec // 踊跃创建线程方面的
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const config = require('../templates.json')
/**
 * tplname 模板名
 * projectname 项目名称
 */
module.exports = (tplname, projectname) => {
  co(function *() {
    // 判断文件夹不能够为空
    if(!projectname) {
      console.log(chalk.red('\n the input is null \n'))
      process.exit()
    } else {
      const projectPath = path.resolve(projectname);
      // 判断改目录下是否存在改文件夹
      fs.exists(projectPath, (exist) => {
        if(exist) {
          console.log(chalk.red('\n this project is exist \n'))
          process.exit()
        } else {
          // 开始执行创建项目
          console.log(chalk.green('generate project'))
          // 执行模板文件的拉取
          const giturl = config.tpl[tplname].giturl
          let cmdStr = `git clone ${giturl} ${projectname} && cd ${projectname}`
          // 开始创建项目
          console.log(chalk.white(`\n start generating the ${projectname}`))
          const spinner = ora(`generate ${projectname}...`)
          spinner.start()
          // 创建一个现场执行代码的克隆
          exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
              throw error
            } else {
              // 删除.git文件
              rm(path.resolve(projectname, '.git'), err => {
                if (err) throw err
                // console.log(`文件路径${path.resolve(projectname, '.git')}`)
                spinner.stop()
                console.log(chalk.yellow('\n √ Generation completed! \n'))
                console.log(`\n cd ${projectname} && npm install \n`)
                console.log(`\n npm start \n`)
                process.exit()
              })
            }
          })
        }
      })
    }
  })
}
