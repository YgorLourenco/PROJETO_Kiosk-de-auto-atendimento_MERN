import { List, ListItem, Typography } from '@material-ui/core'
import { Box, CircularProgress, Grid, Paper } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useContext } from 'react'
import {useStyles} from '../styles'
import { Store } from '../Store'
import { useEffect } from 'react'
import { listQueue } from '../actions'


export default function QueueScreen() {
    const styles = useStyles()
    const {state, dispatch} = useContext(Store)
    const {queue, loading, error} = state.queueList

    useEffect(() => {
        listQueue(dispatch)
    }, [dispatch])
    return (
        <Box className={[styles.root]}>
            <Box className={[styles.main]}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity='error'>{error}</Alert>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Paper>
                                <Typography variant='h2'>
                                    Em progresso
                                </Typography>
                                <List>
                                    {queue.inProgressOrders.map((order) => (
                                        <ListItem key={order.number}>
                                            <Typography variant='h2'>{order.number}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item md={6}>
                            <Paper>
                                    <Typography variant='h2'> 
                                        Servindo agora
                                    </Typography>
                                    <List>
                                        {queue.servingOrders.map((order) => (
                                            <ListItem key={order.number}>
                                                <Typography variant='h2'>{order.number}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}
