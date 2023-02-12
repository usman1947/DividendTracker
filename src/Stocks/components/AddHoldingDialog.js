import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, IconButton, Box, Typography, Divider } from '@mui/material';
import GetInputComponent from 'common-components/input/GetInputComponent'
import { InputTypesEnum, Sectors } from 'util/Constants'
import { v4 as uuid } from 'uuid';
import { createHoldings } from 'database/db.js'
import { useDispatch } from 'react-redux';
import SearchStocks from 'stocks/components/SearchStocks'
import { isNullOrEmpty, updateObjectInMapByKey } from 'util/Utility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLazyGetStocksDataQuery } from 'services/api'
import { uniq } from 'lodash'

const AddHoldingInputConfig = [
    {
        id: 'sector',
        required: true,
        label: 'Sector',
        type: InputTypesEnum._SELECT,
        sx: {
            width: '100px',
        }
    },
    {
        id: 'shares',
        required: true,
        label: 'Shares',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '72px',
        }
    },
    {
        id: 'cost',
        required: true,
        label: 'Avg Cost',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '72px',
        }
    },
    {
        id: 'fiveYearDividendGrowth',
        required: true,
        label: '5 Year Dividend Growth %',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '72px',
        }
    },
]

const AddHoldingDialog = (props) => {

    const { currentHoldings } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [holdings, setHoldings] = useState(new Map());
	const [triggerGetStocksData] = useLazyGetStocksDataQuery()
    const options = {
        sector: Object.entries(Sectors).map(keyValuePair => (
            {
                label: keyValuePair[1],
                value: keyValuePair[0]
            }
        ))
    }

    function clearAndClose(){
        setOpen(false);
        setHoldings(new Map())
    }

    function addHolding(stock){
        if (!holdings.has(stock.symbol)){
            let newMap = new Map(holdings);
            newMap.set(uuid(), {
                ticker: stock.symbol,
                name: stock.name,
                region: stock.region,
                shares: "",
                cost: "",
                sector: "",
                fiveYearDividendGrowth: "",
            })
            setHoldings(new Map(newMap))
        }
    }

    function deleteHolding(key){
        let newMap = new Map(holdings);
        newMap.delete(key)
        setHoldings(new Map(newMap))
    }

    function submitHoldings(e){
        e.preventDefault();
        createHoldings(Array.from(holdings.values()), dispatch)
        const stocks = uniq(isNullOrEmpty(currentHoldings) ? 
                        Array.from(holdings.values()) : 
                        [...currentHoldings, ...Array.from(holdings.values())])
        const tickers = stocks.map(r => r.ticker).join(',')
        triggerGetStocksData(tickers)
        clearAndClose()
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                + Add
            </Button>
            <Dialog 
            open={open}
            onClose={() => setOpen(false)} 
            scroll='paper' 
            sx={{ height: '100vh'}}
            PaperProps={{
                sx : { height : '100%', width:'600px'}
            }}>
            <DialogTitle>Add Holding</DialogTitle>
            <DialogContent>
                <Box display='flex' width='100%' justifyContent='center'
                sx={{
                    my: '24px',
                    border: '1px solid black',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                }}>
                    <SearchStocks 
                    width='550px'
                    onChange={(e, value, eventType) => {
                        if (eventType === 'selectOption'){
                            addHolding(value)
                        }
                    }}
                    />
                </Box>
                <Typography variant='subtitle1'>
                    {`${isNullOrEmpty(holdings) ? 
                    'Choose symbols you would like to add:' : 
                    'Declare the Sector, Shares, Avg Cost and 5 Year Avg Dividend Growth %'
                    }`}
                </Typography>
                <form onSubmit={submitHoldings} id='holdings' style={{marginTop: '16px'}}>
                    {Array.from(holdings.keys())?.map((key) => {
                        const stock = holdings.get(key)
                        return (
                            <Stack direction="row" justifyContent="space-between" key={`stack-${key}`} sx={{my: '8px', position: 'relative', pr: '35px' }}>
                                <Box key={`container-${key}`} display='flex' flexDirection='column' sx={{maxWidth: '30%', width: '30%'}}>
                                    <Typography variant='h6'>
                                        {stock.ticker}
                                    </Typography>
                                    <Box display='flex'>
                                        <Typography variant='subtitle2' type='secondary' noWrap>
                                            {stock.name}
                                        </Typography>
                                        <Divider orientation="vertical" variant="middle" sx={{m:'0 4px'}}/>
                                        <Typography variant='subtitle2' type='secondary' noWrap>
                                            {stock.region}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem sx={{m:'0 8px'}}/>
                                <Stack direction='row' spacing={1}>
                                    {AddHoldingInputConfig.map((input) => {
                                        return (
                                            <GetInputComponent
                                            key={`input-${key}-${input.id}`}
                                            getInput={holdings.get(key)}
                                            setInput={(newValue) => setHoldings(
                                                updateObjectInMapByKey(holdings, key, newValue)
                                            )}
                                            options={options[input.id]}
                                            input={input}
                                            />
                                        )
                                    })}
                                </Stack>
                                <IconButton 
                                onClick={() => deleteHolding(key)} disableRipple
                                sx={{position: 'absolute', top: 'calc(50% - 20px)', right: '-16px'}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Stack>
                        )
                    })}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={clearAndClose}>
                    Cancel
                </Button>
                <Button variant="outlined" type='submit' form='holdings'>Add</Button>
            </DialogActions>
            </Dialog>
        </>
    );
}

export default AddHoldingDialog