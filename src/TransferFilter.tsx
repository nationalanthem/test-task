import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setTransferFilter } from './reducer/actions'

enum TransferFilterEnum {
  SINGLE_TRANSFER = 'singleTransfer',
  WITHOUT_TRANSFER = 'withoutTransfer',
}

const checkboxes = [
  { value: TransferFilterEnum.SINGLE_TRANSFER, label: '1 пересадка' },
  { value: TransferFilterEnum.WITHOUT_TRANSFER, label: 'без пересадок' },
]

export interface TransferFilterState {
  singleTransfer: boolean
  withoutTransfer: boolean
}

export const TransferFilter = () => {
  const [filter, setFilter] = useState<TransferFilterState>({
    singleTransfer: false,
    withoutTransfer: false,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTransferFilter(filter))
  }, [filter, dispatch])

  return (
    <div style={{ margin: '20px 0' }}>
      <b>Фильтровать</b>
      <div style={{ padding: '20px 0' }}>
        {checkboxes.map((checkbox) => {
          return (
            <div key={checkbox.value}>
              <input
                id={checkbox.value}
                onChange={() => {
                  setFilter({ ...filter, [checkbox.value]: !filter[checkbox.value] })
                }}
                type="checkbox"
              />
              <label htmlFor={checkbox.value}> - {checkbox.label}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
