function Operator(type, args, classNames) {
  this._type = type;
  this._args = args;
  this._classNames = classNames;
  this._id = Math.random().toString();
}

Operator.prototype.constructor = Operator;

Operator.prototype.id = function() {
  return this._id;
};

Operator.prototype.type = function() {
  return this._type;
};

Operator.prototype.args = function() {
  return this.args;
};

Operator.prototype.classNames = function() {
  return this._classNames;
};

module.exports = Operator;
