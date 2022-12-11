require('dotenv').config()

const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const controllers = require('./controllers.js');
const ReqDojoApi = require( './ReqDojoApi.js' );
const ReqWebScraping = require('./ReqWebScraping.js')

const port = process.env.PORT || 80;
const app = express();

// to serve react build
app.use(favicon(__dirname + '/build/favicon/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// to serve api
app.get('/api', (req, res) => {
  res.render('api-doc')
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/list-apps', (req, res, next) => {
    controllers.listApps(req, res, next)
  }
)

app.get('/list-products/:app', (req, res, next) => 
  controllers.listProducts(req, res, next)
)

app.get(`/list-product-addon/:app`, (req, res, next) => {
  res.json(req.params)
})

app.get('/get-detail/:app', (req, res, next) => {
  controllers.getDetail(req, res, next)
})

app.get(`/list-addons/:app/`, (req, res, next) => {
  controllers.listAddons(req, res, next)
})

app.get(`/get-detail-addons/:app/`, (req, res, next) => {
  controllers.getDetailAddons(req, res, next)
})

app.get(`/get-gold-quote`, (req, res, next) => {
  controllers.getGoldQuote(req, res, next)
})

ReqWebScraping.scrapeAllBeauty()
ReqWebScraping.scrapeTwBank()
ReqWebScraping.scrapeGoldlegend()
ReqDojoApi.reqInsert()

app.listen(port);