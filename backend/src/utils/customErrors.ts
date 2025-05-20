export class TypeNarrowingError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'TypeNarrowingError';
  }
}

export class RefreshTokenExpiredError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'RefreshTokenExpiredError';
  }
}
