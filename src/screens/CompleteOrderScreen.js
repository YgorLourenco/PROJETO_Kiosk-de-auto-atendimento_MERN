import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect } from 'react'
import { createOrder } from '../actions'
import {Store} from '../Store'
import Logo from '../components/Logo'
import { useStyles } from '../styles'

export default function CompleteOrderScreen(props) {
    const styles = useStyles()
    const {state, dispatch} = useContext(Store)
    const { order } = state
    const { loading, error, newOrder } = state.orderCreate

    // Vai ativar o useEffect quando os itens do pedido serem maior que 0
    useEffect(() => {
        if(order.orderItems.length > 0) {
            createOrder(dispatch, order)
        }
    }, [dispatch, order])

    return (
        <Box className={[styles.root, styles.navy]}>
            <Box className={[styles.main, styles.center]}>
                <Box>
                    <Logo large></Logo>
                    {loading ? (
                        <CircularProgress></CircularProgress>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <>
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant='h3'
                                component='h3'
                            >
                                Seu pedido esta pronto!
                            </Typography>
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant='h1'
                                component='h1'
                            >
                                Obrigado!
                            </Typography>
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant='h3'
                                component='h3'
                            >
                                Seu pedido e o número {newOrder.number}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
            <Box className={[styles.center, styles.space]}>
                    <Button
                        onClick={() => props.history.push('/')}
                        variant='contained'
                        color='primary'
                        className={styles.largeButton}
                    >
                        Pedir de novo
                    </Button>
            </Box>
        </Box>
    )
}
