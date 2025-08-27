import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import dashboardReducer from '@/store/slices/dashboardSlice';
import transactionsReducer from '@/store/slices/transactionsSlice';
import { RootState } from '@/store';

// Create a test store factory
export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      dashboard: dashboardReducer,
      transactions: transactionsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'transactions/setFilters'],
          ignoredActionsPaths: [
            'meta.arg',
            'payload.timestamp',
            'payload.dateRange.from',
            'payload.dateRange.to',
          ],
          ignoredPaths: [
            'transactions.filters.dateRange.from',
            'transactions.filters.dateRange.to',
          ],
        },
      }),
  });
}

// Custom render function with Redux provider
interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof createTestStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock data for tests
export const mockDashboardData = {
  metrics: {
    revenue: {
      current: 1850000,
      change: -8.2,
      period: 'vs Last 7 days',
    },
    totalValue: 1850000,
    accountDetails: {
      bank: 'STERLING BANK',
      accountNumber: '8000000000',
      businessName: 'OGEDENGBE FRUITS STORE',
    },
  },
  chartData: [
    { month: 'Jan', value: 320000 },
    { month: 'Feb', value: 450000 },
    { month: 'Mar', value: 380000 },
    { month: 'Apr', value: 280000 },
    { month: 'May', value: 150000 },
    { month: 'Jun', value: 180000 },
    { month: 'Jul', value: 160000 },
  ],
};

export const mockTransactions = [
  {
    id: '1',
    amount: 43644,
    transactionId: 'TR_8401857902',
    type: 'Transfer' as const,
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Processed' as const,
  },
  {
    id: '2',
    amount: 35471,
    transactionId: 'TR_8401857903',
    type: 'Withdrawal' as const,
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Failed' as const,
  },
  {
    id: '3',
    amount: 43644,
    transactionId: 'TR_8401857904',
    type: 'Deposit' as const,
    date: 'Feb 12, 2022',
    time: '10:30AM',
    status: 'Processed' as const,
  },
];

export const mockPagination = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 30,
  itemsPerPage: 6,
};

export const mockTransactionsData = {
  transactions: mockTransactions,
  pagination: mockPagination,
};

export const mockFilters = {
  dateRange: {
    from: new Date(2023, 5, 6),
    to: new Date(2023, 5, 15),
  },
  account: 'All Accounts',
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
