'use strict'
const chalk = require('chalk')
const config = require('../templates.json')
module.exports = () => {
    const tpl = config.tpl
    Object.keys(tpl).map((item,index) => {
        console.log(chalk.green(`\n${index+1}、 name: ${item}  git: ${tpl[item].giturl} desc: ${tpl[item].desc}\n`))
    })
    // console.log(chalk.green(JSON.stringify(config.tpl)))

    process.exit()
}