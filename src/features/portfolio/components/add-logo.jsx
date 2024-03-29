import React, { useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import { GetInputComponent } from 'components/input'
import { InputTypesEnum } from 'util/constants'
import { useUpdateHoldingMutation, useGetAllHoldingsQuery } from 'services/api'
import { removeImageBackground } from 'util/utility'

const AddLogoInputConfig = [
    {
        id: 'logo',
        required: true,
        label: 'Link for company logo',
        type: InputTypesEnum._TEXT,
        sx: {
            width: '100%',
        },
    },
]

const AddLogo = (props) => {
    const { logo, id, width } = props
    const [open, setOpen] = useState(false)
    const [inputData, setInputData] = useState({})
    const [updateHoldingCall] = useUpdateHoldingMutation()
    const holdingsApi = useGetAllHoldingsQuery()
    const [imageSrc, setImageSrc] = useState(logo)

    useEffect(() => {
        const getImage = async () => {
            const result = await removeImageBackground(logo)
            setImageSrc(result)
        }
        getImage()
    }, [logo])

    function clearAndClose() {
        setOpen(false)
        setInputData({})
    }

    async function updateLogo(e) {
        e.preventDefault()
        let holding = holdingsApi.data.find((h) => h._id === id)
        holding = {
            ...holding,
            logo: inputData.logo,
        }
        updateHoldingCall({ id, body: holding, showLoading: true })
        setOpen(false)
    }

    return (
        <>
            <IconButton disableRipple onClick={() => setOpen(true)}>
                {logo ? (
                    <img
                        alt="logo"
                        src={imageSrc}
                        style={{
                            objectFit: 'contain',
                            width: width,
                            height: '52px',
                            mixBlendMode: 'multiply',
                        }}
                    />
                ) : (
                    <UploadIcon />
                )}
            </IconButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                scroll="paper"
                sx={{ height: '50vh' }}
                PaperProps={{
                    sx: { height: { xs: '70%', md: '100%' }, width: '400px' },
                }}
            >
                <DialogTitle>Add Link For Company Logo</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1">
                        Please enter the link for company logo, you can update
                        this link later
                    </Typography>
                    <form
                        onSubmit={updateLogo}
                        id="logo-link"
                        style={{ marginTop: '16px' }}
                    >
                        {AddLogoInputConfig.map((input) => {
                            return (
                                <GetInputComponent
                                    key={`input-${input.id}`}
                                    getInput={inputData}
                                    setInput={setInputData}
                                    input={input}
                                />
                            )
                        })}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearAndClose}>Cancel</Button>
                    <Button variant="outlined" type="submit" form="logo-link">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddLogo
