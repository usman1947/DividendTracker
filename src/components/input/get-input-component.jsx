import React from 'react'
import ControlledTextField from './controlled-text-input'
import ControlledSelectField from './controlled-select-input'
import { InputTypesEnum } from 'util/constants'

export const GetInputComponent = (props) => {
    const { input, setInput, getInput, ...rest } = props

    if (input.hide) {
        return null
    }

    switch (input.type) {
        case InputTypesEnum._TEXT:
        case InputTypesEnum._PASSWORD:
            return (
                <ControlledTextField
                    {...rest}
                    {...input}
                    setInput={setInput}
                    input={getInput}
                />
            )
        case InputTypesEnum._NUMBER:
            return (
                <ControlledTextField
                    {...rest}
                    {...input}
                    setInput={setInput}
                    input={getInput}
                />
            )
        case InputTypesEnum._SELECT:
            return (
                <ControlledSelectField
                    {...rest}
                    {...input}
                    setInput={setInput}
                    input={getInput}
                />
            )
        default:
            return null
    }
}

export default GetInputComponent
