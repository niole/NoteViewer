function Operator(type, args, classNames) {
  this._type = type || "";
  this._args = args || [];
  this._classNames = classNames || [];
  this._id = Math.random().toString();
}

Operator.prototype.constructor = Operator;

Operator.prototype.setId = function(id) {
  this._id = id;
};

Operator.prototype.setType = function(type) {
  this._type = type;
};

Operator.prototype.setArgs = function(args) {
  this._args = args;
};

Operator.prototype.addClassName = function(c) {
  this._classNames.push(c);
};

Operator.prototype.removeClassName = function(c) {
  this._classNames = this._classNames.filter(function(name) {
    return name !== c;
  });
};

Operator.prototype.id = function() {
  return this._id;
};

Operator.prototype.type = function() {
  return this._type;
};

Operator.prototype.args = function() {
  return this._args;
};

Operator.prototype.classNames = function() {
  return this._classNames;
};

module.exports = Operator;
