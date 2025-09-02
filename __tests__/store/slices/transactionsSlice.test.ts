import { configureStore } from "@reduxjs/toolkit";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockFilters } from "../../test-utils";

// Mock the API module before importing anything else
vi.mock("@/store/api/mockApi", () => ({
   mockApi: {
      getTransactions: vi.fn().mockImplementation(async (page: number = 1) => {
         await new Promise((resolve) => setTimeout(resolve, 10));
         const itemsPerPage = 6;
         const startIndex = (page - 1) * itemsPerPage;
         const endIndex = startIndex + itemsPerPage;
         const transactions = [
            {
               id: "1",
               amount: 43644,
               transactionId: "TR_8401857902",
               type: "Transfer" as const,
               date: "Feb 12, 2022",
               time: "10:30AM",
               status: "Processed" as const,
            },
            {
               id: "2",
               amount: 35471,
               transactionId: "TR_8401857903",
               type: "Withdrawal" as const,
               date: "Feb 12, 2022",
               time: "10:30AM",
               status: "Failed" as const,
            },
            {
               id: "3",
               amount: 43644,
               transactionId: "TR_8401857904",
               type: "Deposit" as const,
               date: "Feb 12, 2022",
               time: "10:30AM",
               status: "Processed" as const,
            },
         ];

         return {
            success: true,
            data: {
               transactions: transactions.slice(startIndex, endIndex),
               pagination: {
                  currentPage: page,
                  totalPages: Math.ceil(transactions.length / itemsPerPage),
                  totalItems: transactions.length,
                  itemsPerPage,
               },
            },
         };
      }),
   },
}));

import transactionsReducer, {
   clearError,
   fetchTransactions,
   setFilters,
} from "@/store/slices/transactionsSlice";

