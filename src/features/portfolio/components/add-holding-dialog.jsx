import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    IconButton,
    Box,
    Typography,
    Divider,
} from '@mui/material'
import { GetInputComponent } from 'components/input'
import { InputTypesEnum } from 'util/constants'
import { SearchStocks } from 'components/search'
import { isNullOrEmpty, updateObjectInMapByKey } from 'util/utility'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAddHoldingMutation } from 'services/api'

const AddHoldingInputConfig = [
    {
        id: 'shares',
        required: true,
        label: 'Shares',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: { xs: '50px', md: '150px' },
        },
    },
    {
        id: 'cost',
        required: true,
        label: 'Avg Cost',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: { xs: '50px', md: '150px' },
        },
    },
]

const AddHoldingDialog = () => {
    const [open, setOpen] = useState(false)
    const [holdings, setHoldings] = useState(new Map())
    const [saveHolding] = useAddHoldingMutation()

    function clearAndClose() {
        setOpen(false)
        setHoldings(new Map())
    }

    function addHolding(stock) {
        if (!holdings.has(stock.symbol)) {
            let newMap = new Map(holdings)
            newMap.set(stock.symbol, {
                ticker: stock.symbol,
                longname: stock.longname,
                sector: stock.sector,
                shares: '',
                cost: '',
            })
            setHoldings(new Map(newMap))
        }
    }

    function deleteHolding(key) {
        let newMap = new Map(holdings)
        newMap.delete(key)
        setHoldings(new Map(newMap))
    }

    async function submitHoldings(e) {
        e.preventDefault()
        const payload = Array.from(holdings.values())
        await saveHolding(payload)
        clearAndClose()
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>+ Add</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                scroll="paper"
                sx={{ height: '100vh' }}
                PaperProps={{
                    sx: { height: { xs: '70%', md: '100%' }, width: '600px' },
                }}
            >
                <DialogTitle>Add Holding</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        width="100%"
                        justifyContent="center"
                        sx={{
                            my: '24px',
                            border: '1px solid black',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <SearchStocks
                            width={{ xs: '100%', md: '550px' }}
                            onChange={(e, value, eventType) => {
                                if (eventType === 'selectOption') {
                                    addHolding(value)
                                }
                            }}
                        />
                    </Box>
                    <Typography variant="subtitle1">
                        {`${
                            isNullOrEmpty(holdings)
                                ? 'Choose symbols you would like to add:'
                                : 'Declare the Shares and Avg Cost of each stock you would like to add'
                        }`}
                    </Typography>
                    <form
                        onSubmit={submitHoldings}
                        id="holdings"
                        style={{ marginTop: '16px' }}
                    >
                        {Array.from(holdings.keys())?.map((key) => {
                            const stock = holdings.get(key)
                            return (
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    key={`stack-${key}`}
                                    sx={{
                                        my: '8px',
                                        position: 'relative',
                                        pr: '35px',
                                    }}
                                >
                                    <Box
                                        key={`container-${key}`}
                                        display="flex"
                                        flexDirection="column"
                                        width="50%"
                                        sx={{
                                            maxWidth: '50%',
                                            minWidth: '50%',
                                        }}
                                    >
                                        <Typography variant="h6">
                                            {stock.ticker}
                                        </Typography>
                                        <Box display="flex">
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                            >
                                                {stock.longname}
                                            </Typography>
                                            <Divider
                                                orientation="vertical"
                                                variant="middle"
                                                sx={{ m: '0 4px' }}
                                            />
                                            <Typography
                                                variant="subtitle2"
                                                noWrap
                                            >
                                                {stock.sector}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider
                                        orientation="vertical"
                                        variant="middle"
                                        flexItem
                                        sx={{ m: '0 8px' }}
                                    />
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        width="calc(50% - 16px)"
                                    >
                                        {AddHoldingInputConfig.map((input) => {
                                            return (
                                                <GetInputComponent
                                                    key={`input-${key}-${input.id}`}
                                                    getInput={holdings.get(key)}
                                                    setInput={(newValue) =>
                                                        setHoldings(
                                                            updateObjectInMapByKey(
                                                                holdings,
                                                                key,
                                                                newValue
                                                            )
                                                        )
                                                    }
                                                    input={input}
                                                />
                                            )
                                        })}
                                    </Stack>
                                    <IconButton
                                        onClick={() => deleteHolding(key)}
                                        sx={{
                                            position: 'absolute',
                                            top: 'calc(50% - 16px)',
                                            right: '-16px',
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            )
                        })}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearAndClose}>Cancel</Button>
                    <Button variant="outlined" type="submit" form="holdings">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddHoldingDialog
