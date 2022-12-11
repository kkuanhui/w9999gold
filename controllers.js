// require modules
const dbConnect = require('./dbConnect.js') 

const listApps = (req, res, next) => {
  dbConnect.listApps(req, res)
}

const getDetail = (req, res, next) => {
  const app = req.params.app
  if(app == `A01`){
    dbConnect.detailPlate(req, res)
  }else if(app == `A02`){
    dbConnect.detailPlate(req, res)
  }else if(app == `A03`){
    dbConnect.detailGoldfan(req, res)
  }else if(app == `A04`){
    dbConnect.detailOmori(req, res)
  }
}

const listProducts = (req, res, next) => {
  const app = req.params.app
  if(app == `A01`){
    dbConnect.listPlate(req, res)
  }else if(app == `A02`){
    dbConnect.listPlate(req, res)
  }else if(app == `A03`){
    dbConnect.listGoldfan(req, res)
  }else if(app == `A04`){
    dbConnect.listOmori(req, res)
  }
}

const getGoldQuote = (req, res, next) => {
  dbConnect.getGoldQuote(req, res, next)
}

const listAddons = (req, res, next) => {
  dbConnect.listAddons(req, res)
}

const getDetailAddons = (req, res, next) => {
  dbConnect.detailAddon(req, res)
}

module.exports = {
  listApps,
  getDetail,
  listProducts,
  getGoldQuote,
  listAddons,
  getDetailAddons,
}