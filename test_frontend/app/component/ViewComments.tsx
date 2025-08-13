'use client';

import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Stack } from "@mui/material";
import { useAppSelector } from "../redux/hook/hook";

interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  parent?: CommentType | null;
  child?: CommentType[];
}

interface ViewCommentsProps {
  comment: CommentType[];
}

export default function ViewComments(comment:any) {
  console.log("comment is ",comment.comment.comment)
  const feedbackComment = comment.comment.comment;
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      content: "This is the first parent comment",
      createdAt: new Date().toISOString(),
      child: [
        {
          id: 2,
          content: "This is a reply to the first comment",
          createdAt: new Date().toISOString()
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const addComment = (parentId: number | null, content: string) => {
    if (!content.trim()) return;

    if (parentId === null) {
      setComments(prev => [
        ...prev,
        { id: Date.now(), content, createdAt: new Date().toISOString(), child: [] }
      ]);
    } else {
      const addChild = (list: CommentType[]): CommentType[] =>
        list.map(c =>
          c.id === parentId
            ? {
                ...c,
                child: [
                  ...(c.child || []),
                  { id: Date.now(), content, createdAt: new Date().toISOString() }
                ]
              }
            : { ...c, child: addChild(c.child || []) }
        );
      setComments(prev => addChild(prev));
    }
  };

  const CommentItem = ({ comment }: { comment: CommentType }) => {
    const [replyText, setReplyText] = useState("");
    const [showReply, setShowReply] = useState(false);

    return (
      <Box sx={{ pl: 2, mt: 1 }}>
        <Paper sx={{ p: 1 }}>
          <Typography variant="body1">{comment.content}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(comment.createdAt).toLocaleString()}
          </Typography>
          <Box>
            <Button size="small" onClick={() => setShowReply(!showReply)}>
              Reply
            </Button>
          </Box>

          {showReply && (
            <Box sx={{ mt: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <Button
                sx={{ mt: 1 }}
                variant="contained"
                size="small"
                onClick={() => {
                  addComment(comment.id, replyText);
                  setReplyText("");
                  setShowReply(false);
                }}
              >
                Post Reply
              </Button>
            </Box>
          )}
        </Paper>

        {comment.child &&
          comment.child.map(child => (
            <CommentItem key={child.id} comment={child} />
          ))}
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
   
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          onClick={() => {
            addComment(null, newComment);
            setNewComment("");
          }}
        >
          Post Comment
        </Button>
      </Paper>

     
      <Stack spacing={1}>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Stack>
    </Box>
  );
}
