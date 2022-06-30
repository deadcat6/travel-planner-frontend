import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function PlanAccordion(props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           {props.place.title}
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>Beijing to New York </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
            <img src = {props.place.image}/> 
            <Typography>
              Google Rating : {props.place.rating}
            </Typography>
            <Typography>
              Custom Tags: {props.place.properties}
            </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}