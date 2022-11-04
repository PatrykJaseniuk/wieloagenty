import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import React from "react";
import { Parametry, ParametryOgolne, Samochod } from "../Data/data";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Review from "./checkout/Review";
import { generujParametrySzczegolowe, SystemWieloagentowy } from "../SystemWieloagentowy/SystemWieloAgentowy";

export function WynikWyszukiwan(props: { parametryOgolne: ParametryOgolne, systemWieloagentowy: SystemWieloagentowy, setSystemWieloagentowy: React.Dispatch<React.SetStateAction<SystemWieloagentowy>> }) {

    let parametrySzczegolowe = generujParametrySzczegolowe(props.parametryOgolne)
    let samochody = props.systemWieloagentowy.wyszukaj(parametrySzczegolowe)

    return (
        <React.Fragment>
            {samochody.map((samochod) => {
                return (
                    <Accordion key={samochod.samochod.nazwa}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{samochod.samochod.nazwa} roznica: {samochod.roznica}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Review data={samochod.samochod.parametry} />
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            {/* <Review data={parametrySzczegolowe} /> */}
        </React.Fragment>
    )
}


