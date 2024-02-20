export function convertKBToGB(kb: number): number {
  return Number((kb / 1000 / 1000).toFixed(1))
}
