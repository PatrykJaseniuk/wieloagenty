import { Key, PanoramaPhotosphere } from "@mui/icons-material";
import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { ParametryOgolne, WartoscPriorytet } from "../../Data/data";


function Parametr(props: { parametryOgolne: ParametryOgolne, nazwa: string, set: React.Dispatch<React.SetStateAction<ParametryOgolne>> }) {
    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                {props.nazwa}
            </Typography>
            <Grid container spacing={3}>
                {props.nazwa == 'kolor' ?
                    <Grid item xs={6}>
                        <TextField
                            label={'wartość'}
                            select
                            value={(props.parametryOgolne as any)[props.nazwa].wartosc}
                            onChange={(event) => {
                                (props.parametryOgolne as any)[props.nazwa].wartosc = event.target.value as "czarny"
                                props.set({ ...props.parametryOgolne })
                            }
                            }
                        >
                            <MenuItem value={'czerwony'}>Czerwony</MenuItem>
                            <MenuItem value={'bialy'}>Biały</MenuItem>
                            <MenuItem value={'czarny'}>Czarny</MenuItem>
                        </TextField>
                    </Grid>
                    :
                    <Grid item xs={6}>
                        <TextField
                            label={'wartość'}
                            select
                            value={(props.parametryOgolne as any)[props.nazwa].wartosc}
                            onChange={(event) => {
                                (props.parametryOgolne as any)[props.nazwa].wartosc = event.target.value as "czarny"
                                props.set({ ...props.parametryOgolne })
                            }
                            }
                        >
                            <MenuItem value={1}>Słabo</MenuItem>
                            <MenuItem value={2}>Średnio</MenuItem>
                            <MenuItem value={3}>Dobrze</MenuItem>
                            <MenuItem value={4}>Bardzo Dobrze</MenuItem>
                        </TextField>
                    </Grid>

                }
                <Grid item xs={6}>
                    <Typography>priorytet :</Typography>
                    <Slider
                        max={5}
                        min={0}
                        value={(props.parametryOgolne as any)[props.nazwa].priorytet}
                        onChange={(_, value) => {
                            value = (props.parametryOgolne as any)[props.nazwa].priorytet = value as number
                            props.set({ ...props.parametryOgolne }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }
                        }
                        valueLabelDisplay="auto"
                    />
                </Grid>
            </Grid>
        </Container>
    )


}

export function Formularz(props: { parametryOgolne: ParametryOgolne, set: React.Dispatch<React.SetStateAction<ParametryOgolne>> }) {
    return (
        <React.Fragment>
            {Object.keys(props.parametryOgolne).map(
                (parametrKey) => {
                    if (parametrKey != 'cena') {
                        return (
                            <Parametr set={props.set} nazwa={parametrKey} parametryOgolne={props.parametryOgolne} />
                        )
                    }
                }
            )}
        </React.Fragment >
    )
}