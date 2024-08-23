class BookNotFoundError extends Error {
  constructor() {
    super('Book information not available! Please manually add the book.');
  }
}

class APIFailedError extends Error {
  constructor(message) {
    super(`API Error: ${message}`);
  }
}

export { BookNotFoundError, APIFailedError };
