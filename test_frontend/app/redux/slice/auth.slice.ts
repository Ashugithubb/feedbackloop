
import { loginSchema } from '@/app/(auth)/login/page';
import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';

type loginFormData = z.infer<typeof loginSchema>;

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: loginFormData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        data,
        { withCredentials: true }
      );
      console.log(data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export interface login{
    loading: boolean;
    error: string | null;
    token:string | null
}
const initialState :login = {
    loading: false,
    error: null,
    token: null
}



const loginSlice = createSlice({
    name: 'authlogin',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser .fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.token = action.payload;
            })
            .addCase(loginUser .rejected, (state, action) => {
                state.loading = false;
                state.error = null;
            });
    },
});

export const { clearUser } = loginSlice.actions;

export default loginSlice.reducer;
