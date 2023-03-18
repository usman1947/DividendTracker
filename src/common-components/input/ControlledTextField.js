import React from 'react'
import { TextField } from '@mui/material/'

const ControlledTextField = (props) => {
    const { id, input, setInput, allUppercase, ...rest } = props

    function onChange(e) {
        let value = e.target.value
        if (allUppercase) {
            value = value.toUpperCase()
        }
        let data = { ...input }
        data[props.id] = value
        setInput(data)
    }

    return (
        <TextField
            value={input[id] ?? ''}
            variant="standard"
            size="small"
            onChange={onChange}
            {...rest}
        ></TextField>
    )
}

export default ControlledTextField
