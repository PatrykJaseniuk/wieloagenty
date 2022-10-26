import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Parametry } from '../../Data/data';
import { Input, MenuItem, Slider, SpeedDialIconClassKey } from '@mui/material';

export function CenaForm(props: { data: Parametry, setData: React.Dispatch<React.SetStateAction<Parametry>> }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Cena
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Slider
                        max={props.data.cena.max}
                        min={props.data.cena.min}
                        value={props.data.cena.wartosc}
                        onChange={(_, value) => {
                            props.data.cena.wartosc = value as number
                            props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }
                        }
                        valueLabelDisplay="auto"
                    />
                    <Input
                        value={props.data.cena.wartosc}
                        size="small"
                        onChange={(event) => {
                            props.data.cena.wartosc = Number.parseInt(event.target.value)
                            props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }}
                        inputProps={{
                            step: 10,
                            min: props.data.cena.min,
                            max: props.data.cena.max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}