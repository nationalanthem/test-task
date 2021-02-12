import axios from 'axios'
import { FlightsData } from './FlightsDataTypes'

const FLIGHTS_DATA_URI = 'http://localhost:3000/result' // Адрес, по которому получаем JSON

export const getFlightsData = () => axios.get<FlightsData>(FLIGHTS_DATA_URI)
