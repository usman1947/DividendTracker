import { isNil, isEmpty } from 'lodash'
import { DateTime } from 'luxon'
import businessDays from 'business-days-js'

export function isNullOrEmpty(value) {
    if (typeof value === 'number') {
        return false
    }
    return isNil(value) || isEmpty(value)
}

export function updateObjectInArrayById(array, predicate, updatedObj) {
    let tempArray = [...array]
    let index = tempArray.findIndex(predicate)
    tempArray[index] = updatedObj
    return tempArray
}

export function updateObjectInMapByKey(map, key, updatedValue) {
    let newMap = new Map(map)
    newMap.set(key, updatedValue)
    return newMap
}

export function getLastBusinessDay(minusDay = -2) {
    const bDays = businessDays({ state: 'pa' })
    const lastDay = DateTime.now().plus({ days: minusDay })
    if (bDays.check(lastDay)) {
        return lastDay.toFormat('yyyy-MM-dd')
    } else {
        return getLastBusinessDay(minusDay - 2)
    }
}

export function getCurrentMonthAndYear() {
    return DateTime.now().toFormat('MM-yyyy')
}

export function getReturnPercentage(value, cost) {
    return formatPercentage((value - cost) / cost)
}

export function formatCurrencyNumber(number) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
    }).format(number)
}

export function formatPercentage(percentage) {
    return new Intl.NumberFormat('en-GB', {
        style: 'percent',
        maximumFractionDigits: 2,
    }).format(percentage)
}

export function unFormatNumber(inputString) {
    return parseFloat(inputString.replace(/[,%$]/g, ''))
}

export function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export function generateUniqueRandomColors(numColors) {
    let colors = new Set()
    while (colors.size < numColors) {
        colors.add(generateRandomColor())
    }
    return Array.from(colors)
}

export async function removeImageBackground(image) {
    const backgroundColor = { red: 255, green: 255, blue: 255 }
    const threshold = 10

    const imageElement = new Image()
    imageElement.crossOrigin = 'anonymous' // Set the crossOrigin property to "anonymous"
    imageElement.src = image
    await new Promise((resolve) =>
        imageElement.addEventListener('load', resolve)
    )

    const canvas = document.createElement('canvas')
    canvas.width = imageElement.naturalWidth
    canvas.height = imageElement.naturalHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(imageElement, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < imageData.data.length; i += 4) {
        const red = imageData.data[i]
        const green = imageData.data[i + 1]
        const blue = imageData.data[i + 2]
        if (
            Math.abs(red - backgroundColor.red) < threshold &&
            Math.abs(green - backgroundColor.green) < threshold &&
            Math.abs(blue - backgroundColor.blue) < threshold
        ) {
            imageData.data[i + 3] = 0
        }
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL(`image/png`)
}
