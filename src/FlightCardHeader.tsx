import React from 'react'

// assets mapping

const AIRLINES: { [key: string]: string } = {
  AF: require('./assets/air-france.png'),
  KL: require('./assets/klm.png'),
  SU1: require('./assets/aeroflot.png'),
  TK: require('./assets/turkish-airlines.png'),
  AY: require('./assets/finnair.png'),
  BT: require('./assets/air-baltic.png'),
  AZ: require('./assets/alitalia.png'),
  PC: require('./assets/pegasus.png'),
  SN: require('./assets/brussels-airlines.png'),
  LO: require('./assets/lot-polish.png'),
}

interface HeaderProps {
  airline: string
  price: string
}

export const Header = ({ airline, price }: HeaderProps) => {
  return (
    <div className="header">
      {AIRLINES[airline] ? <img src={AIRLINES[airline]} /> : <h1>{airline}</h1>}
      <div className="header__price">
        <h2>{price} ₽</h2>
        <p>Стоимость для одного взрослого пассажира</p>
      </div>
    </div>
  )
}
