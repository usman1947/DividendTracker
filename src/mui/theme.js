import { createTheme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';

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
            main: '#9932CC',
            shades: getShades("#9932CC")
        },
        colors: {
            white: '#FFFFFF'
        }
    },
});

export const stylesTheme = createTheme({
    components: {
        MuiDataGrid : {
            styleOverrides:{
                root: {
                    border: 'none',
                    outline: 'none',
                    backgroundColor: colorsTheme.palette.colors.white
                },
                cell: {
                    borderBottom: `1px solid ${colorsTheme.palette.primary.shades['12p']}`,
                    "&:focus": {
                        outline: 'none',
                    },
                },
                columnHeader: {
                    fontSize: '16px',
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
                        height: '64px'
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
        }
    }
});
  