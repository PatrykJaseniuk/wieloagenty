import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import { Parametry, SilnikElektryczny, SilnikSpalinowy } from '../../Data/data';

export default function Review(props: { data: Parametry }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Podsumowanie
            </Typography>

            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Silnik
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            typ:
                            <Typography>
                                {props.data.silnik.nazwa}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            moc:
                            <Typography>
                                {props.data.silnik.moc.wartosc}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            moment siły:
                            <Typography>
                                {props.data.silnik.momentSily.wartosc}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        {props.data.silnik instanceof SilnikElektryczny ?
                            <React.Fragment>
                                <Grid marginTop={4} item xs={4}>
                                    napięcie:
                                    <Typography>
                                        {((props.data.silnik)).napiecie.wartosc}
                                    </Typography>
                                </Grid>
                                <Grid marginTop={4} item xs={4}>
                                    Pojemność Baterii:
                                    <Typography>
                                        {((props.data.silnik)).pojemnoscBaterii.wartosc}
                                    </Typography>
                                </Grid>
                            </React.Fragment>

                            :
                            <React.Fragment>
                                <Grid marginTop={4} item xs={4}>
                                    pojemność:
                                    <Typography>
                                        {((props.data.silnik) as SilnikSpalinowy).pojemnosc.wartosc}
                                    </Typography>
                                </Grid>
                                <Grid marginTop={4} item xs={4}>
                                    Rodzaj paliwa:
                                    <Typography>
                                        {((props.data.silnik) as SilnikSpalinowy).rodzajPaliwa}
                                    </Typography>
                                </Grid>
                            </React.Fragment>

                        }
                    </Grid>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ minWidth: 275, marginTop: 1 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Podwozie
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            Przeswit:
                            <Typography>
                                {props.data.podwozie.przeswit.wartosc}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            Rozmiar kół:
                            <Typography>
                                {props.data.podwozie.rozmiarKol.wartosc}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            skretna tylna os:
                            <Typography>
                                {props.data.podwozie.skretnaTylnaOs ? 'tak' : 'nie'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            Napęd na przednia oś:
                            <Typography>
                                {props.data.podwozie.napedPrzod ? 'tak' : 'nie'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            Napęd na tylną oś:
                            <Typography>
                                {props.data.podwozie.napedTyl ? 'tak' : 'nie'}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ minWidth: 275, marginTop: 1 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Nadwozie
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            Kolor:
                            <Typography>
                                {props.data.nadwozie.kolor.wartosc}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            Czy ma klimatyzacje:
                            <Typography>
                                {props.data.nadwozie.czyMaKimatyzacje.wartosc ? 'tak' : 'nie'}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            Czy ma radio:
                            <Typography>
                                {props.data.nadwozie.czyMaradio.wartosc ? 'tak' : 'nie'}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ minWidth: 275, marginTop: 1 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        cena[zł]
                    </Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <Typography>
                                {props.data.cena.wartosc}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}