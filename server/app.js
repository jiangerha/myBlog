const fs = require('fs')
const path = require('path')
const express = require('express')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const db = require('./db')
const resolve = file=>path.resolve(__dirname, file)
const api = require('./api')
const app = express()

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
// app.use(favicon(resolve('../dist/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(cookieParser())
app.use('/dist', express.static(resolve('../dist')))
app.use(api)

app.post('/api/setup', function (req, res) {
  new db.User(req.body)
    .save()
    .then(()=> {
      res.status(200).end()
      db.initialized = true
    })
    .catch(()=>res.status(500).end())
})

app.get('/', function (req, res) {
  //部署后
  const fileName = db.initialized ? 'index.html' : 'setup.html'
  const html = fs.readFileSync(resolve('../' + fileName), 'utf-8')
  res.send(html)
  // res.send("mongoose")
})

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})