class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

class BadGatewayError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadGatewayError";
    this.statusCode = 502;
  }
}

class ServiceUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceUnavailableError";
    this.statusCode = 503;
  }
}

class GatewayTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "GatewayTimeoutError";
    this.statusCode = 504;
  }
}

export {
  BadGatewayError,
  GatewayTimeoutError,
  InternalServerError,
  ServiceUnavailableError,
};
