import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import GirlAvatar from '../assets/avatar.png';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: theme.spacing(2),
    backgroundColor: 'azure',
    border: `1px solid aliceblue`,
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16)',
  },
  avatar: {
    width: '70px',
    height: '70px',
    margin: theme.spacing(1),
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  reward: {
    fontSize: '20px',
    color: '#3f51b5',
    fontWeight: 'bold',
  },
}));

const RewardsHeader = ({ currentUser }) => {
  const { userName, userRewards, userGive } = currentUser;
  const classes = useStyles();

  return (
      <div className={classes.container}>
        <div className={classes.headerSection}>
          <Avatar alt="Remy Sharp" src={GirlAvatar} className={classes.avatar} />
          <h2>{userName}</h2>
        </div>
        <div className={classes.headerSection}>
          <h3>My rewards</h3>
          <span className={classes.reward}>{userRewards}</span>
        </div>
        <div className={classes.headerSection}>
          <h3>Give</h3>
          <span className={classes.reward}>{userGive}</span>
        </div>
      </div>
  );
};

RewardsHeader.propTypes = {
  currentUser: PropTypes.object,
};
export default RewardsHeader;
