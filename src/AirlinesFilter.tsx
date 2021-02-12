import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAirlinesFilter } from './reducer/actions'
import { selectAirlines } from './reducer/selectors'

export const AirlinesFilter = () => {
  const [airlinesTitles, setAirlinesTitles] = useState<string[]>([])

  const dispatch = useDispatch()

  const airlinesObjects = useSelector(selectAirlines)

  useEffect(() => {
    dispatch(setAirlinesFilter(airlinesTitles))
  }, [airlinesTitles, dispatch])

  return (
    <div style={{ margin: '30px 0' }}>
      <b>Авиакомпании</b>
      <div style={{ padding: '20px 0' }}>
        {airlinesObjects.length ? (
          airlinesObjects.map((item) => {
            return (
              <div style={{ display: 'flex', width: 350 }} key={item.caption}>
                <input
                  checked={airlinesTitles.includes(item.uid)}
                  id={item.uid}
                  type="checkbox"
                  onChange={() => {
                    const { uid } = item
                    if (!airlinesTitles.includes(uid)) {
                      setAirlinesTitles([...airlinesTitles, uid])
                    } else {
                      setAirlinesTitles(airlinesTitles.filter((title) => title !== uid))
                    }
                  }}
                />
                <div
                  style={{
                    width: '65%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <label title={item.caption} htmlFor={item.uid}>
                    &nbsp;- {item.caption}
                  </label>
                </div>
                <p style={{ color: 'gray', marginLeft: 'auto' }}>от {item.minPrice} р.</p>
              </div>
            )
          })
        ) : (
          <span>Не найдено</span>
        )}
      </div>
    </div>
  )
}
