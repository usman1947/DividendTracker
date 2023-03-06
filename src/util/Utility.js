import { isNil, isEmpty } from 'lodash';
import { DateTime } from 'luxon'
import businessDays from "business-days-js";

export function isNullOrEmpty(value){
    if (typeof value === "number"){
        return false;
    }
    return isNil(value) || isEmpty(value)
}

export function updateObjectInArrayById(array, predicate, updatedObj){
    let tempArray = [...array]
    let index = tempArray.findIndex(predicate);
    tempArray[index] = updatedObj;
    return tempArray;
}

export function updateObjectInMapByKey(map, key, updatedValue){
    let newMap = new Map(map)
    newMap.set(key, updatedValue)
    return newMap
}

export function getLastBusinessDay(minusDay = -2){
	const bDays = businessDays({state: "pa"});
    const lastDay = DateTime.now().plus({days: minusDay})
    if (bDays.check(lastDay)){
        return lastDay.toFormat('yyyy-MM-dd')
    } else {
        return getLastBusinessDay(minusDay - 2)
    }
}

export function getCurrentMonthAndYear(){
    return DateTime.now().toFormat('MM-yyyy')
}

export function getReturnPercentage(value, cost){
    return formatPercentage((value - cost) / cost)
}

export function formatCurrencyNumber(number){
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }).format(number)
}

export function formatPercentage(percentage){
    return new Intl.NumberFormat('en-GB', { style: 'percent', maximumFractionDigits: 2 }).format(percentage)
}

export function unFormatNumber(inputString){
    return parseFloat(inputString.replace(/[,%$]/g, ""));
}