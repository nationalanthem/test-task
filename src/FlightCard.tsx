import React from 'react'
import { Header } from './FlightCardHeader'

// types

import { FlightInfo, Segment } from './lib/FlightsDataTypes'

// utils

import { numToHoursAndMinutes } from './lib/numToHoursAndMinutes'
import { toCorrectTimeString } from './lib/toCorrectTimeString'
import { toCorrectDateString } from './lib/toCorrectDateString'

// styles

import './FlightCard.css'

interface LegProps {
  duration: number
  segments: Segment[]
  transfer: boolean
}

const Leg = ({ duration, segments, transfer }: LegProps) => {
  const arrivalPlace =
    segments.length > 1 ? (
      <>
        {segments[1].arrivalCity?.caption ? segments[1].arrivalCity.caption + ',' : ''}{' '}
        {segments[1].arrivalAirport.caption}{' '}
        <span className="destination__airport-uid">({segments[1].arrivalAirport.uid})</span>
      </>
    ) : (
      <>
        {segments[0].arrivalCity?.caption ? segments[0].arrivalCity.caption + ',' : ''}{' '}
        {segments[0].arrivalAirport.caption}{' '}
        <span className="destination__airport-uid">({segments[0].arrivalAirport.uid})</span>
      </>
    )

  const arrivalTime =
    segments.length > 1 ? (
      <>
        <span className="duration__date">{toCorrectDateString(segments[1].arrivalDate)}</span>{' '}
        {toCorrectTimeString(segments[1].arrivalDate)}
      </>
    ) : (
      <>
        <span className="duration__date">{toCorrectDateString(segments[0].arrivalDate)}</span>{' '}
        {toCorrectTimeString(segments[0].arrivalDate)}
      </>
    )

  return (
    <div className="leg">
      <div className="destination">
        {segments[0].departureCity?.caption ? segments[0].departureCity.caption + ',' : ''}{' '}
        {segments[0].departureAirport.caption}{' '}
        <span className="destination__airport-uid">({segments[0].departureAirport.uid})</span>{' '}
        <span className="destination__arrow">→</span> {arrivalPlace}
      </div>

      <hr className="leg__destination-divider" />

      <div className="duration">
        <div>
          {toCorrectTimeString(segments[0].departureDate)}{' '}
          <span className="duration__date">{toCorrectDateString(segments[0].departureDate)}</span>
        </div>
        <div>🕑{numToHoursAndMinutes(duration)}</div>
        <div>{arrivalTime}</div>
      </div>

      {transfer ? (
        <div className="transfer">
          <hr style={{ flex: 'auto' }} />
          <p>1 пересадка</p>
          <hr style={{ flex: 'auto' }} />
        </div>
      ) : (
        <div className="leg__duration-divider">
          <hr />
        </div>
      )}

      <p>
        Рейс выполняет:{' '}
        {segments[0].operatingAirline?.caption ||
          segments[1]?.operatingAirline?.caption ||
          segments[0].airline.caption}
      </p>
    </div>
  )
}

export const FlightCard: React.FC<{ flight: FlightInfo }> = ({ flight }) => {
  return (
    <div className="card">
      <Header airline={flight.carrier.uid} price={flight.price.total.amount} />
      <Leg {...flight.legs[0]} transfer={flight.legs[0].segments.length > 1} />
      <hr className="card__hr" />
      <Leg {...flight.legs[1]} transfer={flight.legs[1].segments.length > 1} />
      <button type="button" className="card__button">
        Выбрать
      </button>
    </div>
  )
}
