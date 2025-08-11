'use client'
import { Box, Button, CardContent, Typography, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { useEffect, useState } from "react";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
import Card from '@mui/material/Card';
import FormDialog from "./addComment";
import { AddVotes } from "../redux/thunk/votes.thunk";

export default function AllFeedbackList() {
  const dispatch = useAppDispatch();
const [addComment,setAddComment] = useState(false);
  const feedbacklist = useAppSelector((state) => state.feedback.feedbacklist) || {
    feedback: [],
    total: 10,
    limit: 3,
    page: 1
  };

  const { feedback } = feedbacklist;

  useEffect(() => {
    dispatch(getFeedbackThunk({}));
  }, [dispatch]);

  const handleUpvote = (id: number) => {
    console.log("Upvote clicked for:", id);
     dispatch(AddVotes({feedbackId:id,voteType:"up"}))
  };

  const handleDownvote = (id: number) => {
    console.log("Downvote clicked for:", id);
     dispatch(AddVotes({feedbackId:id,voteType:"down"}))
  };
  return (
    <>
      {feedback?.length > 0 ? (
        feedback.map((c: any, index: number) => (
          <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4, p: 2 }} key={index}>
            <CardContent>
              <Typography variant="h5" component="div">
                {c.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {c.description}
              </Typography>

              
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => handleUpvote(c.id)}>
                  👍 {c.upVotes ?? 0}
                </Button>
                <Button variant="outlined" onClick={() => handleDownvote(c.id)}>
                  👎 {c.downVotes ?? 0}
                </Button>
                <FormDialog feedbackId={c.id} />
              </Stack>
            </CardContent>
           
          </Card>
        ))
      ) : (
        <Typography>No Feedback Found</Typography>
      )}
    </>
  );
}
