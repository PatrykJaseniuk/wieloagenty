import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import React from "react";
import { Parametry, Samochod } from "../Data/data";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Review from "./checkout/Review";
import { wyszukaj } from "../SystemWieloagentowy/SystemWieloAgemtowy";

export function WynikWyszukiwan(props: { parametry: Parametry }) {

    let samochody = wyszukaj(props.parametry)

    return (
        <React.Fragment>
            {samochody.map((samochod) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{samochod.nazwa}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Review data={samochod.parametry} />
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </React.Fragment>
    )
}


