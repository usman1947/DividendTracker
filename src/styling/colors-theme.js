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
            main: '#646cff',
            shades: getShades('#646cff'),
        },
        secondary: {
            main: '#252529',
            shades: getShades('#252529'),
        },
        info: {
            main: '#EBEBF599',
            shades: getShades('#EBEBF599'),
        },
        background: {
            main: '#1e1e20',
        },
        text: {
            main: '#FFFFF5DB',
            shades: getShades('#FFFFF5DB'),
            secondary: '#FFFFFF',
        },
        colors: {
            white: '#FFFFFF',
            black: 'black',
            green: 'green',
            red: 'red',
        },
    },
})