// Helper to build a typed store for tests
const setupStore = () =>
   configureStore({
      reducer: {
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

type AppStore = ReturnType<typeof setupStore>;
type RootState = ReturnType<AppStore["getState"]>;

describe("transactionsSlice", () => {
   let store: AppStore;

   beforeEach(() => {
      store = setupStore();
      vi.clearAllMocks();
   });

   describe("initial state", () => {
      it("has correct initial state", () => {
         const state = store.getState().transactions;
         expect(state).toEqual({
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
         });
      });
   });

   describe("reducers", () => {
      it("setFilters updates filters correctly", () => {
         const newFilters = {
            account: "Sterling Bank",
            dateRange: {
               from: new Date(2023, 0, 1),
               to: new Date(2023, 0, 31),
            },
         };

         store.dispatch(setFilters(newFilters));
         const state = store.getState().transactions;

         expect(state.filters.account).toBe("Sterling Bank");
         expect(state.filters.dateRange.from).toEqual(new Date(2023, 0, 1));
         expect(state.filters.dateRange.to).toEqual(new Date(2023, 0, 31));
      });

      it("setFilters merges with existing filters", () => {
         // First set some filters
         store.dispatch(setFilters({ account: "Sterling Bank" }));

         // Then update only date range
         const dateRange = {
            from: new Date(2023, 0, 1),
            to: new Date(2023, 0, 31),
         };
         store.dispatch(setFilters({ dateRange }));

         const state = store.getState().transactions;
         expect(state.filters.account).toBe("Sterling Bank"); // Should remain
         expect(state.filters.dateRange).toEqual(dateRange); // Should be updated
      });

      it("clearError clears the error state", () => {
         // First set an error state
         const initialState = {
            data: null,
            isLoading: false,
            error: "Test error",
            filters: {
               dateRange: { from: null, to: null },
               account: "All Accounts",
            },
         };

         store = configureStore({
            reducer: { transactions: transactionsReducer },
            preloadedState: {
               transactions: initialState as RootState["transactions"],
            },
         }) as AppStore;

         store.dispatch(clearError());
         const state = store.getState().transactions;
         expect(state.error).toBeNull();
      });
   });

   describe("fetchTransactions async thunk", () => {
      it("handles pending state correctly", () => {
         store.dispatch(fetchTransactions({ page: 1, filters: mockFilters }));
         const state = store.getState().transactions;
         expect(state.isLoading).toBe(true);
         expect(state.error).toBeNull();
      });

      it("handles fulfilled state correctly", async () => {
         const action = await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         const state = store.getState().transactions;

         expect(action.type).toBe("transactions/fetchData/fulfilled");
         expect(state.isLoading).toBe(false);
         expect(state.error).toBeNull();
         expect(state.data).toBeTruthy();
         expect(state.data?.transactions).toHaveLength(3); // Mock API returns 3 items total
         expect(state.data?.pagination.currentPage).toBe(1);
      });

      it("handles rejected state correctly", async () => {
         const apiModule = await import("@/store/api/mockApi");
         const getTransactions = apiModule.mockApi
            .getTransactions as unknown as Mock;
         getTransactions.mockRejectedValueOnce(new Error("API Error"));

         const action = await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         const state = store.getState().transactions;

         expect(action.type).toBe("transactions/fetchData/rejected");
         expect(state.isLoading).toBe(false);
         expect(state.error).toBe("API Error");
         expect(state.data).toBeNull();
      });

      it("calls API with correct page parameter", async () => {
         const apiModule = await import("@/store/api/mockApi");
         const getTransactions = apiModule.mockApi
            .getTransactions as unknown as Mock;
         getTransactions.mockClear();

         await store.dispatch(
            fetchTransactions({ page: 2, filters: mockFilters })
         );

         expect(getTransactions).toHaveBeenCalledWith(2);
      });

      it("handles different page numbers correctly", async () => {
         // Test page 1
         await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         let state = store.getState().transactions;
         expect(state.data?.pagination.currentPage).toBe(1);

         // Test page 2
         await store.dispatch(
            fetchTransactions({ page: 2, filters: mockFilters })
         );
         state = store.getState().transactions;
         expect(state.data?.pagination.currentPage).toBe(2);
      });

      it("returns correct transaction data structure", async () => {
         await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         const state = store.getState().transactions;

         expect(state.data?.transactions[0]).toEqual({
            id: "1",
            amount: 43644,
            transactionId: "TR_8401857902",
            type: "Transfer",
            date: "Feb 12, 2022",
            time: "10:30AM",
            status: "Processed",
         });
      });

      it("returns correct pagination data structure", async () => {
         await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         const state = store.getState().transactions;

         expect(state.data?.pagination).toEqual({
            currentPage: 1,
            totalPages: 1, // Based on mock data length (3 items, 6 per page = 1 page)
            totalItems: 3,
            itemsPerPage: 6,
         });
      });
   });

   describe("error handling", () => {
      it("provides default error message when none is provided", async () => {
         const apiModule = await import("@/store/api/mockApi");
         const getTransactions = apiModule.mockApi
            .getTransactions as unknown as Mock;
         getTransactions.mockRejectedValueOnce(new Error());

         await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         const state = store.getState().transactions;

         expect(state.error).toBe("Failed to fetch transactions");
      });

      it("preserves custom error messages", async () => {
         const apiModule = await import("@/store/api/mockApi");
         const getTransactions = apiModule.mockApi
            .getTransactions as unknown as Mock;
         getTransactions.mockRejectedValueOnce(
            new Error("Custom error message")
         );

         await store.dispatch(
            fetchTransactions({ page: 1, filters: mockFilters })
         );
         const state = store.getState().transactions;

         expect(state.error).toBe("Custom error message");
      });
   });

   describe("filter handling", () => {
      it("handles partial filter updates", () => {
         store.dispatch(setFilters({ account: "Sterling Bank" }));
         let state = store.getState().transactions;
         expect(state.filters.account).toBe("Sterling Bank");
         expect(state.filters.dateRange.from).toBeNull(); // Should remain unchanged

         store.dispatch(
            setFilters({
               dateRange: {
                  from: new Date(2023, 0, 1),
                  to: new Date(2023, 0, 31),
               },
            })
         );
         state = store.getState().transactions;
         expect(state.filters.account).toBe("Sterling Bank"); // Should remain
         expect(state.filters.dateRange.from).toEqual(new Date(2023, 0, 1));
      });

      it("handles date range updates correctly", () => {
         const dateRange = {
            from: new Date(2023, 5, 1),
            to: new Date(2023, 5, 30),
         };

         store.dispatch(setFilters({ dateRange }));
         const state = store.getState().transactions;

         expect(state.filters.dateRange.from).toEqual(new Date(2023, 5, 1));
         expect(state.filters.dateRange.to).toEqual(new Date(2023, 5, 30));
      });
   });
});
