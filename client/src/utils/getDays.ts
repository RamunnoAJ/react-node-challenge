export function getDays(startDate: string): number {
  const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24
  const [day, month, year] = startDate.split('/').map(Number)

  const givenDate = new Date(year, month - 1, day)
  const today = new Date()

  const differenceInMs = -(+givenDate - +today)
  const daysPassed = Math.floor(differenceInMs / DAY_IN_MILISECONDS)

  return daysPassed
}
