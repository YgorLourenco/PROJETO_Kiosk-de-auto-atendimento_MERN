import { Box, CircularProgress, Table, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useStyles } from '../styles'
import React, { useContext, useEffect } from 'react'
import { Alert } from '@material-ui/lab'
import { Paper } from '@material-ui/core'
import { TableCell } from '@material-ui/core'
import { TableBody } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Store } from '../Store'
import { listOrders } from '../actions'
import axios from 'axios'

export default function AdminScreen() {
    const styles = useStyles()
    const { state, dispatch} = useContext(Store)

    const {orders, loading, error} = state.orderList

    useEffect(() => {
        listOrders(dispatch)
    }, [dispatch])

    const setOrderStateHandler = async (order, action) => {
        try {
            await axios.put('/api/orders/' + order._id, {
                action: action,
            })
            listOrders(dispatch)
        } catch (error) {
             alert(error.message)
        }
    }

    return (
        <Box className={[styles.root]}>
            <Box className={[styles.main]}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity='error'>{error}</Alert>
                ): (
                    <TableContainer component={Paper}>
                        <Table aria-label='Orders'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Número do Pedido</TableCell>
                                    <TableCell align='right'>Preço&nbsp;(R$)</TableCell>
                                    <TableCell align='right'>Quantidade</TableCell>
                                    <TableCell align='right'>Items</TableCell>
                                    <TableCell align='right'>Tipo</TableCell>
                                    <TableCell align='right'>Pagamentos</TableCell>
                                    <TableCell align='right'>Estado</TableCell>
                                    <TableCell align='right'>Ação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.name}>
                                        <TableCell component='th' scope='row'>
                                            {order.number}
                                        </TableCell>
                                        <TableCell align='right'>{order.totalPrice}</TableCell>
                                        <TableCell align='right'>
                                            {order.orderItems.length}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {order.orderItems.map((item) => (
                                                <Box>
                                                    {item.name} x {item.quantity}
                                                </Box>
                                            ))}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {order.orderType}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {order.paymentType}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {order.inProgress
                                                ? 'Em progresso'
                                                : order.isReady
                                                ? 'Pronto'
                                                : order.isDelivered
                                                ? 'Enviar'
                                                : 'Desconhecido'
                                            }
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                variant='contained'
                                                onClick={() => setOrderStateHandler(order, 'ready')}
                                                color='secondary'
                                            >
                                                Pronto
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant='contained'
                                                onClick={() => setOrderStateHandler(order, 'cancel')}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                variant='contained'
                                                onClick={() => setOrderStateHandler(order, 'deliver')}
                                            >
                                                Enviar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    )
}
