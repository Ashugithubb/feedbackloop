'use client'
import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux/hook/hook";

import { TextField } from "@mui/material";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
export default function SearchComponent() {
    const [searchValue, setsearchValue] = useState('');
    const dispatch = useAppDispatch()
    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (searchValue.trim() === '') {
                return;
            }
            try {
            dispatch(getFeedbackThunk({searchValue}))

            } catch (error) {
                console.log("Fetch error:", error);
            }
        }, 2000);

        return () => clearTimeout(debounce);
    }, [searchValue]);
    return (
        <>
            <TextField label="Title or Description" margin="normal"
                value={searchValue}
                onChange={(e) => setsearchValue(e.target.value)} />
        </>
    )
}