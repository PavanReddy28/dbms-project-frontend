import { createMuiTheme } from "@material-ui/core/styles";


function provideTheme(mode) {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: mode==="light"?"#38006b":"#d05ce3"
            },
            secondary: {
                main: '#ff5252',
              },
            type: mode,
            background: {
                default: mode==="light"? "#ffffff": "#222222",
                paper: mode==="dark"? "#303030": "#ffffff"
            },
        },
           
    });

    return theme;
}

export default provideTheme;