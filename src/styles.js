import { makeStyles } from "@material-ui/styles";

// Estilos de todos os componentes, para serem utilizados ao decorrer do projeto
export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    navy: {
        backgroundColor: '#003080',
    },
    red: {
        backgroundColor: '#ff2040',
        color: '#ffffff',
    },
    main: {
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    green: {
        backgroundColor: '#00b020',
        color: '#ffffff',
    },
    largeLogo: {
        height: 100,
    },
    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {margin: 10},
    space: {
        padding: 10,
    },
    media: {width: 200}
}))