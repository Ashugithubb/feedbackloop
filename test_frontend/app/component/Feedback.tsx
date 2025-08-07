'use client'
import { Box, Button, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";

import { useEffect, useState } from "react";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
import Card from '@mui/material/Card';
export default function AllFeedbackList() {
    const dispatch = useAppDispatch();

    const feedbacklist = useAppSelector((state) => state.feedback.feedbacklist) || {
        feedback: [],
        total: 10,
        limit: 3,
        page: 1
    };

    const { feedback, total, limit, page } = feedbacklist;


    useEffect(() => {
        const fetchStudents = async () => {
            const res = await dispatch(getFeedbackThunk({}));
        };
        fetchStudents();
    }, []);


    return (
        <>
            {feedback?.length > 0 ? (
                feedback.map((c: any, index: number) => (
                    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4 }} key={index}>
                        <CardContent >
                            <Typography variant="h5" component="div">
                                {c.title}
                            </Typography>
                            <Typography color="text.secondary">
                                {c.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No Feedback Found</Typography>
            )}
            <Card />


        </>
    )
}