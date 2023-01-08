'use strict';

var utils = require('../utils/writer.js');
var Transaction = require('../service/TransactionService');

module.exports.transactionAccNumberGET = function transactionAccNumberGET (req, res, next, accNumber) {
  Transaction.transactionAccNumberGET(accNumber)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.transactionPOST = function transactionPOST (req, res, next, body) {
  Transaction.transactionPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
