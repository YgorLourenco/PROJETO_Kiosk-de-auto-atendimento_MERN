import { CardMedia, Fade } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import { CardActionArea } from '@material-ui/core'
import { Box } from '@material-ui/core'
import React, { useContext } from 'react'
import { setOrderType } from '../actions'
import Logo from '../components/Logo'
import { Store } from '../Store'
import { useStyles } from '../styles'

export default function ChooseScreen(props) {
    // Função pra pegar os useStyles do arquivo styles.js
    const styles = useStyles()
    // 
    const {dispatch} = useContext(Store)

    // Handler que vai redicionar para a página de escolher o pedido, após clicar nos cards
    const chooseHandler = (orderType) => {
        setOrderType(dispatch, orderType)
        props.history.push('/order')
    }

    return (
        <Fade in={true}>
            <Box className={[styles.root, styles.navy]}>
                <Box className={[styles.main, styles.center]}> 
                    <Logo large></Logo>
                    <Typography variant='h3' component='h3' className={styles.center} gutterBottom>
                        Onde você vai comer hoje?
                    </Typography>
                    <Box className={styles.cards}>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea onClick={() => chooseHandler('Comer aqui')}>
                                <CardMedia
                                    component='img'
                                    alt='Comer aqui'
                                    image='/images/eatin.png'
                                    className={styles.media}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h4'
                                        color='textPrimary'
                                        component='p'
                                    >
                                        Comer aqui
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card className={[styles.card, styles.space]}>
                            <CardActionArea onClick={() => chooseHandler('Levar')}>
                                <CardMedia
                                    component='img'
                                    alt='Levar'
                                    image='/images/takeout.png'
                                    className={styles.media}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h4'
                                        color='textPrimary'
                                        component='p'
                                    >
                                        Levar
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Fade>
    )
}
