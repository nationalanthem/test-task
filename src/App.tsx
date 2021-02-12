import React, { useEffect, useState, useRef } from 'react'

// redux

import { useDispatch, useSelector } from 'react-redux'
import { setMaxItemsToDisplay } from './reducer/actions'
import { fetchItems } from './reducer/effects'
import {
  selectFilteredByAirlinesItems,
  selectItems,
  selectItemsToDisplay,
  selectErrorMessage,
} from './reducer/selectors'

// components

import { FlightCard } from './FlightCard'
import { SortBy } from './SortBy'
import { TransferFilter } from './TransferFilter'
import { PriceFilter } from './PriceFilter'
import { AirlinesFilter } from './AirlinesFilter'

// styles

import './App.css'

export const App = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  const items = useSelector(selectItems)
  const error = useSelector(selectErrorMessage)
  const filteredItems = useSelector(selectFilteredByAirlinesItems)
  const itemsToDisplay = useSelector(selectItemsToDisplay)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  useEffect(() => {
    if (items.length && ref.current) {
      const handleRemoveDiv = () => {
        if (ref.current) ref.current.style.display = 'none'
      }

      ref.current.addEventListener('animationend', handleRemoveDiv)

      setLoading(false)

      return () => {
        ref.current?.removeEventListener('animationend', handleRemoveDiv)
      }
    }
  }, [items])

  return (
    <>
      <div ref={ref} className={`app-loading${loading ? '' : ' app-loading--loaded'}`}>
        <h1>Загрузка...</h1>
      </div>

      <div className="app">
        <div className="side-menu">
          <SortBy />
          <TransferFilter />
          <PriceFilter />
          <AirlinesFilter />
        </div>

        <div className="cards">
          {filteredItems.length ? (
            <>
              {filteredItems.map((item) => (
                <FlightCard key={item.flightToken} flight={item.flight} />
              ))}

              {items.length > itemsToDisplay && (
                <>
                  <button
                    onClick={() => {
                      dispatch(setMaxItemsToDisplay(itemsToDisplay + 4))
                    }}
                  >
                    Показать ещё
                  </button>
                  <p className="items-shown">
                    Показано: {itemsToDisplay} из {items.length} ({filteredItems.length}, с учётом
                    фильтров)
                  </p>
                </>
              )}
            </>
          ) : (
            <div className="not-found">
              <h1>Не найдено</h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
