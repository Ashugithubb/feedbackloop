"use client";
import * as React from "react";
import { TextField, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { getFeedbackThunk } from "../redux/slice/feeback.slice";
import { TagInfo, TagDetails } from "../redux/slice/tags.slice";
import { UserDetails, UserSearch } from "../redux/slice/author.slice";

export default function FeedbackFilters() {
    const dispatch = useAppDispatch();

    const tagDetails = useAppSelector((state) => state.tags.tagDetails) ?? [];
    const authorDetails = useAppSelector((state) => state.author.userDetails) ?? [];

    const [searchValue, setSearchValue] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState<TagDetails[]>([]);
    const [selectedAuthors, setSelectedAuthors] = React.useState<UserDetails[]>([]);

    +
        React.useEffect(() => {
            dispatch(TagInfo());
            dispatch(UserSearch());
        }, [dispatch]);


    React.useEffect(() => {
        const debounce = setTimeout(() => {
            dispatch(
                getFeedbackThunk({
                    searchValue: searchValue.trim() || undefined,
                    tags: selectedTags.map((t) => t.id),
                    authors: selectedAuthors.map((a) => a.id),
                })
            );
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchValue, selectedTags, selectedAuthors, dispatch]);

    return (
        <Box display="flex" gap={2} flexWrap="wrap">

            <TextField
                label="Title or Description"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ width: 250 }}
            />


            <Autocomplete
                multiple
                disablePortal
                options={tagDetails}
                getOptionLabel={(option) => option.tagName}
                value={selectedTags}
                onChange={(_, newValue) => setSelectedTags(newValue)}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Tags" />}
            />


            <Autocomplete
                multiple
                disablePortal
                options={authorDetails}
                getOptionLabel={(option) => option.userName}
                value={selectedAuthors}
                onChange={(_, newValue) => setSelectedAuthors(newValue)}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Authors" />}
            />
        </Box>
    );
}
