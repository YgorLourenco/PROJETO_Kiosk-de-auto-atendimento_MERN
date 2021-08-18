import { Box, Card, CardActionArea, CardContent } from '@material-ui/core'
import React, { useContext } from 'react'
import { useStyles } from '../styles'
import Logo from '../components/Logo'
import { Typography } from '@material-ui/core'
import { CardMedia } from '@material-ui/core'
import { setPaymentType } from '../actions'
import { Store } from '../Store'

export default function SelectPaymentScreen(props) {
    const {dispatch} = useContext(Store)
    const styles = useStyles()
    const selectHandler = (paymentType) => {
        setPaymentType(dispatch, paymentType)
        if(paymentType === 'Pague aqui') {
            props.history.push('/payment')
        } else {
            props.history.push('/complete')
        }
    }
    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Logo large></Logo>
                <Typography
                    className={styles.center}
                    gutterBottom
                    variant='h3'
                    component='h3'
                >
                    Selecione o tipo de pagamento
                </Typography>
            </Box>
            <Box className={[styles.cards]}>
                <Card className={[styles.card, styles.space]}>
                    <CardActionArea onClick={() => selectHandler('Pague aqui')}>
                        <CardMedia
                            component='img'
                            alt='Pague aqui'
                            image='/images/payhere.png'
                            className={styles.media}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h6'
                                color='textPrimary'
                                component='p'
                            >
                                Pague aqui
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className={[styles.card, styles.space]}>
                    <CardActionArea onClick={() => selectHandler('Balcao')}>
                        <CardMedia
                            component='img'
                            alt='Balcao'
                            image='/images/atcounter.png'
                            className={styles.media}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h6'
                                color='textPrimary'
                                component='p'
                            >
                                Pague no Balcão
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    )
}
