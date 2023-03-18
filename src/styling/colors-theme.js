import { createTheme } from '@mui/material/styles'
import { alpha } from '@mui/material'

function getShades(hex) {
    return {
        '8p': alpha(hex, 0.08),
        '4p': alpha(hex, 0.04),
        '12p': alpha(hex, 0.12),
    }
}

export const colorsTheme = createTheme({
    palette: {
        primary: {
            main: '#333333',
            shades: getShades('#333333'),
        },
        secondary: {
            main: '#757575',
            shades: getShades('#757575'),
        },
        info: {
            main: '#4A6163',
            shades: getShades('#4A6163'),
        },
        colors: {
            white: '#FFFFFF',
            black: 'black',
            green: 'green',
            red: 'red',
        },
    },
})
