import React from 'react';
import PropTypes from 'prop-types';
import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    makeStyles, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    author: {
        color: theme.palette.primary.main,
    },
    date: {
        display: 'block',
    }
}));


const RewardsPanel = ({rewards}) => {

    const classes = useStyles();
    return (
        <div>
            <List className={classes.root}>
                {rewards?.map(({awardedPerson, giver, date, comment}) => (
                    <div key={date}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={awardedPerson} src="../assets/avatar.png"/>
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.author}
                                primary={`${awardedPerson} rewarded by ${giver}`}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textSecondary"
                                            className={classes.date}
                                        >
                                            {date}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            color="textPrimary"
                                        >
                                            {comment}
                                        </Typography>

                                    </>
                                }
                            />

                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </div>)
                )}
            </List>
        </div>
    );
}

RewardsPanel.propTypes = {
    rewards: PropTypes.array,
};

export default RewardsPanel;