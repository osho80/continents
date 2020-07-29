import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  }
});

export function CountryPreview(props) {
    const { country, flagSrc } = props
    const classes = useStyles();

  return (
    <article className="country-preview">  
        <Card className={classes.root}>
            <CardActionArea>
                <div className="country-heading">
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="h6">
                            {country.code}
                        </Typography>
                    </CardContent>
                    <img src={flagSrc} alt="counytry's flag" className="country-flag"/>
                </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {country.name}
                        </Typography>
                    </CardContent>
                <div className="country-info">
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="ul">
                            <li>Phone: {country.phone}</li>
                            <li>Capital: {country.capital}</li>
                            <li>Currency: {country.currency}</li>
                            <li>Languages: {country.languages}</li>
                        </Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    </article>
  );
}


