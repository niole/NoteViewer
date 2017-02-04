function Operator(type, args, classNames) {
  this._type = type || "";
  this._args = args || [];
  this._classNames = classNames || [];
  this._id = Math.random().toString(); //TODO this is a singleton, don't need an id
}

Operator.prototype.constructor = Operator;

Operator.prototype.complete = function() {
  return this.type() && this.args().length && this.classNames().length && this.id();
};

Operator.prototype.setId = function(id) {
  this._id = id;
};

Operator.prototype.setType = function(type) {
  this._type = type;
};

Operator.prototype.setArgs = function(args) {
  this._args = args;
};

Operator.prototype.hasClassName = function(c) {
  return this._classNames.indexOf(c) > -1;
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
