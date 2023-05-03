const dbConnect = require('./dbConnect.js') 
const axios = require('axios');
const _ = require('lodash')
const cheerio = require('cheerio');

// TW bank
function scrapeTwBank(){
  axios.get(`https://rate.bot.com.tw/gold?Lang=zh-TW`)
  .then(( {data} ) => {
    const $ = cheerio.load(data);
    const sell = _.trim($(`td.ebank`).eq(0).clone().children().remove().end().text())
    const buy = _.trim($(`td.ebank`).eq(1).clone().children().remove().end().text())
    const valueSell = Number(sell.replace(/\,/g,''))
    const valueBuy = Number(buy.replace(/\,/g,''))
    return {valueBuy, valueSell}
  })
  .then((value) => {
    dbConnect.insertPriceLog(value.valueBuy, true, 'tw bank buy', 'g', 'twd')
    dbConnect.insertPriceLog(value.valueSell, true, 'tw bank sell', 'g', 'twd')
  })
  .catch(() => {
    dbConnect.insertPriceLog(null, false, 'tw bank sell', null, null)
    dbConnect.insertPriceLog(null, false, 'tw bank buy', null, null)
  })
  setTimeout(scrapeTwBank, 1000*60*15)
} 

// all beauty
function scrapeAllBeauty(){
  axios.get('https://www.allbeauty.com.tw/GoldPrice/')
  .then(( {data} ) => {
    const $ = cheerio.load(data);
    const sell = _.trim($(`#goldprice`).find(`td`).eq(2).text())
    const buy = _.trim($(`#goldprice`).find(`td`).eq(3).text())
    const numberSell = Number(sell.replace(/\,/g,''))
    const numberBuy = Number(buy.replace(/\,/g,''))
    return {numberBuy, numberSell}
  })
  .then((value) => {
    dbConnect.insertPriceLog(value.numberBuy, true, 'allbeauty buy', '台錢', 'twd')
    dbConnect.insertPriceLog(value.numberSell, true, 'allbeauty sell', '台錢', 'twd')
  })
  .catch(() => {
    dbConnect.insertPriceLog(null, true, 'allbeauty buy', null, null)
    dbConnect.insertPriceLog(null, true, 'allbeauty sell', null, null)
  })
  setTimeout(scrapeAllBeauty, 1000*60*15)
}

// https://www.goldlegend.com/
function scrapeGoldlegend(){
  axios.get('https://www.goldlegend.com/')
  .then(( {data} ) => {
    const $ = cheerio.load(data);
    const buy = _.trim($(`.goldprice_tw_buy`).eq(0).text())
    const sell = _.trim($(`.goldprice_tw_sell`).eq(0).text())
    const numberBuy = Number(buy.replace(/\,/g,''))
    const numberSell = Number(sell.replace(/\,/g,''))
    return {numberBuy, numberSell}
  })
  .then((value) => {
    dbConnect.insertPriceLog(value.numberBuy, true, 'goldlegend buy', '台錢', 'twd')
    dbConnect.insertPriceLog(value.numberSell, true, 'goldlegend sell', '台錢', 'twd')
  })
  .catch(() => {
    dbConnect.insertPriceLog(null, true, 'goldlegend buy', null, null)
    dbConnect.insertPriceLog(null, true, 'goldlegend sell', null, null)
  })
  setTimeout( scrapeGoldlegend, 1000*60*15)
}


module.exports = {
  scrapeAllBeauty,
  scrapeGoldlegend,
  scrapeTwBank,
}