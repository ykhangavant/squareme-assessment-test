import { LoadingState, TransactionFilters, TransactionsData } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockApi } from "../api/mockApi";

interface TransactionsState extends LoadingState {
   data: TransactionsData | null;
   filters: TransactionFilters;
}

const initialState: TransactionsState = {
   data: null,
   isLoading: false,
   error: null,
   filters: {
      dateRange: {
         from: null,
         to: null,
      },
      account: "All Accounts",
   },
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
   "transactions/fetchData",
   async (params: { page: number; filters: TransactionFilters }) => {
      const response = await mockApi.getTransactions(params.page);
      return response.data;
   }
);

const transactionsSlice = createSlice({
   name: "transactions",
   initialState,
   reducers: {
      setFilters: (
         state,
         action: PayloadAction<Partial<TransactionFilters>>
      ) => {
         state.filters = { ...state.filters, ...action.payload };
      },
      clearError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
         })
         .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.error =
               action.error.message || "Failed to fetch transactions";
         });
   },
});

export const { setFilters, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
