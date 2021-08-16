import { Avatar, Button, CardActionArea, CircularProgress, Dialog, DialogTitle, ListItem, TextField } from '@material-ui/core'
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box, Grid, List } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useContext, useEffect, useState } from 'react'
import { addToOrder, clearOrder, listCategories, listProducts, removeFromOrder } from '../actions'
import Logo from '../components/Logo'
import { Store } from '../Store'
import { useStyles } from '../styles'

export default function OrderScreen(props) {
    const styles = useStyles()
    // State para os estados da lista de catergoria
    const [categoryName, setCategoryName] = useState('')
    // States dos botões de adicionar e retirar produto do carrinho
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

    const {state, dispatch} = useContext(Store)
    // Object Destrotion da lista de categorias
    const { categories, loading, error} = state.categoryList
    // Object Destrotion da lista de categorias
    const {products, 
        loading: loadingProducts,
        error: errorProducts,
    } = state.productList

    const {
        orderItems,
        itemsCount,
        totalPrice,
        taxPrice,
        orderType,
    } = state.order

    // useEffect vai ficar responsavel por listar as categorias
    useEffect(() => {
        if(!categories) { // Se não existir "categories", vai listas as categorias, se não, vai listar os produtos.
            listCategories(dispatch)
        } else {
            listProducts(dispatch, categoryName)
        }
    }, [dispatch, categoryName, categories])
    
    
    // Ação ativada após o click que vai fornecer os items da lista
    const categoryClickHandler = (name) => {
        setCategoryName(name)
        listProducts(dispatch, categoryName)
    }
    // Função para rever o pedido
    const previewOrderHandler = () => {
        props.history.push(`/review`)
    }

    return (
        <Box className={styles.root}>
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
            <Box className={styles.main}>
                <Grid container>
                    <Grid item md={2}>
                        <List>
                            {loading ? (
                                <CircularProgress />
                            ): error ? (
                                <Alert severity='error'>{error}</Alert>
                            ): (
                                <>
                                    
                                    <ListItem onClick={() => categoryClickHandler('')}  button>
                                        <Logo></Logo>
                                    </ListItem>
                                    {categories.map((category) => (
                                        <ListItem 
                                            button 
                                            key={category.name}
                                            onClick={() => categoryClickHandler(category.name)}
                                        >
                                            <Avatar alt={category.name} src={category.image} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                        </List>
                    </Grid>
                        <Grid item md={10}>
                            {/* Lista de Pratos */}
                            <Typography
                                gutterBottom
                                className={styles.title}
                                variant='h2'
                                component='h2'
                            >
                                {categoryName || 'Menu Principal'}
                            </Typography>
                            <Grid container spacing={1}>
                                {loadingProducts ? (
                                    <CircularProgress />
                                ) : errorProducts ? (
                                    <Alert severity="error">{errorProducts}</Alert>
                                ) : (
                                    products.map((product) => (<Grid item md={6}> 
                                        <Card 
                                            className={styles.card}
                                            onClick={() => productClickHandler(product)}
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt={product.name}
                                                    image={product.image}
                                                    className={styles.media}
                                                />
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant='body2'
                                                    color='textPrimary'
                                                    component='p'
                                                >
                                                    {product.name}
                                                </Typography>
                                                    <Box className={styles.cardFooter}>
                                                        <Typography
                                                            gutterBottom
                                                            variant='body2'
                                                            color='textSecondary'
                                                            component='p'
                                                        >
                                                            {product.calorie} Cal
                                                        </Typography>
                                                        <Typography
                                                            variant='body2'
                                                            color='textPrimary'
                                                            component='p'
                                                        >
                                                            R${product.price}
                                                        </Typography>
                                                    </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    ))
                                )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box>
                    <Box className={[styles.bordered, styles.space]}>
                        Meu Pedido = {orderType} | Taxa: R${taxPrice} | Total: R${totalPrice} | Items: {itemsCount}
                    </Box>
                    <Box className={[styles.row, styles.around]}>
                        <Button
                            onClick={() => {
                                clearOrder(dispatch)
                                props.history.push(`/`)
                            }}
                            variant="contained"
                            color="primary"
                            className={styles.largeButton}
                        >
                            Cancelar Pedido
                        </Button>
                        <Button
                            onClick={previewOrderHandler}
                            variant="contained"
                            color="primary"
                            disabled={orderItems.length === 0}
                            className={styles.largeButton}
                        >
                            Enviar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
