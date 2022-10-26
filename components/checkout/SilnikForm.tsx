import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Parametry, SilnikElektryczny, SilnikSpalinowy } from '../../Data/data';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import FormControl from '@mui/material/FormControl/FormControl';
import Box from '@mui/material/Box/Box';
import Slider from '@mui/material/Slider/Slider';


export function SilnikForm(props: { data: Parametry, setData: React.Dispatch<React.SetStateAction<Parametry>> }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Silnik
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Typ silnika</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={props.data.silnik.nazwa}
                            onChange={(event) => {
                                event.target.value == 'elektryczny' ?
                                    props.data.silnik = new SilnikElektryczny(100, 100, 100, 100)
                                    :
                                    props.data.silnik = new SilnikSpalinowy(1000, 'benzyna', 100, 100)
                                props.setData({ ...props.data });
                            }}
                            label="Age"
                        >
                            <MenuItem value={'elektryczny'}>elektryczny</MenuItem>
                            <MenuItem value={'spalinowy'}>spalinowy</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>moc [Kw]:</Typography>
                    <Slider
                        max={props.data.silnik.moc.max}
                        min={props.data.silnik.moc.min}
                        getAriaLabel={() => 'Temperature range'}
                        value={props.data.silnik.moc.wartosc}
                        onChange={(_, value) => {
                            props.data.silnik.moc.wartosc = value as number
                            props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }

                        }
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>moment sily [Nm]:</Typography>
                    <Slider
                        max={props.data.silnik.momentSily.max}
                        min={props.data.silnik.momentSily.min}
                        getAriaLabel={() => 'Temperature range'}
                        value={props.data.silnik.momentSily.wartosc}
                        onChange={(_, value) => {
                            props.data.silnik.momentSily.wartosc = value as number
                            props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }

                        }
                        valueLabelDisplay="auto"
                    />
                </Grid>
                {props.data.silnik instanceof SilnikElektryczny ?
                    <React.Fragment>
                        <Grid item xs={12} md={6}>
                            <Typography>napiecie [v]:</Typography>
                            <Slider
                                max={props.data.silnik.napiecie.max}
                                min={props.data.silnik.napiecie.min}
                                value={props.data.silnik.napiecie.wartosc}
                                onChange={(_, value) => {
                                    (props.data.silnik as SilnikElektryczny).napiecie.wartosc = value as number
                                    props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                                }

                                }
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography>Pojemność Baterii [Kwh]:</Typography>
                            <Slider
                                max={props.data.silnik.pojemnoscBaterii.max}
                                min={props.data.silnik.pojemnoscBaterii.min}
                                value={props.data.silnik.pojemnoscBaterii.wartosc}
                                onChange={(_, value) => {
                                    (props.data.silnik as SilnikElektryczny).pojemnoscBaterii.wartosc = value as number
                                    props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                                }

                                }
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                    </React.Fragment>
                    : props.data.silnik instanceof SilnikSpalinowy ?
                        <React.Fragment>
                            <Grid item xs={12} md={6}>
                                <Typography>Pojemność silnika:</Typography>
                                <Slider
                                    max={props.data.silnik.pojemnosc.max}
                                    min={props.data.silnik.pojemnosc.min}
                                    getAriaLabel={() => 'Temperature range'}
                                    value={props.data.silnik.pojemnosc.wartosc}
                                    onChange={(_, value) => {
                                        (props.data.silnik as SilnikSpalinowy).pojemnosc.wartosc = value as number
                                        props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                                    }

                                    }
                                    valueLabelDisplay="auto"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography>Typ paliwa :</Typography>
                                <TextField
                                    select
                                    value={props.data.silnik.rodzajPaliwa}
                                    onChange={(event) => {
                                        (props.data.silnik as SilnikSpalinowy).rodzajPaliwa = event.target.value as "benzyna"
                                        props.setData({ ...props.data })
                                    }
                                    }
                                >
                                    <MenuItem value={'benzyna'}>Benzyna</MenuItem>
                                    <MenuItem value={'ropa'}>Ropa</MenuItem>
                                    <MenuItem value={'wodor'}>Wodór</MenuItem>
                                </TextField>

                            </Grid>
                        </React.Fragment>
                        : <React.Fragment />
                }
            </Grid>
        </React.Fragment >
    );
}