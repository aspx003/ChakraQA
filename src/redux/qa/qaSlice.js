import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "src/supabase/supabase";

export const getQa = createAsyncThunk('auth/getQa', async () => {
    try {
        let { data } = await supabase.from('questions-answer').select('*');
        return data;
    } catch (error) {
        return error;
    }
});

export const postQa = createAsyncThunk('auth/postQa', async ({ question, answer, created_by }) => {
    try {

        const { data } = await supabase
            .from('questions-answer')
            .insert([
                {
                    question: question,
                    answer: answer,
                    created_by: created_by,
                    updated_by: created_by,
                    topics: ["SQL", "REACT"]
                },
            ])
            .select()
        return data;
    } catch (error) {
        return error;
    }
});

const qaSlice = createSlice({
    name: 'qa',
    initialState: {
        error: null,
        qaArray: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getQa.fulfilled, (state, action) => {
                state.error = null;
                state.qaArray = action.payload;
                state.loading = false;
            })
            .addCase(getQa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postQa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postQa.fulfilled, (state, action) => {
                state.error = null;
                state.qaArray.push(action.payload);
                state.loading = false;
            })
            .addCase(postQa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

// export const {logout} = authSlice.actions;
export default qaSlice.reducer;