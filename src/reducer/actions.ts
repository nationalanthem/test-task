import { TransferFilterState } from '../TransferFilter'
import { Flight } from '../lib/FlightsDataTypes'
import { SortOptions } from '../SortBy'
import { PriceFilterState } from '../PriceFilter'

export enum ActionTypes {
  FETCH_ITEMS_START = 'FETCH_ITEMS_START',
  FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS',
  FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR',
  SET_MAX_ITEMS_TO_DISPLAY = 'SET_MAX_ITEMS_TO_DISPLAY',
  SET_SORT_BY = 'SET_SORT_BY',
  SET_TRANSFER_FILTER = 'SET_TRANSFER_FILTER',
  SET_PRICE_FILTER = 'SET_PRICE_FILTER',
  SET_AIRLINES_FILTER = 'SET_AIRLINES_FILTER',
}

interface FetchItemsStart {
  type: typeof ActionTypes.FETCH_ITEMS_START
}

interface FetchItemsSuccess {
  type: typeof ActionTypes.FETCH_ITEMS_SUCCESS
  payload: Flight[]
}

interface FetchItemsError {
  type: typeof ActionTypes.FETCH_ITEMS_ERROR
  payload: 'Произошла ошибка при загрузке данных'
}

interface SetMaxItemsToDisplay {
  type: typeof ActionTypes.SET_MAX_ITEMS_TO_DISPLAY
  payload: number
}

interface SetSortBy {
  type: typeof ActionTypes.SET_SORT_BY
  payload: SortOptions
}

interface SetTransferFilter {
  type: typeof ActionTypes.SET_TRANSFER_FILTER
  payload: TransferFilterState
}

interface SetPriceFilter {
  type: typeof ActionTypes.SET_PRICE_FILTER
  payload: PriceFilterState
}

interface SetAirlinesFilter {
  type: typeof ActionTypes.SET_AIRLINES_FILTER
  payload: string[]
}

export const startFetch = (): FetchItemsStart => {
  return { type: ActionTypes.FETCH_ITEMS_START }
}

export const successFetch = (payload: Flight[]): FetchItemsSuccess => {
  return {
    type: ActionTypes.FETCH_ITEMS_SUCCESS,
    payload,
  }
}

export const errorFetch = (): FetchItemsError => {
  return { type: ActionTypes.FETCH_ITEMS_ERROR, payload: 'Произошла ошибка при загрузке данных' }
}

export const setMaxItemsToDisplay = (payload: number): SetMaxItemsToDisplay => {
  return { type: ActionTypes.SET_MAX_ITEMS_TO_DISPLAY, payload }
}

export const setSortBy = (payload: SortOptions): SetSortBy => {
  return { type: ActionTypes.SET_SORT_BY, payload }
}

export const setTransferFilter = (payload: TransferFilterState): SetTransferFilter => {
  return { type: ActionTypes.SET_TRANSFER_FILTER, payload }
}

export const setPriceFilter = (payload: PriceFilterState): SetPriceFilter => {
  return { type: ActionTypes.SET_PRICE_FILTER, payload }
}

export const setAirlinesFilter = (payload: string[]): SetAirlinesFilter => {
  return { type: ActionTypes.SET_AIRLINES_FILTER, payload }
}

export type Actions =
  | FetchItemsStart
  | FetchItemsSuccess
  | FetchItemsError
  | SetMaxItemsToDisplay
  | SetSortBy
  | SetTransferFilter
  | SetPriceFilter
  | SetAirlinesFilter
