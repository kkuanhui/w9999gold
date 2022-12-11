// connect database using module knex
const knex = require('knex')({
  // note: This is heroku postgresql-slippery-95994.
  client: 'pg',
  // connection parameters is changing.
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }}
);

const listApps = (req, res) => {
  knex.select().from('app')
  .orderBy('app_id', 'asc')
  .then(function (data) {
    res.json(data)
  })
  .catch(err => res.status(400))
}

const detailPlate = (req, res) => {
  const paramApp = req.params.app
  knex.select(`*`)
    .from(`product_plate AS plate`)
    .where({'plate.app_id': paramApp})
    .join('product_plate_size AS size', function(){
        this.on('size.product_id', '=', 'plate.product_id')
      })
    .join('product_plate_size_wage AS wage', function(){
        this.on('wage.size', '=', 'size.size')
        .on('wage.app_id', '=', 'plate.app_id')
      })
  .then(function(data) {
    res.json(data)
  })
  .catch(err => res.status(400))
}

const detailGoldfan = (req, res) => {
  const productId = req.params.product
  knex.select()
  .from(`product_goldfan AS goldfan`)
  .then(function(data){
      res.json(data)
    }
  ).catch(err => res.status(400))
}

const detailOmori = (req, res) => {
  const productId = req.params.product
  knex.select()
  .from(`product_omori AS omori`)
  .then(function(data){
      res.json(data)
    }
  ).catch(err => res.status(400))
}

const listPlate = (req, res) => {
  const app = req.params.app
  knex.select(`show_name`, `product_id`)
  .from(`product_plate AS plate`)
  .where(`app_id`, `=`, app)
  .orderBy('product_id', 'asc')
  .then((data) => {
    res.json(data)
  })
  .catch(err => res.status(400))
}

const listGoldfan = (req, res) => {
  knex.select(`show_name`, `product_id`)
  .distinctOn(`product_id`)
  .from(`product_goldfan AS goldfan`)
  .orderBy('product_id', 'asc')
  .then((data) => {
    res.json(data)
  })
  .catch(err => res.status(400))
}

const listOmori = (req, res) => {
  knex.select(`show_name`, `product_id`)
  .distinctOn(`product_id`)
  .from(`product_omori AS omori`)
  .orderBy('product_id', 'asc')
  .then((data) => {
    res.json(data)
  })
  .catch(err => res.status(400))
}

const insertPriceLog = (value, status, source, unit, currency) => {
  knex.insert({source: source, is_req_success: status, price_value: value, unit: unit, currency: currency})
  .into(`price_log`)
  .catch(err => console.log(err))
}

const getGoldQuote = (req, res) => {
  knex.select(`timestamp`, 'price_value')
  .from(`price_log`)
  .where(`source`, `=`, `allbeauty sell`)
  .orderBy('timestamp', 'desc')
  .limit(1)
  .then((data) => {
    data[0]["price_value"] += 10
    res.json(data)
  })
  .catch(err => res.json([{'timestamp': null, 'price_value': null}]))
}

const listAddons = (req, res) => {
  const paramApp = req.params.app
  knex.select('*')
  .from(`product_plate_addon`)
  .where('app_id', '=', paramApp)
  .orderBy('addon_id', 'asc')
  .then((data) => {
    res.json(data)
  })
  .catch(() => {res.json([])})
}

const detailAddon = (req, res) => {
  const paramApp = req.params.app
  knex.select('*')
  .from(`product_plate_addon AS addon`)
  .join('product_plate_addon_size AS size', function(){
      this.on('size.addon_id', '=', 'addon.addon_id')
    })
  .join('product_plate_addon_size_wage AS wage', function(){
      this.on('wage.size', '=', 'size.size')
      .on('wage.app_id', '=', 'addon.app_id')
    })
  .where('addon.app_id', '=', paramApp)
  // .orderBy('addon_id', 'asc')
  .then((data) => {
    res.json(data)
  })
  .catch(() => {res.json([])})
}

module.exports = {
  listApps,
  detailPlate,
  detailOmori,
  detailGoldfan,
  listPlate,
  listGoldfan,
  listOmori,
  insertPriceLog,
  getGoldQuote,
  listAddons,
  detailAddon,
}