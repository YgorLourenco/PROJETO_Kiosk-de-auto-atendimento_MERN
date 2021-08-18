import { CardContent } from '@material-ui/core'
import { Box, Button, Card, CardActionArea, Dialog, DialogTitle, Grid, TextField, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useContext, useState } from 'react'
import { addToOrder, removeFromOrder } from '../actions'
import Logo from '../components/Logo'
import { Store } from '../Store'
import { useStyles } from '../styles'

export default function ReviewScreen(props) {
    const {state, dispatch} = useContext(Store)
    const {
        orderItems,
        itemsCount,
        totalPrice,
        taxPrice,
        orderType,
    } = state.order
    const [quantity, setQuantity] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [product, setProduct] = useState({})
    // Vai fechar o hook isOpen
    const closeHandler = () => {
        setIsOpen(false)
    }
    // Vai abrir o produto
    const productClickHandler = (p) => {
        setProduct(p)
        setIsOpen(true)
    }
    // Ação de adicionar pedido
    const addToOrderHandler = () => {
        addToOrder(dispatch, {...product, quantity})
        setIsOpen(false)
    }
    // Ação de cancelar ou remover o pedido
    const cancelOrRemoveFromOrder = () => {
        removeFromOrder(dispatch, product)
        setIsOpen(false)
    }
    //
    const procedToCheckoutHandler = () => {
        props.history.push(`/select-payment`)
    }
    const styles = useStyles()
    return (
        <div>
            <Box className={[styles.root]}>
                <Box className={[styles.main, styles.navy ,styles.center]}>
                        <Dialog
                            maxWidth="sm"
                            fullWidth={true}
                            open={isOpen}
                            onClose={closeHandler}
                        >
                        <DialogTitle className={styles.center}>
                            Adicionar {product.name}
                        </DialogTitle>
                        <Box className={[styles.row, styles.center]}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={quantity === 1}
                                onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
                            >
                                <RemoveIcon />
                            </Button>
                            <TextField
                                inputProps={{ className: styles.largeInput}}
                                InputProps={{
                                    bar: true,
                                    inputProps: {
                                        className: styles.largeInput,
                                    },
                                }}
                                className={styles.largeNumber}
                                type="number"
                                variant="filled"
                                min={1}
                                value={quantity}
                            />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => setQuantity(quantity + 1)}
                                >
                                    <AddIcon />
                                </Button>
                        </Box>
                        <Box className={[styles.row, styles.around]}>
                            <Button
                                onClick={cancelOrRemoveFromOrder}
                                variant="contained"
                                color="primary"
                                size="large"
                                className={styles.largeButton}
                            >
                                {orderItems.find((x) => x.name === product.name)
                                ? 'Remover pedido'
                                : 'Cancelar'}
                            </Button>
                            <Button
                                onClick={addToOrderHandler}
                                variant="contained"
                                color="primary"
                                size="large"
                                className={styles.largeButton}
                            >
                                Adicionar pedido
                            </Button>
                        </Box>
                    </Dialog>
                    <Box className={[styles.center, styles.column]}>
                        <Logo large></Logo>
                        <Typography
                            gutterBottom
                            className={styles.title}
                            variant='h3'
                            component='h3'
                        >
                            Revise o seu {orderType}
                        </Typography>
                    </Box>
                    <Grid container>
                        {orderItems.map((orderItem) => (
                            <Grid item md={12} key={orderItem.name}>
                                <Card
                                    className={styles.card}
                                    onClick={() => productClickHandler(orderItem)}
                                >
                                    <CardActionArea>
                                        <CardContent>
                                            <Box className={[styles.row, styles.between]}>
                                                <Typography
                                                    gutterBottom
                                                    variant='body2'
                                                    color='textPrimary'
                                                    component='p'
                                                >
                                                    {orderItem.name}
                                                </Typography>
                                                <Button variant='contained'>Editar</Button>
                                            </Box>
                                            <Box className={[styles.row, styles.between]}>
                                                <Typography
                                                    variant='body2'
                                                    color='textSecondary'
                                                    component='p'
                                                >
                                                    {orderItem.calorie} Cal
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    color='textPrimary'
                                                    component='p'
                                                >
                                                    {orderItem.quantity} x R${orderItem.price}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box>
                    <Box>
                        <Box className={[styles.bordered, styles.space]}>
                            Meu pedido - {orderType === 'levar' ? 'Levar' : 'Comer aqui'} | Taxas: R${taxPrice} | Total: R${totalPrice} | Items: {itemsCount}
                        </Box>
                        <Box className={[styles.row, styles.around]}>
                            <Button
                                onClick={() => {
                                    props.history.push(`/order`)
                                }}
                                variant='contained'
                                color='primary'
                                className={styles.largeButton}
                            >
                                Voltar
                            </Button>
                            <Button
                                onClick={procedToCheckoutHandler}
                                variant='contained'
                                color='secondary'
                                disabled={orderItems.lenght === 0}
                                className={styles.largeButton}
                            >
                                Prosseguir com o pagamento
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
