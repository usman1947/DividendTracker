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
            main: "#FF4C29",
            shades: getShades("#FF4C29")
        },
        secondary: {
            main: '#082032',
            shades: getShades("#082032")
        },
    },
});

export const stylesTheme = createTheme({
    components: {
       
    }
});
  