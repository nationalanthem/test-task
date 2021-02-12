import { Dispatch } from 'redux'
import { Actions, errorFetch, startFetch, successFetch } from './actions'
import { getFlightsData } from '../lib/api'

export const fetchItems = () => (dispatch: Dispatch<Actions>) => {
  dispatch(startFetch())

  getFlightsData()
    .then(({ data }) => dispatch(successFetch(data.flights)))
    .catch(() => dispatch(errorFetch()))
}
