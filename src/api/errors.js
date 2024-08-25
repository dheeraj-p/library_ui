class BookNotFoundError extends Error {
  constructor() {
    super('Book information not available! Please manually add the book.');
  }
}

class CopyAlreadyBorrowed extends Error {
  constructor() {
    super('This book is already taken!');
  }
}

class CopyNotFound extends Error {
  constructor() {
    super('Could not find registered copy!');
  }
}

class APIFailedError extends Error {
  constructor(message) {
    super(`API Error: ${message}`);
  }
}

class UnknownDomainError extends Error {
  constructor() {
    super(`Please login with allowed account only.`);
  }
}

export {
  BookNotFoundError,
  APIFailedError,
  CopyAlreadyBorrowed,
  CopyNotFound,
  UnknownDomainError,
};
