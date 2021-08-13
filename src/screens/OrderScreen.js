import { Avatar, CircularProgress, ListItem } from '@material-ui/core'
import { Box, Grid, List } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect } from 'react'
import { listCategories } from '../actions'
import Logo from '../components/Logo'
import { Store } from '../Store'
import { useStyles } from '../styles'

export default function OrderScreen() {
    const styles = useStyles()
    const {state, dispatch} = useContext(Store)
    const { categories, loading, error} = state.categoryList
    // useEffect vai ficar responsavel por listar as categorias
    useEffect(() => {
        listCategories(dispatch)
    }, [dispatch])
    return (
        <Box className={styles.root}>
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
                                    <ListItem>
                                        <Logo></Logo>
                                    </ListItem>
                                    {categories.map((category) => (
                                        <ListItem key={category.name}>
                                            <Avatar alt={category.name} src={category.image} />
                                        </ListItem>
                                    ))}
                                </>
                            )}
                            {/* <ListItem>
                                <Avatar src='/images/burgers.jpg'></Avatar>
                            </ListItem> */}
                        </List>
                        <Grid item md={10}>
                            Lista de Pratos
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
