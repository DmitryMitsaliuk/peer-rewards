import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {TabContext, TabPanel} from '@material-ui/lab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RewardsPanel from './RewardsPanel';
import {Paper} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2)
    },
    tabs: {
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16)',
    }
}));


const RewardsTabs = ({rewards, userAwards}) => {

    const classes = useStyles();
    const [value, setTabIndex] = useState('1');

    const handleChange = (event, index) => {
        setTabIndex(index);
    };

    return (

        <Paper className={classes.container} elevation={3}>
            <TabContext value={value}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    className={classes.tabs}
                >
                    <Tab label="Feed" value="1"/>
                    <Tab label="My rewards" value="2"/>
                </Tabs>
                <TabPanel value="1"><RewardsPanel rewards={rewards}/></TabPanel>
                <TabPanel value="2"><RewardsPanel rewards={userAwards}/></TabPanel>
            </TabContext>
        </Paper>
    )
}

RewardsTabs.propTypes = {
    rewards: PropTypes.array,
    userAwards: PropTypes.array,
};

export default RewardsTabs;