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
            main: "#810CA8",
            shades: getShades("#810CA8")
        },
        secondary: {
            main: '#2D033B',
            shades: getShades("#2D033B")
        },
    },
});

export const stylesTheme = createTheme({
    components: {
        MuiDataGrid : {
            styleOverrides:{
                root: {
                    border: 'none',
                    outline: 'none',
                },
                cell: {
                    borderBottom: `1px solid ${colorsTheme.palette.secondary.shades['12p']}`,
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
        }
    }
});
  