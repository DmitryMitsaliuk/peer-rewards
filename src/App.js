import React, { useMemo, useState } from 'react';
import './App.css';
import RewardsTabs from './components/RewardsTabs';
import RewardsHeader from './components/RewardsHeader';
import Modal from './components/Modal';
import { distanceInWordsToNow } from './dateHelpers';
import { mock, currentUser, users } from './mockData';

function App() {
  const [rewards, setRewards] = useState(mock);
  const [user, setUser] = useState(currentUser);

  const userAwards = useMemo(
    () =>
      rewards.filter(({ awardedPerson }) => {
        return awardedPerson === user?.userName;
      }),
    [rewards, user.userName]
  );

  const addRewards = (reward) => {
    const date = distanceInWordsToNow();
    const newUserGive = user?.userGive + Number(reward.reward);
    const newUserRewards = user?.userRewards - Number(reward.reward);

    const newReward = {
      ...reward,
      date,
      giver: user?.userName,
      id: Date.now(),
    };
    setRewards([...rewards, newReward]);
    setUser((user) => ({
      ...user,
      userGive: newUserGive,
      userRewards: newUserRewards,
    }));
  };

  return (
    <div className="App">
      <RewardsHeader currentUser={user} />
      <RewardsTabs rewards={rewards} userAwards={userAwards} />
      <Modal currentUser={user} users={users} addRewards={addRewards} />
    </div>
  );
}

export default App;
