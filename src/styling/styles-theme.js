import { createTheme } from '@mui/material/styles'
import { colorsTheme } from './colors-theme'

export const stylesTheme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                    outline: 'none',
                    padding: '0 16px 0 16px',
                    backgroundColor: colorsTheme.palette.colors.white,
                },
                cell: {
                    borderBottom: `1px solid ${colorsTheme.palette.primary.shades['12p']}`,
                    '&:focus': {
                        outline: 'none',
                    },
                },
                columnHeader: {
                    fontSize: '12px',
                    color: colorsTheme.palette.info.main,
                    '&:focus': {
                        outline: 'none',
                    },
                },
                columnSeparator: {
                    display: 'none',
                },
                footerContainer: {
                    border: 'none',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "'Quicksand', sans-serif",
                    color: colorsTheme.palette.text.main,
                },
            },
            variants: [
                {
                    props: { type: 'bold' },
                    style: {
                        fontWeight: 'bold',
                    },
                },
                {
                    props: { variant: 'subtitle3' },
                    style: {
                        fontSize: '12px',
                    },
                },
            ],
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 'fit-content',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    height: '64px',
                    zIndex: '20',
                    backgroundColor: colorsTheme.palette.background.main,
                },
            },
        },
        MuiToolbar: {
            variants: [
                {
                    props: { variant: 'app-bar' },
                    style: {
                        height: '64px',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        backgroundColor: colorsTheme.palette.background.main,
                        color: colorsTheme.palette.text.main,
                    },
                },
            ],
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: colorsTheme.palette.secondary.main,
                },
            },
            variants: [
                {
                    props: { variant: 'content' },
                    style: {
                        height: '100%',
                        overflow: 'auto',
                        flex: 1,
                        padding: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: colorsTheme.palette.background.main,
                        borderRadius: 0,
                    },
                },
            ],
        },
        MuiAutocomplete: {
            variants: [
                {
                    props: { variant: 'search-stocks' },
                    style: {
                        backgroundColor: colorsTheme.palette.colors.white,
                        borderRadius: '4px',
                        [colorsTheme.breakpoints.down('sm')]: {
                            width: '100%',
                        },
                    },
                },
            ],
        },
        MuiInput: {
            variants: [
                {
                    props: { type: 'search-stocks' },
                    style: {
                        '&:before': {
                            borderBottom: 'none !important',
                        },
                        '&:after': {
                            borderBottom: 'none !important',
                        },
                        paddingLeft: '8px',
                    },
                },
            ],
        },
        MuiSlider: {
            variants: [
                {
                    props: { variant: '52-week-range' },
                    style: {
                        '& .MuiSlider-markLabel': {
                            color: colorsTheme.palette.colors.black,
                        },
                        '& .MuiSlider-rail': {
                            top: '70%',
                        },
                        '& .MuiSlider-track': {
                            top: '70%',
                        },
                        '& .MuiSlider-thumb': {
                            top: '70%',
                        },
                        '& .MuiSlider-mark': {
                            display: 'none',
                        },
                    },
                },
            ],
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    '& .MuiDrawer-paper': {
                        backgroundColor: colorsTheme.palette.background.main,
                        color: colorsTheme.palette.text.main,
                    },
                },
            },
        },
    },
})
