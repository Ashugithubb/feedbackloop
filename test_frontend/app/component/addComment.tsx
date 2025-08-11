import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AddComment } from '../redux/thunk/comment.thunk';
import { useAppDispatch } from '../redux/hook/hook';
import { toast, ToastContainer } from 'react-toastify';

interface FormDialogProps {
  feedbackId: number;
}

export default function FormDialog({ feedbackId }: FormDialogProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    
    const commentData: any = Object.fromEntries(formData.entries());
    commentData.feedbackId = feedbackId;
    console.log(commentData);
   
    const res = await  dispatch(AddComment(commentData)); ;
    
        if (res.meta.requestStatus === 'fulfilled') {
          toast.success("Comment Added!");
        } else {
          toast.error(res.payload || " Not able to comment");
        }
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Comment
      </Button>
      <ToastContainer/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your Comment on this feedback
          </DialogContentText>
          <form onSubmit={handleSubmit} id="comment-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="comment"
              name="content"
              label="Comment"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="comment-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
