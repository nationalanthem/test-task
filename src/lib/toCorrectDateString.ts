const DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const MONTHS = [
  'янв.',
  'фев.',
  'мар.',
  'апр.',
  'мая',
  'июн.',
  'июл.',
  'авг.',
  'сен.',
  'окт.',
  'ноя.',
  'дек.',
]

export const toCorrectDateString = (datestring: string) => {
  const date = new Date(datestring)
  const dayOfMonth = date.getDate()
  const month = MONTHS[date.getMonth()]
  const dayOfWeek = DAYS[date.getDay()]

  return `${dayOfMonth} ${month} ${dayOfWeek}`
}
