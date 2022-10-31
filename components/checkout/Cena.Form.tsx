import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Parametry, ParametryOgolne } from '../../Data/data';
import { Input, MenuItem, Slider, SpeedDialIconClassKey } from '@mui/material';

export function CenaForm(props: { parametryOgolne: ParametryOgolne, setData: React.Dispatch<React.SetStateAction<ParametryOgolne>> }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Cena
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Slider
                        max={props.parametryOgolne.cena.max}
                        min={props.parametryOgolne.cena.min}
                        value={props.parametryOgolne.cena.wartosc}
                        onChange={(_, value) => {
                            props.parametryOgolne.cena.wartosc = value as number
                            props.setData({ ...props.parametryOgolne }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }
                        }
                        valueLabelDisplay="auto"
                    />
                    <Input
                        value={props.parametryOgolne.cena.wartosc}
                        size="small"
                        onChange={(event) => {
                            props.parametryOgolne.cena.wartosc = Number.parseInt(event.target.value)
                            props.setData({ ...props.parametryOgolne }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }}
                        inputProps={{
                            step: 10,
                            min: props.parametryOgolne.cena.min,
                            max: props.parametryOgolne.cena.max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}