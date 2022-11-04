import { Button, Slider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { SystemWieloagentowy } from "../SystemWieloagentowy/SystemWieloAgentowy";

export function KreatorAgentow(props: { systemWieloagentowy: SystemWieloagentowy, setSystemWieloagentowy: React.Dispatch<React.SetStateAction<SystemWieloagentowy>> }) {
    const [iloscKupcow, setIloscKupcow] = React.useState(5);
    const [iloscSprzedawcow, setIloscSprzedawcow] = React.useState(5);
    return (
        <Container maxWidth='sm'>
            <Typography variant="h4">
                Kreator Agentow
            </Typography>
            <Typography marginTop={2} >Ilosc agentow kupcow</Typography>
            <Slider
                max={30}
                min={0}
                value={iloscKupcow}
                onChange={(_, value) => setIloscKupcow(value as number)}
                valueLabelDisplay="auto"
            />
            <Typography marginTop={2} >Ilosc agentow sprzedawców</Typography>
            <Slider
                max={30}
                min={0}
                value={iloscSprzedawcow}
                onChange={(_, value) => setIloscSprzedawcow(value as number)}
                valueLabelDisplay="auto"
            />
            <Button variant='contained'
                onClick={() => {
                    // props.systemWieloagentowy.tworzKupcow(iloscKupcow);
                    props.systemWieloagentowy.tworzSprzedawcow(iloscSprzedawcow);
                    props.systemWieloagentowy.tworzKupcow(iloscKupcow);
                }
                }
            > Generuj </Button>
        </Container>
    )
}