// Dashboard Types
export interface DashboardMetrics {
  revenue: {
    current: number;
    change: number;
    period: string;
  };
  totalValue: number;
  accountDetails: {
    bank: string;
    accountNumber: string;
    businessName: string;
  };
}

export interface ChartData {
  month: string;
  value: number;
}

// Transaction Types
export interface Transaction {
  id: string;
  amount: number;
  transactionId: string;
  type: 'Transfer' | 'Withdrawal' | 'Deposit' | 'Request';
  date: string;
  time: string;
  status: 'Processed' | 'Failed';
}

export interface TransactionFilters {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  account: string;
  status?: string;
  type?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  chartData: ChartData[];
}

export interface TransactionsData {
  transactions: Transaction[];
  pagination: PaginationInfo;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
}
