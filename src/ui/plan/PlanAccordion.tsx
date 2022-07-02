import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TagIcon from '@mui/icons-material/Tag';
import StarRateIcon from '@mui/icons-material/StarRate';


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
              <StarRateIcon color="primary" fontSize="small"/>
              Google Rating : {props.place.rating === undefined ? "None" : props.place.rating}
            </Typography>
            <Typography>
              <TagIcon color="primary" fontSize="small"/>
              Custom Tags: {props.place.properties.map(property => property + "   ") }
            </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}