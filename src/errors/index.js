//these class are used for error handler purpose

class InputRequire extends Error {
  constructor() {
    super();
  }
}
class Duplicate extends Error {
  constructor() {
    super();
  }
}
class IncorrectCredentials extends Error {
  constructor() {
    super();
  }
}
class ConnectionError extends Error {
  constructor() {
    super();
  }
}
class StringTooShort extends Error {
  constructor() {
    super();
  }
}
class WrongGender extends Error {
  constructor() {
    super();
  }
}
class WrongKey extends Error {
  constructor() {
    super();
  }
}
module.exports = {
  InputRequire,
  Duplicate,
  IncorrectCredentials,
  ConnectionError,
  StringTooShort,
  WrongGender,
  WrongKey,
};
