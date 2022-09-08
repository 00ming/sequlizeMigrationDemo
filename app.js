const express = require('express')
const app = express()
const port = 3001
const sequelize = require('./database')
const { QueryTypes, fn} = require('sequelize');
const child_process = require('child_process');
const path = require('path')
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
app.get('/', (req, res) => {
    // const sql = 'select * from `User`'
    const sql = 'ALTER TABLE `User` DROP COLUMN test'
    // const sql = 'ALTER TABLE `User` ADD COLUMN test number default 1'
    sequelize.query(sql,{}).then(result =>{
        console.log(result)
        res.send('Hello World!')
    }).catch(error => {
        console.log(error)
        res.send('Hello World!')
    })
})
const umzug = new Umzug({
    migrations: {
        glob: '/Users/huangjiaming/Desktop/code/btr-pq-pcx/_PQBundle/mac/PQ.app/Contents/Resources/app/package/webcontent/sqliteDatabaseSync/migrations/*.js',
        resolve: ({ name, path, context }) => {
            const migration = require(path)
            console.log('migration')
            console.log(migration)
            return {
                // adjust the parameters Umzug will
                // pass to migration methods when called
                name,
                up: async () => migration.up(context, Sequelize),
                down: async () => migration.down(context, Sequelize),
            }
        },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});
setTimeout(async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    // const migrations = await umzug.up();
    const executed = await umzug.executed();
    const pending = await umzug.pending();
    const migrations = await umzug.down();
    console.log('executed',executed)
    console.log('pending',pending)
    console.log('migrations',migrations)
},1000)
(async () => {
    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    const migrations = await umzug.up();
    console.log(1)
    console.log(migrations)
})();
setTimeout(()=>{
    const a = path.join(__dirname,'./node_modules/sequelize-cli/lib/sequelize')+ ' db:migrate'
    child_process.exec(a,(err,stdout) =>{
        if (err) {
            console.log(1111)
            console.log(err)
            return
        }
        console.log(stdout)
        console.log(222)
    })
},3000)
// const fn1 = () =>{
//     return new Promise(resolve => {
//         setTimeout(()=>{
//             console.log('No:1')
//
//             resolve('No:1')
//         },1000)
//     })
//
// }
// const fn2 = () =>{
//     return new Promise(resolve => {
//         setTimeout(()=>{
//             console.log('No:2')
//             resolve('No:2')
//         },6000)
//     })
//
// }
// const fn3 = () =>{
//     return new Promise(resolve => {
//         setTimeout(()=>{
//             console.log('No:3')
//             resolve('No:3')
//         },1000)
//     })
// }
// const fn4 = () =>{
//     return new Promise(resolve => {
//         setTimeout(()=>{
//             console.log('No:4')
//             resolve('No:4')
//         },1000)
//     })
// }
// console.time('no await')
//  fn1();
//  fn2();
//  fn3();
//  fn4();
// console.timeEnd('no await')
// (async ()=>{
//     // console.time('await')
//     const res1 = await fn1();
//     console.log('入库',res1,'完成')
//     const res2 =  await fn2();
//     console.log('入库',res2,'完成')
//     const res3 =   await fn3();
//     console.log('入库',res3,'完成')
//     // console.timeEnd('await')
//
// })();
// (async ()=>{
//     const res4 = await fn4()
//     console.log('入库',res4,'完成')
// })()







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
