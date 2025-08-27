import { DashboardData, LoadingState } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockApi } from "../api/mockApi";

interface DashboardState extends LoadingState {
   data: DashboardData | null;
   selectedPeriod: "today" | "last7days" | "last30days";
   isUpdatingChart: boolean;
}

const initialState: DashboardState = {
   data: null,
   isLoading: false,
   error: null,
   selectedPeriod: "last7days",
   isUpdatingChart: false,
};

// Async thunks
const fetchDashboardData = createAsyncThunk(
   "dashboard/fetchData",
   async (period: string) => {
      const response = await mockApi.getDashboardData(period);
      return response.data;
   }
);

const updateChartData = createAsyncThunk(
   "dashboard/updateChart",
   async (period: string) => {
      const response = await mockApi.getDashboardData(period);
      return response.data;
   }
);

const dashboardSlice = createSlice({
   name: "dashboard",
   initialState,
   reducers: {
      setSelectedPeriod: (
         state,
         action: PayloadAction<"today" | "last7days" | "last30days">
      ) => {
         state.selectedPeriod = action.payload;
      },
      clearError: (state) => {
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchDashboardData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
         })
         .addCase(fetchDashboardData.rejected, (state, action) => {
            state.isLoading = false;
            state.error =
               action.error.message || "Failed to fetch dashboard data";
         })
         .addCase(updateChartData.pending, (state) => {
            state.isUpdatingChart = true;
            state.error = null;
         })
         .addCase(updateChartData.fulfilled, (state, action) => {
            state.isUpdatingChart = false;
            state.data = action.payload;
         })
         .addCase(updateChartData.rejected, (state, action) => {
            state.isUpdatingChart = false;
            state.error = action.error.message || "Failed to update chart data";
         });
   },
});

export const { setSelectedPeriod, clearError } = dashboardSlice.actions;
export { fetchDashboardData, updateChartData };
export default dashboardSlice.reducer;
