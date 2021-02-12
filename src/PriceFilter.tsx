import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setPriceFilter } from './reducer/actions'

import debounce from 'debounce'

export interface PriceFilterState {
  from: string
  to: string
}

export const PriceFilter = () => {
  const [filter, setFilter] = useState<PriceFilterState>({
    from: '0',
    to: '150000',
  })

  const dispatch = useDispatch()

  // Для UX
  const db = useCallback(
    debounce((filter: PriceFilterState) => {
      dispatch(setPriceFilter(filter))
    }, 300),
    []
  )

  return (
    <div style={{ margin: '20px 0' }}>
      <b>Цена</b>
      <div style={{ padding: '20px 0' }}>
        <label htmlFor="from">От </label>
        <input
          id="from"
          value={filter.from}
          onChange={(e) => {
            if (+e.target.value < 0) {
              e.target.value = '0'
            }

            const newFilter = { ...filter, from: e.target.value }

            setFilter(newFilter)
            db(newFilter)
          }}
          type="number"
        />
      </div>
      <div>
        <label htmlFor="to">До </label>
        <input
          id="to"
          value={filter.to}
          onChange={(e) => {
            if (+e.target.value < 0) {
              e.target.value = '0'
            }

            const newFilter = { ...filter, to: e.target.value }

            setFilter(newFilter)
            db(newFilter)
          }}
          type="number"
        />
      </div>
    </div>
  )
}
