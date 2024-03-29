import React, { useEffect, useState } from 'react'
import {
    TextField,
    Autocomplete,
    CircularProgress,
    Typography,
    Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useLazyGetSearchStockQuery } from 'services/api'
import { isNullOrEmpty } from 'util/utility'

export const SearchStocks = (props) => {
    const { width, onChange } = props
    const data = useLazyGetSearchStockQuery()
    const [trigger, lastArg] = data
    const [inputText, setInputText] = useState('')
    const loading = lastArg.isFetching

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isNullOrEmpty(inputText)) {
                trigger(inputText, false)
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [inputText, trigger])

    return (
        <Autocomplete
            id="search-stocks"
            variant="search-stocks"
            value={null}
            blurOnSelect
            noOptionsText="Please enter a valid stock symbol"
            getOptionLabel={(option) => option.name}
            clearOnBlur
            selectOnFocus
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.symbol}>
                        <Typography variant="h6">{option.symbol}</Typography>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{ mx: '8px' }}
                        />
                        <Typography variant="h6">{option.longname}</Typography>
                    </li>
                )
            }}
            options={lastArg.data ?? []}
            loading={loading}
            onInputChange={(e, inputText, eventType) => {
                //onkey stroke
                if (eventType === 'input') {
                    setInputText(inputText)
                }
            }}
            //on value selected from list
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search Stocks"
                    variant="standard"
                    sx={{
                        width: width,
                    }}
                    type="search-stocks"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading && (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                )}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                        startAdornment: <SearchIcon />,
                    }}
                />
            )}
            filterOptions={(options) => options}
        />
    )
}

export default SearchStocks
