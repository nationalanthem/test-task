import { SortOptions } from '../SortBy'
import { Flight } from '../lib/FlightsDataTypes'
import { Actions, ActionTypes } from './actions'
import { TransferFilterState } from '../TransferFilter'
import { PriceFilterState } from 'PriceFilter'

interface State {
  items: Flight[]
  itemsToDisplay: number
  sortBy: SortOptions | null
  transferFilterState: TransferFilterState
  priceFilterState: PriceFilterState
  airlinesFilter: string[]
  loading: boolean
  error: string | null
}

const initialState: State = {
  items: [],
  itemsToDisplay: 2,
  sortBy: null,
  transferFilterState: { singleTransfer: false, withoutTransfer: false },
  priceFilterState: { from: '0', to: '150000' },
  airlinesFilter: [],
  loading: false,
  error: null,
}

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      }
    case ActionTypes.FETCH_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ActionTypes.SET_MAX_ITEMS_TO_DISPLAY:
      return {
        ...state,
        itemsToDisplay: action.payload,
      }
    case ActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      }
    case ActionTypes.SET_TRANSFER_FILTER:
      return {
        ...state,
        transferFilterState: action.payload,
      }
    case ActionTypes.SET_PRICE_FILTER:
      return {
        ...state,
        priceFilterState: action.payload,
      }
    case ActionTypes.SET_AIRLINES_FILTER:
      return {
        ...state,
        airlinesFilter: action.payload,
      }
    default:
      return state
  }
}

export default reducer
