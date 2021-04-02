import { createMuiTheme } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors"



function provideTheme(mode) {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: mode==="light"?"#1976d2":"#004ba0"
            },
            type: mode
        }
    });

    return theme;
}

export default provideTheme;