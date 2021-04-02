import { createMuiTheme } from "@material-ui/core/styles";



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