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

export function getLastBusinessDay(minusDay = -1){
	const bDays = businessDays({state: "pa"});
    const lastDay = DateTime.now().plus({days: minusDay})
    if (bDays.check(lastDay)){
        return lastDay.toFormat('yyyy-MM-dd')
    } else {
        return getLastBusinessDay(minusDay - 1)
    }
}

export function getReturnPercentage(value, cost){
    return `${Math.round((((value - cost) / cost) * 100) * 100) / 100}%`
}

export function formatNumber(number){
    return new Intl.NumberFormat('en-GB', { style: 'decimal', currency: 'USD', maximumFractionDigits: 0 }).format(number)
}