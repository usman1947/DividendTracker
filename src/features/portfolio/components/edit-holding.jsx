import React, { useState, useEffect } from 'react'
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
import { updateObjectInArrayById } from 'util/utility'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
    useGetAllHoldingsQuery,
    useDeleteHoldingMutation,
    useUpdateHoldingMutation,
} from 'services/api'

const EditHoldingInputConfig = [
    {
        id: 'shares',
        required: true,
        label: 'Shares',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: { xs: '70px', md: '150px' },
            marginRight: '8px',
        },
    },
    {
        id: 'cost',
        required: true,
        label: 'Avg Cost',
        type: InputTypesEnum._NUMBER,
        sx: {
            width: { xs: '70px', md: '150px' },
            marginRight: '8px',
        },
    },
]

const EditHoldingDialog = () => {
    const holdingsApi = useGetAllHoldingsQuery()
    const [deleteHolding, deleteApi] = useDeleteHoldingMutation()
    const [updateHoldingCall, editApi] = useUpdateHoldingMutation()
    const [holdingsState, setHoldingsState] = useState([])
    const [open, setOpen] = useState(false)
    const isLoading = deleteApi.isLoading || editApi.isLoading

    async function onDeleteHolding(id) {
        await deleteHolding(id)
    }

    async function updateHolding(id) {
        const holding = holdingsState.find((h) => h._id === id)
        updateHoldingCall({ id, body: holding })
    }

    function submitHoldings(e) {
        e.preventDefault()
        setOpen(false)
    }

    function onHoldingsChanged() {
        //sets the local state as when newly loaded or added new holdings
        if (holdingsState.length < holdingsApi.data?.length) {
            setHoldingsState([...holdingsApi.data])
        } else {
            //sets the local state when items are deleted
            setHoldingsState(
                holdingsState.filter((x) =>
                    holdingsApi.data.some((y) => y._id === x._id)
                )
            )
        }
    }

    useEffect(() => {
        onHoldingsChanged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [holdingsApi.data])

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <EditIcon fontSize="small" />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                scroll="paper"
                sx={{ height: '100vh' }}
                PaperProps={{
                    sx: { height: { xs: '70%', md: '100%' }, width: '500px' },
                }}
            >
                <DialogTitle>Edit Holdings</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={submitHoldings}
                        id="holdings"
                        style={{ marginTop: '16px' }}
                    >
                        <Stack direction="row" alignItems="center">
                            <Typography
                                variant="h6"
                                sx={{ width: { xs: '85px', md: '100px' } }}
                            >
                                Ticker
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    width: { xs: '70px', md: '150px' },
                                    mr: '8px',
                                }}
                            >
                                Shares
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ width: { xs: '100px', md: '150px' } }}
                            >
                                Avg Cost
                            </Typography>
                        </Stack>
                        {holdingsState?.map((holding) => {
                            const id = holding._id
                            return (
                                <Box key={`main-container-${id}`}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        key={`stack-${id}`}
                                        sx={{
                                            my: '8px',
                                            position: 'relative',
                                            pr: '35px',
                                        }}
                                    >
                                        <Box
                                            key={`container-${id}`}
                                            display="flex"
                                            flexDirection="column"
                                            sx={{ width: '100px' }}
                                        >
                                            <Typography
                                                variant="body1"
                                                key={`ticker-${id}`}
                                            >
                                                {holding.ticker}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" key={`box-${id}`}>
                                            {EditHoldingInputConfig.map(
                                                (input) => {
                                                    return (
                                                        <GetInputComponent
                                                            key={`input-${holding.id}-${input.id}`}
                                                            getInput={holding}
                                                            setInput={(
                                                                newValue
                                                            ) =>
                                                                setHoldingsState(
                                                                    updateObjectInArrayById(
                                                                        holdingsState,
                                                                        (obj) =>
                                                                            obj._id ===
                                                                            id,
                                                                        newValue
                                                                    )
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                updateHolding(
                                                                    id
                                                                )
                                                            }
                                                            input={input}
                                                            disabled={isLoading}
                                                        />
                                                    )
                                                }
                                            )}
                                        </Box>
                                        <IconButton
                                            onClick={() =>
                                                onDeleteHolding(holding._id)
                                            }
                                            sx={{
                                                position: 'absolute',
                                                top: 'calc(50% - 20px)',
                                                right: '0px',
                                            }}
                                        >
                                            <DeleteIcon disabled={isLoading} />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            )
                        })}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" type="submit" form="holdings">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditHoldingDialog
