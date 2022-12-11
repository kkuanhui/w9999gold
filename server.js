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

// to serve api
app.get('/api', (req, res, next) => {
  res.send(`<pre>
  1. <a target="_blank" href="/"> / </a>
    Home

  2. <a target="_blank" href="/list-apps">/list-apps</a>
    List all apps.

  3. <a target="_blank" href="/list-products/A01">/list-products/:app</a>
    List all product under an app.

  4. <a target="_blank" href="/get-detail/A01">/get-detail/:app</a>
    List detaill information of a product.

  5. <a target="_blank" href="/list-addons/A01">/list-addons/:app/</a>
    List all addons under an app.

  6. <a target="_blank" href="/get-gold-quote">/get-gold-quote</a>
    Get the latest gold price quote.
    
  7. <a target="_blank" href="/get-detail-addons/A01">/get-detail-addons/:app/</a>
    Get detail informaion on an app.
  </pre>
  `)
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