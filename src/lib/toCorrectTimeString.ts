export const toCorrectTimeString = (datestring: string) => {
  const date = new Date(datestring)

  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  if (+hours < 10) hours = '0' + hours
  if (+minutes < 10) minutes = '0' + minutes

  return `${hours}:${minutes}`
}
