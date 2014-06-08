/**
 * ImpartialError class.
 */
var ImpartialError = function(msg) {
    this.name = 'ImpartialError';
    this.message = msg;
    Error.captureStackTrace(this, HAML.render);
};

/**
 * Inherits from Error
 */
ImpartialError.super_ = Error;
ImpartialError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: ImpartialError,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

// Export ImpartialError function
module.exports = ImpartialError;
