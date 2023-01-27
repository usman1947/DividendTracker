import { isNil, isEmpty } from 'lodash';

export function isNullOrEmpty(value){
    if (typeof value === "number"){
        return false;
    }
    return isNil(value) || isEmpty(value)
}