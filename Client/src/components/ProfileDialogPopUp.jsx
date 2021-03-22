import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    width: '100%',
    minWidth: 166,
  },
}));
function ProfileDialogPopUp({ open, handleClose }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='edit_profile'
        maxWidth='sm'
      >
        <DialogTitle id='edit_profile'>{'Edit profile'}</DialogTitle>
        <DialogContent>
          <form>
            <div className='flex flex-row flex-wrap'>
              <div className='px-2 w-full sm:w-auto pb-6'>
                <TextField className={classes.menuItem} label='First Name' />
              </div>
              <div className='px-2 w-full sm:w-auto pb-6'>
                <TextField className={classes.menuItem} label='Last Name' />
              </div>
            </div>
            <div className='flex flex-row flex-wrap'>
              <div className='px-2 w-full sm:w-auto flex flex-col justify-end pb-6'>
                <FormControl>
                  <InputLabel id='gender'>Gender</InputLabel>
                  <Select
                    labelId='gender'
                    className={classes.menuItem}
                    label='Gender'
                  >
                    <MenuItem value='M'>Male</MenuItem>
                    <MenuItem value='F'>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='px-2 w-full sm:w-auto flex flex-col justify-end pb-6'>
                <FormControl>
                  <InputLabel id='gender'>Sexual Preferences</InputLabel>
                  <Select className={classes.menuItem} label='Sexual preferences'>
                    <MenuItem value='M'>Males</MenuItem>
                    <MenuItem value='F'>Females</MenuItem>
                    <MenuItem value='F'>Li ta7 fl me9la it9la</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='px-2 w-full sm:w-auto flex flex-col justify-end'>
              <TextareaAutosize placeholder='Bio' rowsMin={3} rowsMax={6} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileDialogPopUp;
