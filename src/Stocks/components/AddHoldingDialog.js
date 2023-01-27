import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, IconButton } from '@mui/material';
import GetInputComponent from 'common-components/input/GetInputComponent'
import { InputTypesEnum } from 'util/Constants'
import { v4 as uuid } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { createHoldings } from 'database/holding.js'
import { useDispatch } from 'react-redux';

const AddHoldingInputConfig = [
    {
        id: 'ticker',
        required: true,
        label: 'Ticker',
        allUppercase: true,
        type: InputTypesEnum._TEXT
    },
    {
        id: 'shares',
        required: true,
        label: 'Shares',
        type: InputTypesEnum._NUMBER
    },
    {
        id: 'cost',
        required: true,
        label: 'Avg Cost',
        type: InputTypesEnum._NUMBER
    },
]

const AddHoldingDialog = () => {

    const dispatch = useDispatch();
    const initialHoldingsMap = new Map([
        [
            uuid(), 
            {
                ticker: "",
                shares: "",
                cost: "",
            }
        ]
    ])
    const [open, setOpen] = useState(false);
    const [holdings, setHoldings] = useState(initialHoldingsMap);

    function clearAndClose(){
        setOpen(false);
        setHoldings(initialHoldingsMap)
    }
    
    function addHolding(){
        let newMap = new Map(holdings);
        newMap.set(uuid(), {
            ticker: "",
            shares: "",
            cost: "",
        })
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
            <Dialog open={open} onClose={() => setOpen(false)} sx={{ height: '80vh', overflow:'auto'}}>
            <DialogTitle>Add Holding</DialogTitle>
            <DialogContent>
                <form onSubmit={submitHoldings} id='holdings'>
                    {Array.from(holdings.keys()).map((key) => {
                        return (
                            <Stack direction="row" spacing={2} mt={1} key={`stack-${key}`}>
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
                            </Stack>
                        )
                    })}
                </form>
                <IconButton 
                onClick={addHolding}
                sx={{position: 'absolute', top: '20px', right: '20px'}}>
                    <AddIcon/>
                </IconButton>
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