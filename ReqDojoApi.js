const axios = require('axios');
const _ = require('lodash');
const dbConnect = require( './dbConnect' );

const options = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
  params: {region: 'US', symbols: 'TWD=X, GC=F'},
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
};

function reqInsert(){
  axios.request(options)
  .then(function (res) {
    const quoteData = _.keyBy(res.data.quoteResponse.result, "symbol")
    const exchangeRate = quoteData["TWD=X"]["regularMarketPrice"]
    const futurePrice = quoteData["GC=F"]["regularMarketPrice"]
    const value = (exchangeRate*futurePrice).toFixed(2)
    dbConnect.insertPriceLog(value, true, 'rapid_api gc=f', 'toz', 'twd')
  })
  .catch(function (){ 
    dbConnect.insertPriceLog(null, false, 'rapid_api gc=f', null, null)
  });
  setTimeout(reqInsert, 1000*60*15);
}

module.exports = {
  reqInsert: reqInsert,
}

// ----------------------------------------------------------------------------------------------
// const exampleData = [
//   {
//     language: 'en-US',
//     region: 'US',
//     quoteType: 'CURRENCY',
//     typeDisp: 'Currency',
//     quoteSourceName: 'Delayed Quote',      
//     triggerable: true,
//     customPriceAlertConfidence: 'HIGH',    
//     currency: 'TWD',
//     regularMarketChange: 0.08000183,       
//     regularMarketChangePercent: 0.25000572,
//     regularMarketPrice: 32.08,
//     regularMarketDayHigh: 32.16,
//     regularMarketDayLow: 31.924,
//     regularMarketPreviousClose: 32,        
//     bid: 32.068,
//     ask: 32.168,
//     shortName: 'USD/TWD',
//     regularMarketOpen: 32,
//     fiftyTwoWeekLow: 25.991,
//     fiftyTwoWeekHigh: 35.103,
//     fiftyDayAverage: 31.509275,
//     twoHundredDayAverage: 29.737886,
//     firstTradeDateMilliseconds: 1080086400000,
//     priceHint: 4,
//     regularMarketTime: 1667805667,
//     regularMarketDayRange: '31.924 - 32.16',
//     regularMarketVolume: 0,
//     bidSize: 0,
//     askSize: 0,
//     exchange: 'CCY',
//     market: 'ccy_market',
//     messageBoardId: 'finmb_TWD_X',
//     fullExchangeName: 'CCY',
//     averageDailyVolume3Month: 0,
//     averageDailyVolume10Day: 0,
//     fiftyTwoWeekLowChange: 6.0890026,
//     fiftyTwoWeekLowChangePercent: 0.23427351,
//     fiftyTwoWeekRange: '25.991 - 35.103',
//     fiftyTwoWeekHighChange: -3.0229988,
//     fiftyTwoWeekHighChangePercent: -0.08611796,
//     marketState: 'REGULAR',
//     fiftyDayAverageChange: 0.5707264,
//     fiftyDayAverageChangePercent: 0.018112965,
//     twoHundredDayAverageChange: 2.3421154,
//     twoHundredDayAverageChangePercent: 0.078758635,
//     sourceInterval: 15,
//     exchangeDataDelayedBy: 0,
//     exchangeTimezoneName: 'Europe/London',
//     exchangeTimezoneShortName: 'GMT',
//     gmtOffSetMilliseconds: 0,
//     esgPopulated: false,
//     tradeable: false,
//     cryptoTradeable: false,
//     symbol: 'TWD=X'
//   },

//   {
//     language: 'en-US',
//     region: 'US',
//     quoteType: 'FUTURE',
//     typeDisp: 'Futures',
//     quoteSourceName: 'Delayed Quote',
//     triggerable: false,
//     customPriceAlertConfidence: 'NONE',
//     contractSymbol: false,
//     headSymbolAsString: 'GC=F',
//     currency: 'USD',
//     firstTradeDateMilliseconds: 967608000000,
//     priceHint: 2,
//     regularMarketChange: -3.5,
//     regularMarketChangePercent: -0.20875582,
//     regularMarketTime: 1667805075,
//     regularMarketPrice: 1673.1,
//     regularMarketDayHigh: 1683.4,
//     regularMarketDayRange: '1672.4 - 1683.4',
//     regularMarketDayLow: 1672.4,
//     regularMarketVolume: 34184,
//     regularMarketPreviousClose: 1676.6,
//     bid: 1673.2,
//     ask: 1673.2,
//     bidSize: 14,
//     askSize: 9,
//     exchange: 'CMX',
//     market: 'us24_market',
//     fullExchangeName: 'COMEX',
//     shortName: 'Gold Dec 22',
//     regularMarketOpen: 1678.6,
//     averageDailyVolume3Month: 982,
//     averageDailyVolume10Day: 889,
//     fiftyTwoWeekLowChange: 58,
//     fiftyTwoWeekLowChangePercent: 0.03591109,
//     fiftyTwoWeekRange: '1615.1 - 2072.0',
//     fiftyTwoWeekHighChange: -398.90002,
//     fiftyTwoWeekHighChangePercent: -0.19251932,
//     fiftyTwoWeekLow: 1615.1,
//     fiftyTwoWeekHigh: 2072,
//     marketState: 'REGULAR',
//     underlyingSymbol: 'GC.CMX',
//     underlyingExchangeSymbol: 'GCZ22.CMX',
//     openInterest: 335301,
//     expireDate: 1672185600,
//     expireIsoDate: '2022-12-28T00:00:00Z',
//     fiftyDayAverage: 1674.654,
//     fiftyDayAverageChange: -1.5540771,
//     fiftyDayAverageChangePercent: -0.0009279989,
//     twoHundredDayAverage: 1804.4344,
//     twoHundredDayAverageChange: -131.33447,
//     twoHundredDayAverageChangePercent: -0.07278428,
//     sourceInterval: 15,
//     exchangeDataDelayedBy: 10,
//     exchangeTimezoneName: 'America/New_York',
//     exchangeTimezoneShortName: 'EST',
//     gmtOffSetMilliseconds: -18000000,
//     esgPopulated: false,
//     tradeable: false,
//     cryptoTradeable: false,
//     symbol: 'GC=F'
//   }
// ]


// ----------------------------------------------------


// 美國黃金期貨報價的重量單位是 1金衡盎司 1toz
// 1toz = 31.1035g
// 1g = 37.5 台兩
// 1g = 3.75 台錢

// function trans(x){
//   // 1toz = 31.1035g
//   // 1g = 37.5 台兩
//   const exr = (3.75/31.1035)
//   return x*exr
// }