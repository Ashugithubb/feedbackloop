'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../component/navbar";
import AllFeedbackList from "../component/Feedback";
import FeedbackFilters from "../component/feedback.filters";
import { Box, Button } from "@mui/material";
import FeedbackForm from "../component/addFeedback";
import { useState } from "react";
import FeedbackList from "../component/MyFeedback";



export default function Home() {
  const [openFeedback, setFeedback] = useState(false)
  const [openMyFeedback,setMyFeedback]=useState(false)
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: 5 }}><FeedbackFilters /></Box>
      <AllFeedbackList />
      <Button variant="contained" onClick={() => setFeedback(!openFeedback)}>Add Feedback</Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>  <Button variant="contained" onClick={() => setMyFeedback(!openMyFeedback)}>My Feedbacks</Button></Box>
     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
  <Box sx={{ width: "450px" }}>
    {openFeedback && <FeedbackForm />}
  </Box>
  <Box sx={{ width: "450px" }}>
    {openMyFeedback && <FeedbackList />}
  </Box>
</Box>

    </>
  );
}
