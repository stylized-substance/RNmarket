export const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value))
}