import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Parametry } from '../../Data/data';
import { Slider, SpeedDialIconClassKey } from '@mui/material';

export function PodwozieForm(props: { data: Parametry, setData: React.Dispatch<React.SetStateAction<Parametry>> }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Podwozie
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography>przeswit [cm]:</Typography>
                    <Slider
                        max={props.data.podwozie.przeswit.max}
                        min={props.data.podwozie.przeswit.min}
                        value={props.data.podwozie.przeswit.wartosc}
                        onChange={(_, value) => {
                            props.data.podwozie.przeswit.wartosc = value as number
                            props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }
                        }
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Rozmiar kół [cale]:</Typography>
                    <Slider
                        max={props.data.podwozie.rozmiarKol.max}
                        min={props.data.podwozie.rozmiarKol.min}
                        value={props.data.podwozie.rozmiarKol.wartosc}
                        onChange={(_, value) => {
                            props.data.podwozie.rozmiarKol.wartosc = value as number
                            props.setData({ ...props.data }); //żeby stan sie aktualizowal musze jako argument do setData przeslac '{ ...props.data }' a nie samo 'props.data'
                        }
                        }
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Napęd na przednie koła</Typography>
                    <Checkbox
                        checked={props.data.podwozie.napedPrzod}
                        onChange={() => {
                            props.data.podwozie.napedPrzod = !props.data.podwozie.napedPrzod;
                            props.setData({ ...props.data });
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Napęd na tylne koła</Typography>
                    <Checkbox
                        checked={props.data.podwozie.napedTyl}
                        onChange={() => {
                            props.data.podwozie.napedTyl = !props.data.podwozie.napedTyl;
                            props.setData({ ...props.data });
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Skretna Tylna oś</Typography>
                    <Checkbox
                        checked={props.data.podwozie.skretnaTylnaOs}
                        onChange={() => {
                            props.data.podwozie.skretnaTylnaOs = !props.data.podwozie.skretnaTylnaOs;
                            props.setData({ ...props.data });
                        }
                        }
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}