import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SilnikForm } from './SilnikForm';
import Review from './Review';
import { PodwozieForm } from './PodwozieForm';
import { Parametry } from '../../Data/data';
import { NadwozieForm } from './NadwozieForm';
import { CenaForm } from './Cena.Form';
import { WynikWyszukiwan } from '../wyniki';


const steps = ['Silnik', 'Podwozie', 'Nadwozie', 'cena', 'Podsumowanie'];

function getStepContent(step: number, data: Parametry, setData: React.Dispatch<React.SetStateAction<Parametry>>) {
    switch (step) {
        case 0:
            return <SilnikForm data={data} setData={setData} />;
        case 1:
            return <PodwozieForm data={data} setData={setData} />;
        case 2:
            return <NadwozieForm data={data} setData={setData} />;
        case 3:
            return <CenaForm data={data} setData={setData} />
        case 4:
            return <Review data={data} />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();


let newData: Parametry;


export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [parametry, setData] = React.useState<Parametry>(new Parametry);
    const [cos, setCos] = React.useState({ cos: 1 });

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="secondary"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        system wieloagentowy
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Parametry pojazdu
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <WynikWyszukiwan parametry={parametry} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, parametry, setData)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Poprzedni
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Wyszukaj ofert' : 'Następny'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
            <WynikWyszukiwan parametry={parametry} />
            <Review data={parametry} />
        </ThemeProvider>
    );
}