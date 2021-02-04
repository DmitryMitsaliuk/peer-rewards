import React, { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import RewardsTabs from './components/RewardsTabs';
import RewardsHeader from './components/RewardsHeader';
import Modal from './components/Modal';

import { distanceInWordsToNow } from './utils/helpers/dateHelpers';
import { mockedRewards, currentUser, users } from './mocks/mockData';

const useStyles = makeStyles({
  app: {
    textAlign: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const classes = useStyles();
  const [rewards, setRewards] = useState(mockedRewards);
  const [user, setUser] = useState(currentUser);

  const userAwards = useMemo(
    () =>
      rewards.filter(({ awardedPerson }) => {
        return awardedPerson === user?.userName;
      }),
    [rewards, user.userName]
  );

  const addReward = (reward) => {
    const date = distanceInWordsToNow();
    const newUserGive = user?.userGive + Number(reward?.reward);
    const newUserRewards = user?.userRewards - Number(reward?.reward);

    const newReward = {
      ...reward,
      date,
      giver: user?.userName,
      id: Date.now(),
    };

    setRewards((rewards) => [...rewards, newReward]);
    setUser((user) => ({
      ...user,
      userGive: newUserGive,
      userRewards: newUserRewards,
    }));
  };

  return (
    <div className={classes.app}>
      <RewardsHeader currentUser={user} />
      <RewardsTabs rewards={rewards} userAwards={userAwards} />
      <Modal currentUser={user} users={users} addReward={addReward} />
    </div>
  );
}

export default App;
