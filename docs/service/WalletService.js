'use strict';


/**
 * Account By Acc Number
 *
 * accNumber String String Acc Number of the wallet to get
 * no response value expected for this operation
 **/
exports.walletAccNumberGET = function(accNumber) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Add Balance for Testing
 *
 * body Object  (optional)
 * no response value expected for this operation
 **/
exports.walletDepositPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Accounts By Customer
 *
 * no response value expected for this operation
 **/
exports.walletGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create Account
 *
 * body Object  (optional)
 * returns #/components/responses/WalletQueryResponse
 **/
exports.walletPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "{}";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

