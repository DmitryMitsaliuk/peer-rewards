import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import modalSchema from '../utils/validationSchemas/modal';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: 'fixed',
    bottom: '30px',
    right: '50px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.light,
    },
  },
  actions: {
    paddingRight: 0,
  },
  title: {
    borderBottom: '1px solid grey',
  },
  content: {
    width: '450px',
  },
  error: {
    fontSize: '16px',
    color: 'red',
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

const Modal = ({ users, addReward, currentUser }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { userRewards } = currentUser;
  const validationSchema = useMemo(() => modalSchema(userRewards), [
    userRewards,
  ]);

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      awardedPerson: '',
      reward: '',
      comment: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      setOpen(false);
      addReward(values);
    },
  });

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        variant="contained"
        className={classes.btn}
      >
        <AddIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="modal-title">
        <DialogTitle className={classes.title} id="modal-title">
          Reward
        </DialogTitle>

        {!!userRewards && (
          <DialogContent className={classes.content}>
            <DialogContentText>
              Please select the awardee, add the amount and comment.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
              <TextField
                name="awardedPerson"
                select
                margin="dense"
                id="to"
                label="To"
                value={values.awardedPerson}
                fullWidth
                onChange={handleChange}
              >
                {users.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </TextField>
              {touched.awardedPerson && errors.awardedPerson && (
                <Typography className={classes.error}>
                  {errors.awardedPerson}
                </Typography>
              )}
              <TextField
                name="reward"
                margin="dense"
                id="Reward"
                label="Reward"
                value={values.reward}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
              />
              {touched.reward && errors.reward && (
                <Typography className={classes.error}>
                  {errors.reward}
                </Typography>
              )}
              <TextField
                margin="dense"
                name="comment"
                id="comment"
                label="Comment"
                value={values.comment}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
              {touched.comment && errors.comment && (
                <Typography className={classes.error}>
                  {errors.comment}
                </Typography>
              )}
              <DialogActions className={classes.actions}>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Reward
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        )}
        {!userRewards && (
          <div className={classes.content}>
            <Typography className={classes.error}>
              You've run out of your rewards
            </Typography>
          </div>
        )}
      </Dialog>
    </>
  );
};

Modal.propTypes = {
  users: PropTypes.array,
  addReward: PropTypes.func,
  currentUser: PropTypes.object,
};

export default Modal;
