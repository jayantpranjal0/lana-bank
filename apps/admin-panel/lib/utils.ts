import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  CollateralAction,
  InterestInterval,
  LoanCollaterizationState,
  Period,
} from "./graphql/generated"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SATS_PER_BTC = 100_000_000
export const CENTS_PER_USD = 100

export const currencyConverter = {
  centsToUsd: (cents: number) => {
    return Number((cents / CENTS_PER_USD).toFixed(2))
  },

  btcToSatoshi: (btc: number) => {
    return Number((btc * SATS_PER_BTC).toFixed(0))
  },

  satoshiToBtc: (satoshi: number) => {
    return satoshi / SATS_PER_BTC
  },

  usdToCents: (usd: number) => {
    return Number((usd * CENTS_PER_USD).toFixed(0))
  },
}

export const formatDate = (isoDateString: string): string => {
  if (isoDateString === "-") return "-"

  const date = new Date(isoDateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const formattedDate = date.toLocaleDateString("en-US", options)
  const formattedTime = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase()

  return `${formattedDate}, ${formattedTime}`
}

export const formatRole = (role: string) => {
  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const formatPeriod = (period: Period) => {
  return period.charAt(0).toUpperCase() + period.slice(1).toLowerCase()
}

export const formatInterval = (interval: InterestInterval) => {
  return interval
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const formatCollateralizationState = (
  collateralizationState: LoanCollaterizationState,
) => {
  return collateralizationState
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const formatCollateralAction = (collateralAction: CollateralAction) => {
  return collateralAction === CollateralAction.Add ? "(Added)" : "(Removed)"
}

export const formatTransactionType = (typename: string) => {
  return typename
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (c) => c.toUpperCase())
}

export const isUUID = (str: string) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export const isEmail = (str: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(str)
}
