import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import { Parametry, ParametryOgolne, SilnikElektryczny, SilnikSpalinowy } from '../../Data/data';



export default function Review2(props: { parametryOgolne: ParametryOgolne }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Podsumowanie
            </Typography>

            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                    {
                        Object.keys(props.parametryOgolne).map(
                            (key) => {
                                return (<WartoscPriorytet key={key} parametr={(props.parametryOgolne as any)[key]} nazwa={key} />) //napewno mozna to zapisac/zrobić czytelniej/ładniej
                            }
                        )
                    }
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

function WartoscPriorytet(props: { parametr: { wartosc: string, priorytet: number }, nazwa: string }) {
    return (
        <Grid marginTop={3} container>
            <Typography variant='h6'>{props.nazwa}</Typography>
            <Grid container spacing={2} >

                <Grid item xs={6}>
                    Wartość:
                    <Typography>
                        {props.parametr.wartosc}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    Priorytet:
                    <Typography>{props.parametr.priorytet}</Typography>
                </Grid>
            </Grid>
        </Grid>)
}