const Logger = require('../util/logger');
const ObjectId = require('mongoose').Types.ObjectId;

const CheckIdisValid = (id, err) => async (req, res, next) => {
   const reqId = req.params[id].toString();
   console.log(reqId, ObjectId.isValid(reqId));
   if (!ObjectId.isValid(reqId)) {
      if (req && !req.errors) req.errors = [];
      req.errors.push({ msg: err });
   }

   next();
};
function validationErrors(req) {
   if (req.errors) {
      return req.errors;
   }
   return [];
}

Array.prototype.isEmpty = function () {
   if (this.length > 0) {
      return false;
   }
   return true;
};
Array.prototype.array = function () {
   return { errors: this };
};

/******************************************************************************
Desc: API rout middleware, to validate input valid, empty, generate the error
usage: CheckInput('id','Id invalid').isValid()
******************************************************************************/

function CheckInput(id, err = '') {
   let data = {};
   data.id = id;
   data.err = err;

   data.isEmpty = function () {
      console.log('is empty');
   };

   data.check = function () {
      return function (req, res, next) {
         console.log('check');
         next();
      };
   };

   //check query is valid query
   data.query = function () {
      let query = {};
      query.isQuery = function () {
         return function (req, res, next) {
            if (!Object.keys(req.query).includes(id)) {
               if (req && !req.errors) req.errors = [];
               req.errors.push({
                  msg: 'Query Tags is not exists',
                  param: id,
                  body: '',
               });
            } else {
               if (req.query[id].trim() == '') {
                  if (req && !req.errors) req.errors = [];
                  req.errors.push({
                     msg: 'Query tags is empty',
                     param: id,
                     body: '',
                  });
               }
            }
            next();
         };
      };
      return query;
   };
   data.isValid = function () {
      return function (req, res, next) {
         const reqId = req.params[id].toString();
         if (!ObjectId.isValid(reqId)) {
            if (req && !req.errors) req.errors = [];
            req.errors.push({ msg: err, param: id, body: reqId });
         }
         next();
      };
   };
   data.not = function () {
      let not = {};
      not.isEmpty = function () {
         return function (req, res, next) {
            next();
         };
      };
      return not;
   };

   return data;
}
/******************************************************************************
Desc: Check errors generated from the CheckInput
Usage: let x = validationError(req), x.isEmpty()
******************************************************************************/
function validationError(req) {
   let errors = {};
   errors.err = req.errors ? req.errors : [];
   errors.isEmpty = function () {
      if (errors.err.length > 0) {
         return false;
      }
      return true;
   };
   errors.array = function () {
      return { errors: errors.err };
   };
   return errors;
}
module.exports = {
   CheckIdisValid,
   validationErrors,
   CheckInput,
   validationError,
};
