import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { boolean } from 'zod';

export interface TagDetails {
    id: number,
    tagName: string
}
export interface Tags {
    loading: boolean;
    error: string | null;
    tagDetails: TagDetails[] | null
}

const initialState: Tags = {
    loading: false,
    error: null,
    tagDetails: null
}

export const UserInfo = createAsyncThunk(
    'tag/getTag',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:3001/tag', {
                withCredentials: true,
            });
            console.log("data:", res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch tags');
        }
    }
);






// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         clearUser: (state) => {
//             state.profile = null;
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(UserInfo.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(UserInfo.fulfilled, (state, action: PayloadAction<UserProfile>) => {
//                 state.loading = false;
//                 state.profile = action.payload;
//             })
//             .addCase(UserInfo.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const { clearUser } = userSlice.actions;

// export default userSlice.reducer;


