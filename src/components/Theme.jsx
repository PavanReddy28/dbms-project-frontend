import { createMuiTheme } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors"



function provideTheme(mode) {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: mode==="light"?"#38006b":"#d05ce3"
            },
            type: mode
        }
    });

    return theme;
}

export default provideTheme;