export const numToHoursAndMinutes = (num: number) => {
  const hours = Math.floor(num / 60)
  const minutes = num % 60

  return `${hours} ч ${minutes} мин`
}
