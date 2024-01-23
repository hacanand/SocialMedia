import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import  { getMyInfo, setLoading } from "./appConfigSlice";
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("user/getMyInfo", body);
       
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {}
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
  reducers: undefined
});

export default postsSlice.reducer;
 
