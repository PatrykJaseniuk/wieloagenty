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
import Review from './Review';
import { Parametry, ParametryOgolne } from '../../Data/data';
import { CenaForm } from './Cena.Form';
import { WynikWyszukiwan } from '../wyniki';
import { Formularz } from './Formularz';
import Review2 from './Review2';
import { KreatorAgentow } from '../KreatorAgentow';
import { SystemWieloagentowy } from '../../SystemWieloagentowy/SystemWieloAgentowy';


const steps = ['Parametry', 'cena', 'Podsumowanie'];

function getStepContent(step: number, parametryOgolne: ParametryOgolne, set: React.Dispatch<React.SetStateAction<ParametryOgolne>>) {
    switch (step) {
        // case 0:
        //     return <SilnikForm data={data} setData={setData} />;
        // case 1:
        //     return <PodwozieForm data={data} setData={setData} />;
        // case 2:
        //     return <NadwozieForm data={data} setData={setData} />;
        // case 3:
        //     return <CenaForm data={data} setData={setData} />
        // case 4:
        //     return <Review data={data} />;
        case 0:
            return <Formularz parametryOgolne={parametryOgolne} set={set} />
        case 1:
            return <CenaForm parametryOgolne={parametryOgolne} setData={set} />
        case 2:
            return <Review2 parametryOgolne={parametryOgolne} />
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();


export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [parametry, setData] = React.useState<Parametry>(new Parametry('nazwa'));
    const [parametryOgolne, setParametryOgolne] = React.useState<ParametryOgolne>(new ParametryOgolne())
    const [systemWieloagentowy, setSystemWieloagentowy] = React.useState<SystemWieloagentowy>(new SystemWieloagentowy());

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
                <KreatorAgentow systemWieloagentowy={systemWieloagentowy} setSystemWieloagentowy={setSystemWieloagentowy} />
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
                                {/* <WynikWyszukiwan parametryOgolne={parametryOgolne} systemWieloagentowy={systemWieloagentowy} setSystemWieloagentowy={setSystemWieloagentowy} /> */}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, parametryOgolne, setParametryOgolne)}
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
            <WynikWyszukiwan parametryOgolne={parametryOgolne} systemWieloagentowy={systemWieloagentowy} setSystemWieloagentowy={setSystemWieloagentowy} />
            <Review2 parametryOgolne={parametryOgolne} />
        </ThemeProvider>
    );
}