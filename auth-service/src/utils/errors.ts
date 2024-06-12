export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Validation Error"
  }
}

export class ConnectionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "Connection Error"
  }
}