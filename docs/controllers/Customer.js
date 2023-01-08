'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/CustomerService');

module.exports.customerCustomerIdGET = function customerCustomerIdGET (req, res, next, customerId) {
  Customer.customerCustomerIdGET(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerGET = function customerGET (req, res, next) {
  Customer.customerGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerLoginPUT = function customerLoginPUT (req, res, next, body) {
  Customer.customerLoginPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.customerRegisterPOST = function customerRegisterPOST (req, res, next, body) {
  Customer.customerRegisterPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
