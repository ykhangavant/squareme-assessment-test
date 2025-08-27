import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
   reducer: {
      dashboard: dashboardReducer,
      transactions: transactionsReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: ["persist/PERSIST", "transactions/setFilters"],
            ignoredActionsPaths: [
               "meta.arg",
               "payload.timestamp",
               "payload.dateRange.from",
               "payload.dateRange.to",
            ],
            ignoredPaths: [
               "transactions.filters.dateRange.from",
               "transactions.filters.dateRange.to",
            ],
         },
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
