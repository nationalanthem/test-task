// Типы для получаемого JSON

interface Caption {
  uid: string
  caption: string
}

export interface AirlineCaption extends Caption {
  airlineCode: string
}

export interface Segment {
  airline: AirlineCaption

  arrivalAirport: Caption
  arrivalCity?: Caption
  arrivalDate: string

  departureAirport: Caption
  departureCity?: Caption
  departureDate: string

  operatingAirline?: AirlineCaption

  travelDuration: number
}

interface Leg {
  duration: number
  segments: Segment[]
}

interface Price {
  total: {
    amount: string
  }
}

export interface FlightInfo {
  carrier: AirlineCaption
  legs: Leg[]
  price: Price
}

export interface Flight {
  flight: FlightInfo
  flightToken: string
}

export interface FlightsData {
  flights: Flight[]
}
