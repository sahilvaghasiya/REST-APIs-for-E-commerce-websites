const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require('./user.model')(mongoose);
db.userCredential = require('./userCredential.model')(mongoose);
db.Product = require('./product.model')(mongoose);
db.Order = require('./order.model')(mongoose);
db.Payment = require('./payment.model')(mongoose);
db.Shipping = require('./shipping.model')(mongoose);
db.Session = require('./session.model')(mongoose);

module.exports = db;
