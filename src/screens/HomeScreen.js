import {Box, Card, CardActionArea, Typography } from '@material-ui/core'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import {useStyles} from '../styles'
import React from 'react'
import Logo from '../components/Logo'

// Pagina principal 
export default function HomeScreen(props) {
    // Função pra pegar os useStyles do arquivo styles.js
    const styles = useStyles()
    return (
        <div>
            <Card>
                <CardActionArea onClick={() => props.history.push('/choose')}>
                    <Box className={[styles.root, styles.red]}>
                        <Box className={[styles.main, styles.center]}>
                            <Typography component='h6' variant='h6'>
                                Rapido & Facil!
                            </Typography>
                            <Typography component='h1' variant='h1'>
                                Pedir <br /> & pagar <br /> aqui
                            </Typography>
                            <TouchAppIcon fontSize='large'></TouchAppIcon>
                        </Box>
                        <Box className={[styles.center, styles.green]}>
                            <Logo large></Logo>
                            <Typography component='h5' variant='h5'>
                                Toque para começar
                            </Typography>
                        </Box>
                    </Box>
                </CardActionArea>
            </Card>
        </div>
    )
}
