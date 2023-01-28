import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, IconButton, Box, Typography, Divider } from '@mui/material';
import GetInputComponent from 'common-components/input/GetInputComponent'
import { InputTypesEnum } from 'util/Constants'
import { v4 as uuid } from 'uuid';
import { createHoldings } from 'database/holding.js'
import { useDispatch } from 'react-redux';
import SearchStocks from 'stocks/components/SearchStocks'
import { isNullOrEmpty } from 'util/Utility';
import DeleteIcon from '@mui/icons-material/Delete';

const AddHoldingInputConfig = [
    {
        id: 'shares',
        required: true,
        label: 'Shares',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '100px',
            marginRight: '8px'
        }
    },
    {
        id: 'cost',
        required: true,
        label: 'Avg Cost',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '100px',
            marginRight: '8px'
        }
    },
]

const AddHoldingDialog = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [holdings, setHoldings] = useState(new Map());

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
        clearAndClose()
    }

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                + Add
            </Button>
            <Dialog 
            open={open}
            onClose={() => setOpen(false)} 
            scroll='paper' 
            sx={{ height: '100vh'}}
            PaperProps={{
                sx : { height : '100%'}
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
                    width='500px'
                    onChange={(e, value, eventType) => {
                        if (eventType === 'selectOption'){
                            addHolding(value)
                        }
                    }}
                    />
                </Box>
                <Typography variant='h7'>
                    {`${isNullOrEmpty(holdings) ? 
                    'Choose symbols you would like to add:' : 
                    'Declare the number of Shares and Avg Cost'
                    }`}
                </Typography>
                <form onSubmit={submitHoldings} id='holdings' style={{marginTop: '16px'}}>
                    {Array.from(holdings.keys())?.map((key) => {
                        const stock = holdings.get(key)
                        return (
                            <Stack direction="row" justifyContent="space-between" key={`stack-${key}`} sx={{my: '8px', position: 'relative', pr: '35px' }}>
                                <Box key={`container-${key}`} display='flex' flexDirection='column' mr='16px' sx={{maxWidth: '45%'}}>
                                    <Typography variant='h6'>
                                        {stock.ticker}
                                    </Typography>
                                    <Box display='flex'>
                                        <Typography variant='h8-secondary' noWrap>
                                            {stock.name}
                                        </Typography>
                                        <Divider orientation="vertical" variant="middle" sx={{m:'0 4px'}}/>
                                        <Typography variant='h8-secondary' noWrap>
                                            {stock.region}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display='flex'>
                                    {AddHoldingInputConfig.map((input) => {
                                        return (
                                            <GetInputComponent
                                            key={`input-${key}-${input.id}`}
                                            getInput={holdings.get(key)}
                                            setInput={(newValue) => {
                                                let newMap = new Map(holdings)
                                                newMap.set(key, newValue)
                                                setHoldings(new Map(newMap))
                                            }}
                                            input={input}
                                            />
                                        )
                                    })}
                                </Box>
                                <IconButton 
                                onClick={() => deleteHolding(key)}
                                sx={{position: 'absolute', top: 'calc(50% - 20px)', right: '0px'}}>
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