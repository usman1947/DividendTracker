import { createTheme } from '@mui/material/styles';
import { alpha } from "@mui/material";

function getShades(hex){
    return {
        "8p": alpha(hex, 0.08),
        "4p": alpha(hex, 0.04),
        "12p": alpha(hex, 0.12)
    }
}

export const colorsTheme = createTheme({
    palette: {
        primary: {
            main: "#333333",
            shades: getShades("#333333")
        },
        secondary: {
            main: '#757575',
            shades: getShades("#757575")
        },
        info: {
            main: '#4A6163',
            shades: getShades("#4A6163")
        },
        colors: {
            white: '#FFFFFF',
            black: 'black',
            green: 'green',
            red: 'red',
        }
    }
});

export const stylesTheme = createTheme({
    components: {
        MuiDataGrid : {
            styleOverrides:{
                root: {
                    border: 'none',
                    outline: 'none',
                    padding: '0 16px 0 16px',
                    backgroundColor: colorsTheme.palette.colors.white
                },
                cell: {
                    borderBottom: `1px solid ${colorsTheme.palette.primary.shades['12p']}`,
                    "&:focus": {
                        outline: 'none',
                    },
                },
                columnHeader: {
                    fontSize: '12px',
                    color: colorsTheme.palette.info.main,
                    "&:focus": {
                        outline: 'none',
                    },
                },
                columnSeparator: {
                    display: 'none'
                },
                footerContainer: {
                    border: 'none'
                },
            }
        },
        MuiTypography : {
            styleOverrides:{
                root: {
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif;'
                }
            },
            variants: [
                {
                    props: { type: 'bold' },
                    style: {
                        fontWeight: 'bold'
                    },
                },
                {
                    props: { variant: 'subtitle3' },
                    style: {
                        fontSize: '12px'
                    }
                }
            ],
        },
        MuiButton: {
            styleOverrides:{
                root: {
                    height: 'fit-content'
                }
            }
        },
        MuiAppBar: {
            styleOverrides:{
                root: {
                    height: '64px',
                    zIndex: '20'
                }
            }
        },
        MuiToolbar: {
            variants: [
                {
                    props: { variant: 'app-bar' },
                    style: {
                        height: '64px',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between'
                    },
                },
            ],
        },
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'content' },
                    style: {
                        height: '100%',
                        flex: 1,
                        padding: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: colorsTheme.palette.primary.shades['4p'],
                        borderRadius: 0
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
                    },
                },
            ],
        },
        MuiInput: {
            variants: [
                {
                    props: { type: 'search-stocks' },
                    style: {
                        "&:before": {
                            borderBottom: 'none !important'
                        },
                        "&:after": {
                            borderBottom: 'none !important'
                        },
                        paddingLeft: '8px'
                    },
                },
            ],
        },
        MuiSlider: {
            variants: [
                {
                    props: { variant: '52-week-range' },
                    style:  {
                        '& .MuiSlider-markLabel': {
                            color: colorsTheme.palette.colors.black,
                        },
                        '& .MuiSlider-rail': {
                            top: '70%'
                        },
                        '& .MuiSlider-track': {
                            top: '70%'
                        },
                        '& .MuiSlider-thumb': {
                            top: '70%'
                        },
                        '& .MuiSlider-mark': {
                            display: 'none'
                        }
                    }
                },
            ]
        }
    }
});
  