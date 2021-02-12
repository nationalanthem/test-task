import { createSelector } from 'reselect'
import { SortOptions } from '../SortBy'
import { RootState } from 'store'

import { AirlineCaption } from '../lib/FlightsDataTypes'

// core
export const selectItems = (state: RootState) => state.items

// error
export const selectErrorMessage = (state: RootState) => state.error

// filters
export const selectItemsToDisplay = (state: RootState) => state.itemsToDisplay
export const selectSortBy = (state: RootState) => state.sortBy
export const selectTransferFilterState = (state: RootState) => state.transferFilterState
export const selectPriceFilterState = (state: RootState) => state.priceFilterState
export const selectAirlinesFilter = (state: RootState) => state.airlinesFilter

// selectors
export const selectPartialItems = createSelector(
  [selectItems, selectItemsToDisplay],
  (items, itemsToDisplay) => items.slice(0, itemsToDisplay)
)

export const selectSortedItems = createSelector(
  [selectPartialItems, selectSortBy],
  (items, sortBy) => {
    const itemsCopy = items.slice()

    switch (sortBy) {
      case SortOptions.PRICE_ASC:
        return itemsCopy.sort((a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount)
      case SortOptions.PRICE_DESC:
        return itemsCopy.sort((a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount)
      case SortOptions.FLIGHT_TIME:
        return itemsCopy.sort(
          (a, b) =>
            b.flight.legs[0].duration +
            b.flight.legs[1].duration -
            (a.flight.legs[0].duration + a.flight.legs[1].duration)
        )
      default:
        return items
    }
  }
)

export const selectFilteredByTransferItems = createSelector(
  [selectSortedItems, selectTransferFilterState],
  (items, transferFilter) => {
    return items.filter((flightInfo) => {
      if (transferFilter.singleTransfer && transferFilter.withoutTransfer) {
        return !(
          flightInfo.flight.legs[0].segments.length === 2 &&
          flightInfo.flight.legs[1].segments.length === 2
        )
      }

      if (transferFilter.singleTransfer) {
        return (
          (flightInfo.flight.legs[0].segments.length === 2 &&
            flightInfo.flight.legs[1].segments.length === 1) ||
          (flightInfo.flight.legs[0].segments.length === 1 &&
            flightInfo.flight.legs[1].segments.length === 2)
        )
      }

      if (transferFilter.withoutTransfer) {
        return (
          flightInfo.flight.legs[0].segments.length === 1 &&
          flightInfo.flight.legs[1].segments.length === 1
        )
      }

      return true
    })
  }
)

export const selectFilteredByPriceItems = createSelector(
  [selectFilteredByTransferItems, selectPriceFilterState],
  (items, priceFilter) => {
    return items.filter((flightInfo) => {
      const flightPrice = +flightInfo.flight.price.total.amount

      if (+priceFilter.from > flightPrice) return false
      if (+priceFilter.to < flightPrice) return false

      return true
    })
  }
)

export const selectFilteredByAirlinesItems = createSelector(
  [selectFilteredByPriceItems, selectAirlinesFilter],
  (items, airlinesFilter) => {
    if (!airlinesFilter.length) {
      return items
    }

    return items.filter((item) => {
      return airlinesFilter.includes(item.flight.carrier.uid)
    })
  }
)

export const selectAirlines = createSelector([selectFilteredByPriceItems], (items) => {
  const airlines: Array<AirlineCaption & { minPrice: string }> = []

  items.forEach((outerItem) => {
    if (!airlines.some((innerItem) => innerItem.uid === outerItem.flight.carrier.uid)) {
      const carrier = { ...outerItem.flight.carrier }
      const prices: number[] = []

      items.forEach((item) =>
        item.flight.carrier.uid === carrier.uid
          ? prices.push(+item.flight.price.total.amount)
          : null
      )

      airlines.push({
        ...carrier,
        minPrice: Math.min(...prices).toString(),
      })
    }
  })

  return airlines.sort((a, b) => +a.minPrice - +b.minPrice)
})
