import React from 'react'
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material/'

const ControlledTextField = (props) => {
    const { id, input, setInput, label, options, ...rest } = props

    function onChange(e) {
        let value = e.target.value
        let data = { ...input }
        data[props.id] = value
        setInput(data)
    }

    return (
        <FormControl variant="standard">
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
                id={id}
                onChange={onChange}
                value={input[id] ?? ''}
                variant="standard"
                size="small"
                {...rest}
            >
                {options.map((option) => (
                    <MenuItem disabled={option.disabled} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ControlledTextField
