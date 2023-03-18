import React from 'react'
import ControlledTextField from 'common-components/input/ControlledTextField'
import ControlledSelectField from 'common-components/input/ControlledSelectField'
import { InputTypesEnum } from 'util/Constants'

export const GetInputComponent = (props) => {
    const { input, setInput, getInput, ...rest } = props

    if (input.hide) {
        return null
    }

    switch (input.type) {
        case InputTypesEnum._TEXT:
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
