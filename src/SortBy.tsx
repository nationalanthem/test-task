import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSortBy } from './reducer/actions'

export enum SortOptions {
  PRICE_ASC = 'sortPriceAsc',
  PRICE_DESC = 'sortPriceDesc',
  FLIGHT_TIME = 'sortFlightTime',
}

const options = [
  { value: SortOptions.PRICE_ASC, label: 'по возрастанию цены' },
  { value: SortOptions.PRICE_DESC, label: 'по убыванию цены' },
  { value: SortOptions.FLIGHT_TIME, label: 'по времени полёта' },
]

export const SortBy = () => {
  const [selectedOption, setSelectedOption] = useState<SortOptions>()

  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedOption) {
      dispatch(setSortBy(selectedOption))
    }
  }, [selectedOption, dispatch])

  return (
    <div style={{ margin: '20px 0' }}>
      <b>Сортировать</b>
      <div style={{ padding: '20px 0' }}>
        {options.map((option) => {
          return (
            <div key={option.value}>
              <input
                checked={selectedOption === option.value}
                id={option.value}
                onChange={() => {
                  setSelectedOption(option.value)
                }}
                type="radio"
              />
              <label htmlFor={option.value}> - {option.label}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
