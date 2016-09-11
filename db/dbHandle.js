var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./model");

for (var model in models){
  mongoose.model(model, new Schema(models[model]));
}

module.exports = {
  getModel: function(type){
    return _getModel(type);
  }
};

var _getModel = function(type){
  return mongoose.model(type);
};
