import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, IconButton, Box, Typography, Divider } from '@mui/material';
import GetInputComponent from 'common-components/input/GetInputComponent'
import { InputTypesEnum } from 'util/Constants'
import { deleteHolding, updateHolding } from 'database/db.js'
import { useDispatch, useSelector } from 'react-redux';
import { updateObjectInArrayById } from 'util/Utility';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectHoldings } from 'services/holdingSlice';
import EditIcon from '@mui/icons-material/Edit';
import { isEqual } from 'lodash'

const EditHoldingInputConfig = [
    {
        id: 'shares',
        required: true,
        label: 'Shares',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '150px',
            marginRight: '8px'
        }
    },
    {
        id: 'cost',
        required: true,
        label: 'Avg Cost',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: '150px',
            marginRight: '8px'
        }
    },
]

const EditHoldingDialog = () => {

    const dispatch = useDispatch();
    const holdings = useSelector(selectHoldings)
    const [holdingsState, setHoldingsState] = useState([])
    const [open, setOpen] = useState(false);

    async function onDeleteHolding(id){
        await deleteHolding(id, dispatch)
    }

    function submitHoldings(e){
        e.preventDefault()
        let editedHoldings = holdingsState.filter((obj, i) => !isEqual(obj, holdings[i]));
        editedHoldings.forEach(async (h) => {
            await updateHolding(h._id, h.shares, h.cost, dispatch)
        })
        setOpen(false)
    }

    function onHoldingsChanged(){
        //sets the local state as when newly loaded or added new holdings
        if (holdingsState.length < holdings.length){
            setHoldingsState([...holdings])
        } else {
            //sets the local state when items are deleted
            setHoldingsState(
                holdingsState.filter(x => holdings.some(y => y.id === x.id))
            )
        }
    }

    useEffect(() => {
        onHoldingsChanged()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[holdings])

    return (
        <>
            <IconButton 
            onClick={() => setOpen(true)}>
                <EditIcon fontSize='small'/>
            </IconButton>
            <Dialog 
            open={open}
            onClose={() => setOpen(false)} 
            scroll='paper' 
            sx={{ height: '100vh'}}
            PaperProps={{
                sx : { height : '100%', width: '500px'}
            }}>
            <DialogTitle>Edit Holdings</DialogTitle>
            <DialogContent>
                <form onSubmit={submitHoldings} id='holdings' style={{marginTop: '16px'}}>
                    <Stack direction="row" alignItems='center'>
                        <Typography variant='h6' sx={{width: '100px'}}>
                            Ticker
                        </Typography>
                        <Typography variant='h6' sx={{width: '150px', mr:'8px'}}>
                            Shares
                        </Typography>
                        <Typography variant='h6' sx={{width: '150px'}}>
                            Avg Cost
                        </Typography>
                    </Stack>
                    {holdingsState?.map((holding) => {
                        const id = holding.id
                        return (
                            <Box key={`main-container-${id}`}>
                                <Stack direction="row" justifyContent="space-between" alignItems='center' key={`stack-${id}`} sx={{my: '8px', position: 'relative', pr: '35px' }}>
                                    <Box key={`container-${id}`} display='flex' flexDirection='column' sx={{width: '100px'}}>
                                        <Typography variant='body1' key={`ticker-${id}`}>
                                            {holding.ticker}
                                        </Typography>
                                    </Box>
                                    <Box display='flex' key={`box-${id}`}>
                                        {EditHoldingInputConfig.map((input) => {
                                            return (
                                                <GetInputComponent
                                                key={`input-${holding.id}-${input.id}`}
                                                getInput={holding}
                                                setInput={(newValue) => setHoldingsState(
                                                    updateObjectInArrayById(holdingsState, (obj => obj.id === id), newValue)
                                                )}
                                                input={input}
                                                />
                                            )
                                        })}
                                    </Box>
                                    <IconButton 
                                    onClick={() => onDeleteHolding(holding._id)}
                                    sx={{position: 'absolute', top: 'calc(50% - 20px)', right: '0px'}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Stack>
                                <Divider key={`divider-${id}`}/>
                            </Box>
                        )
                    })}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button variant="outlined" type='submit' form='holdings'>Update</Button>
            </DialogActions>
            </Dialog>
        </>
    );
}

export default EditHoldingDialog