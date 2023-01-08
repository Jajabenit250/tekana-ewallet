'use strict';

var utils = require('../utils/writer.js');
var Wallet = require('../service/WalletService');

module.exports.walletAccNumberGET = function walletAccNumberGET (req, res, next, accNumber) {
  Wallet.walletAccNumberGET(accNumber)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.walletDepositPOST = function walletDepositPOST (req, res, next, body) {
  Wallet.walletDepositPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.walletGET = function walletGET (req, res, next) {
  Wallet.walletGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.walletPOST = function walletPOST (req, res, next, body) {
  Wallet.walletPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
