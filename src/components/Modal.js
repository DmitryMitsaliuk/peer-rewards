import React, { useState, useCallback } from 'react';
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
import { useFormik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: 'fixed',
    bottom: '30px',
    right: '50px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
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
    padding: theme.spacing(2)
  },
}));

const Modal = ({ users, addRewards, currentUser }) => {
  const { userRewards } = currentUser;
  const RewardsSchema = Yup.object().shape({
    awardedPerson: Yup.string().required('Required'),
    reward: Yup.number()
      .typeError('reward must be a number')
      .test(
        'is there enough money',
        `You only have ${userRewards} dollars`,
        (value) => value <= userRewards
      )
      .required('Required'),
    comment: Yup.string()
      .min(2, 'Too Short!')
      .max(250, 'Too Long!')
      .required('Required'),
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      awardedPerson: '',
      reward: '',
      comment: '',
    },
    validationSchema: RewardsSchema,
    onSubmit: (values, { resetForm }) => {
      addRewards(values);
      resetForm();
      setOpen(false);
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

        {userRewards ? (
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
        ) : (
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
  addRewards: PropTypes.func,
  currentUser: PropTypes.object,
};

export default Modal;
