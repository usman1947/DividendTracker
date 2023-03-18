import {
    getReturnPercentage,
    formatCurrencyNumber,
    formatPercentage,
} from 'util/utility'
import { TaxRate } from 'util/constants'

export function GenerateHoldingsData(holdings, stocksData) {
    let totalValue = 0
    let totalCost = 0
    let totalAnnualIncome = 0

    let rowsData = holdings?.map((holding) => {
        const stockDetailData = stocksData.find(
            (d) => d.symbol === holding.ticker
        )
        const price = stockDetailData?.regularMarketPrice
        const buyPrice = holding.cost
        const shares = holding.shares
        const cost = shares * buyPrice
        const value = shares * price
        totalValue += value
        totalCost += cost
        const annualYield = stockDetailData?.trailingAnnualDividendYield
        const dividendAmount = stockDetailData?.trailingAnnualDividendRate
        const annualIncome = dividendAmount * shares
        const annualIncomeAfterTax = (annualIncome * (100 - TaxRate)) / 100
        totalAnnualIncome += annualIncomeAfterTax
        const yieldOnCost = annualIncome / cost
        const fiveYearDividendGrowth = holding.fiveYearCAGR / 10
        const sector = holding.sector
        const fiftyTwoWeekHigh = stockDetailData?.fiftyTwoWeekHigh
        const fiftyTwoWeekLow = stockDetailData?.fiftyTwoWeekLow
        return {
            ...holding,
            ...stockDetailData,
            cost: formatCurrencyNumber(cost),
            price: formatCurrencyNumber(price),
            unformattedValue: value,
            value: formatCurrencyNumber(value),
            returnPercentage: getReturnPercentage(value, cost),
            return: formatCurrencyNumber(value - cost),
            yield: formatPercentage(annualYield),
            annualIncome: formatCurrencyNumber(annualIncome),
            yoc: formatPercentage(yieldOnCost),
            annualIncomeAfterTax: formatCurrencyNumber(annualIncomeAfterTax),
            annualIncomeAfterTaxUnformatted: annualIncomeAfterTax,
            fiveYearDividendGrowth: formatPercentage(fiveYearDividendGrowth),
            fiveYearDividendGrowthUnformatted: fiveYearDividendGrowth,
            sector: sector,
            buyPrice: buyPrice,
            fiftyTwoWeekHigh: fiftyTwoWeekHigh,
            fiftyTwoWeekLow: fiftyTwoWeekLow,
            priceUnformatted: price,
        }
    })

    //push after mapping values
    rowsData?.forEach((r) => {
        r.weight = formatPercentage(r.unformattedValue / totalValue)
        r.weightUnformatted = r.unformattedValue / totalValue
    })

    return {
        data: rowsData,
        totalValue: formatCurrencyNumber(totalValue),
        totalValueUnformatted: totalValue,
        totalCostUnformatted: totalCost,
        totalReturnUnformatted: totalValue - totalCost,
        totalReturn: formatCurrencyNumber(totalValue - totalCost),
        returnPercentage: getReturnPercentage(totalValue, totalCost),
        totalAnnualIncome: totalAnnualIncome,
        totalDividendGrowth: weightedDividendCAGR(rowsData),
        stocksWithDividendThisMonth: getStocksWithDividendCurrentMonth(
            holdings,
            stocksData
        ),
    }
}

function weightedDividendCAGR(stocks) {
    let totalWeight = 0
    let weightedSum = 0

    stocks.forEach((stock) => {
        const weight = stock.weightUnformatted
        totalWeight += weight
        weightedSum += stock.fiveYearDividendGrowthUnformatted * weight
    })
    return weightedSum / totalWeight
}

function getStocksWithDividendCurrentMonth(holdings, stocksData) {
    let response = []
    holdings.forEach((holding) => {
        const holdingData = stocksData.find((d) => d.symbol === holding.ticker)
        const dividendDate = new Date(holdingData.dividendDate * 1000)
        const today = new Date()
        if (
            dividendDate.getMonth() === today.getMonth() &&
            dividendDate.getFullYear() === today.getFullYear()
        ) {
            response.push(holding.ticker)
        }
    })
    return response
}
