'use client'
import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const initialTags = ['UI', 'Next', 'React'];

export default function TagSelector() {
    const [options, setOptions] = useState(initialTags);
    const [selectedTag, setSelectedTag] = useState('');

    const handleChange = (event: any, value: string) => {
        if (value && !options.includes(value)) {
            setOptions((prev) => [...prev, value]);
        }
        setSelectedTag(value);
    };

    return (
        <Autocomplete
            freeSolo
            options={options}
            value={selectedTag}
            onInputChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Select or Add Tag" />}
            

     
        />
    );
}
