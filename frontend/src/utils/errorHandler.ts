const errorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    return `Error: ${error.message}`
  } else {
    return 'Error: unknown error happened'
  }
}

export default errorHandler