import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlanAccordion from './PlanAccordion';
import DirectionsIcon from '@mui/icons-material/Directions';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DayCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (d) => {
    return [
      d.getFullYear(),
      padTo2Digits(d.getMonth() + 1),
      padTo2Digits(d.getDate()),
    ].join('-');
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getDirections = () => {
    props.getDirections(props.placeList)
  }

  // console.log(props.placeList)

  return (
    <Card sx={{m: 4, maxWidth: 500, mx: "auto" }}>
      <CardHeader
        // avatar={
        //   // write day info here
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     Day 1 
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="direction" onClick={getDirections}>
            <DirectionsIcon />
            <Typography variant="body2" color="text.secondary">
              Get Directions
            </Typography>
        </IconButton>
        }
        title = {formatDate(new Date(props.date))}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg"   //write img addres here
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        "NYC" and "New York, New York" redirect here. For other uses, see New York City (disambiguation); NYC (disambiguation); and New York, New York (disambiguation).
        </Typography>
      </CardContent> */}

      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <Typography variant="body2" color="text.secondary">
          Plan Details
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {props.placeList.map(place => 
          <PlanAccordion place = {place}/>
        )}
        {/* <PlanAccordion />
        <PlanAccordion /> */}
      </Collapse>
    </Card>
  );
}