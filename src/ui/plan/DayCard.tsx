import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
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
import Tooltip from '@mui/material/Tooltip';
import PlanAccordion from './PlanAccordion';
import DirectionsIcon from '@mui/icons-material/Directions';
import DeleteButton from './DeleteButton';

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
        title = {formatDate(new Date(props.date))+'    '+props.placeList[0].title + ' ...' } 
      />

      <CardMedia
        component="img"
        height="194"
        image={props.placeList[0].image}   //write img addres here
        alt="Paella dish"
      />
      
      <CardActions disableSpacing>
        
        <Tooltip title="Like">
          <IconButton aria-label="favorite">
            <FavoriteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Get Directions">
          <IconButton aria-label="direction" onClick={getDirections}>
            <DirectionsIcon />
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <DeleteButton clickDelete= {() => {props.DayCardDelete(props.date)}}/>
        </Tooltip>

        <Tooltip title="Plan Details">
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Tooltip>
        
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {props.placeList.map(place => 
          <PlanAccordion place = {place}/>
        )}
      </Collapse>
    </Card>
  );
}