"use client"

import { useState } from "react"

import ActionsList from "../actions/list"

import DashboardCard from "./card"
import TimeRangeSelect, { TimeRange } from "./range"
import CollateralUsdChart from "./collateral-usd-chart"

const Dashboard = () => {
  const [range, setRange] = useState<TimeRange>("AllTime")

  const dummyCollateralUsdData = [
    { value: 6000000, date: new Date(2023, 0, 1) }, // January 1, 2023
    { value: 4500000, date: new Date(2023, 1, 1) }, // February 1, 2023
    { value: 5000000, date: new Date(2023, 2, 1) }, // March 1, 2023
    { value: 7000000, date: new Date(2023, 3, 1) }, // April 1, 2023
    { value: 6500000, date: new Date(2023, 4, 1) }, // May 1, 2023
    { value: 8000000, date: new Date(2023, 5, 1) }, // June 1, 2023
    { value: 7500000, date: new Date(2023, 6, 1) }, // July 1, 2023
    { value: 8200000, date: new Date(2023, 7, 1) }, // August 1, 2023
    { value: 7800000, date: new Date(2023, 8, 1) }, // September 1, 2023
    { value: 8300000, date: new Date(2023, 9, 1) }, // October 1, 2023
    { value: 8100000, date: new Date(2023, 10, 1) }, // November 1, 2023
    { value: 8500000, date: new Date(2023, 11, 1) }, // December 1, 2023
  ]

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="relative w-full flex flex-col justify-center items-start">
        <TimeRangeSelect range={range} setRange={setRange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          <DashboardCard
            h1="3"
            h2="12"
            h2PopupDescription="Pending Facilities"
            title="Active Facilities"
            description="Credit Facilities where money has been disbursed"
            to="/credit-facilities?filter=active"
          />
          <DashboardCard
            h1="$240k"
            title="Total Disbursed"
            description="Total amount of money customers withdrew from the bank"
            to="/disbursals"
          />
          <DashboardCard
            h1="$283k"
            h2="5.2₿"
            title="Total Collateral"
            description="Total bitcoin collateral value at market rate that the bank holds"
            to="/credit-facilities"
          />
          <DashboardCard
            h1="$1.3k"
            title="Bank’s Profit"
            description="Net Profit or Loss the bank is making from interest paid by customers"
            to="/profit-and-loss"
          />
        </div>
        <div className="mt-[10px] w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
          <DashboardCard
            title="Collateral / USD Graph"
            description="History of bank-held collateral and its USD market value at the time."
            content={<CollateralUsdChart data={dummyCollateralUsdData} />}
          />
          <DashboardCard
            title="CVL Distribution"
            description="This shows loans and facilities with risk levels: red for collateral below liquidation threshold, yellow for collateral below margin call threshold, and green for sufficient collateral."
            to="/credit-facilities?sort=cvl&direction=asc"
            buttonToRight
            buttonText="View Risky Loans"
            content={
              <div className="flex w-full h-full min-h-48">
                {/* Red Section */}
                <div className="flex flex-col items-center justify-center w-full bg-red-100">
                  <div className="text-2xl font-bold text-red-600">24%</div>
                  <div className="text-sm text-red-600/90">$10.2k</div>
                </div>

                {/* Yellow Section */}
                <div className="flex flex-col items-center justify-center w-full bg-yellow-100">
                  <div className="text-2xl font-bold text-yellow-600">12.7%</div>
                  <div className="text-sm text-yellow-600/90">$3.3k</div>
                </div>

                {/* Green Section */}
                <div className="flex flex-col items-center justify-center w-full bg-green-100">
                  <div className="text-2xl font-bold text-green-600">63.3%</div>
                  <div className="text-sm text-green-600/90">$29k</div>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <ActionsList dashboard />
    </div>
  )
}

export default Dashboard
