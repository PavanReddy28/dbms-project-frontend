import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors"



function provideTheme(mode) {
    const theme = createMuiTheme({
        palette: {
            primary: purple,
            secondary: purple,
            type: mode
        }
    });

    return theme;
}

export default provideTheme;