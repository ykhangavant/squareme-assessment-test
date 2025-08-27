import { vi } from "vitest";
import { mockDashboardData, mockTransactions } from "../test-utils";

// Mock the API module
const mockApi = {
   getDashboardData: vi.fn().mockImplementation(async (period: string) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      let chartData = mockDashboardData.chartData;
      let revenue = { current: 0, change: 0, period: "vs Last 7 days" };

      switch (period) {
         case "today":
            chartData = [{ month: "Today", value: 45000 }];
            revenue = { current: 45000, change: 12.5, period: "vs Yesterday" };
            break;
         case "last7days":
            chartData = mockDashboardData.chartData.slice(0, 7);
            revenue = {
               current: 1850000,
               change: -8.2,
               period: "vs Last 7 days",
            };
            break;
         case "last30days":
            chartData = mockDashboardData.chartData;
            revenue = {
               current: 2450000,
               change: 15.3,
               period: "vs Last 30 days",
            };
            break;
      }

      return {
         success: true,
         data: {
            metrics: {
               revenue,
               totalValue: revenue.current,
               accountDetails: mockDashboardData.metrics.accountDetails,
            },
            chartData,
         },
      };
   }),

   getTransactions: vi.fn().mockImplementation(async (page: number = 1) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      return {
         success: true,
         data: {
            transactions: mockTransactions.slice(startIndex, endIndex),
            pagination: {
               currentPage: page,
               totalPages: Math.ceil(mockTransactions.length / itemsPerPage),
               totalItems: mockTransactions.length,
               itemsPerPage,
            },
         },
      };
   }),
};

// Mock the entire API module
vi.mock("@/store/api/mockApi", () => ({
   mockApi,
}));

// Also export for direct import in tests
export { mockApi };
