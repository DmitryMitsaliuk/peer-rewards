import React, {useMemo, useState} from 'react';
import './App.css';
import RewardsTabs from './components/RewardsTabs'
import RewardsHeader from './components/RewardsHeader';
import Modal from './components/Modal';
import {distanceInWordsToNow} from './dateHelpers';


const users = ['John Chen', 'David Green', 'Alex Brown', 'Rajesh Kumar'];

const mock = [{
    awardedPerson: 'David Green',
    giver: 'John Chen',
    date: '2h ago',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    id: 'firstComment'
}, {
    awardedPerson: 'Alex Brown',
    giver: 'Rajesh Kumar',
    date: '3h ago',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    id: 'secondComment'

}, {
    awardedPerson: 'Dasha Kavalenka',
    giver: 'Rajesh Kumar',
    date: '4h ago',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    id: 'thirdComment'
},
]

const currentUser = {userName: 'Dasha Kavalenka', userRewards: 1000, userGive: 100};

function App() {
    const [rewards, setRewards] = useState(mock);
    const [user, setUser] = useState(currentUser);

    const userAwards = useMemo(() => rewards.filter(({awardedPerson}) => {
        return awardedPerson === user?.userName;
    }), [rewards, user.userName])

    const addRewards = (reward) => {
        const date = distanceInWordsToNow();
        const newUserGive = user?.userGive + Number(reward.reward);
        const newUserRewards = user?.userRewards - Number(reward.reward);

        const newReward = {
            ...reward,
            date,
            giver: user?.userName,
            id: Date.now(),
        }
        setRewards([...rewards, newReward])
        setUser((user => ({
            ...user,
            userGive: newUserGive,
            userRewards: newUserRewards
        })))
    }

    return (
        <div className="App">
            <RewardsHeader currentUser={user}/>
            <RewardsTabs rewards={rewards} userAwards={userAwards}/>
            <Modal users={users} addRewards={addRewards}/>
        </div>
    );
}

export default App;
