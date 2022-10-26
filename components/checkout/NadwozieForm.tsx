import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Parametry } from '../../Data/data';
import { MenuItem, Slider, SpeedDialIconClassKey } from '@mui/material';

export function NadwozieForm(props: { data: Parametry, setData: React.Dispatch<React.SetStateAction<Parametry>> }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Nadwozie
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label={'kolor'}
                        select
                        value={props.data.nadwozie.kolor}
                        onChange={(event) => {
                            props.data.nadwozie.kolor = event.target.value as "czarny"
                            props.setData({ ...props.data })
                        }
                        }
                    >
                        <MenuItem value={'czarny'}>Czarny</MenuItem>
                        <MenuItem value={'bialy'}>Biały</MenuItem>
                        <MenuItem value={'czerwony'}>Czerwony</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Klimatyzacja</Typography>
                    <Checkbox
                        checked={props.data.nadwozie.czyMaKimatyzacje}
                        onChange={() => {
                            props.data.nadwozie.czyMaKimatyzacje = !props.data.nadwozie.czyMaKimatyzacje;
                            props.setData({ ...props.data });
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Radio</Typography>
                    <Checkbox
                        checked={props.data.nadwozie.czyMaradio}
                        onChange={() => {
                            props.data.nadwozie.czyMaradio = !props.data.nadwozie.czyMaradio;
                            props.setData({ ...props.data });
                        }
                        }
                    />
                </Grid>

            </Grid>
        </React.Fragment>
    );
}