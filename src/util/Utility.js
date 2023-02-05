import { isNil, isEmpty } from 'lodash';

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