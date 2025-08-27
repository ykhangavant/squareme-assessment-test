import {
   ApiResponse,
   ChartData,
   DashboardData,
   Transaction,
   TransactionsData,
} from "@/types";

// Mock data
const mockChartData: ChartData[] = [
   { month: "Jan", value: 320000 },
   { month: "Feb", value: 450000 },
   { month: "Mar", value: 380000 },
   { month: "Apr", value: 280000 },
   { month: "May", value: 150000 },
   { month: "Jun", value: 180000 },
   { month: "Jul", value: 160000 },
   { month: "Aug", value: 170000 },
   { month: "Sep", value: 160000 },
   { month: "Oct", value: 180000 },
   { month: "Nov", value: 220000 },
   { month: "Dec", value: 0 },
];

const mockTransactions: Transaction[] = [
   {
      id: "1",
      amount: 43644,
      transactionId: "TR_8401857902",
      type: "Transfer",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Processed",
   },
   {
      id: "2",
      amount: 35471,
      transactionId: "TR_8401857903",
      type: "Withdrawal",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Failed",
   },
   {
      id: "3",
      amount: 43644,
      transactionId: "TR_8401857904",
      type: "Deposit",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Processed",
   },
   {
      id: "4",
      amount: 35471,
      transactionId: "TR_8401857905",
      type: "Request",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Failed",
   },
   {
      id: "5",
      amount: 43644,
      transactionId: "TR_8401857906",
      type: "Transfer",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Processed",
   },
   {
      id: "6",
      amount: 35471,
      transactionId: "TR_8401857907",
      type: "Transfer",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Failed",
   },
   {
      id: "7",
      amount: 38948,
      transactionId: "TR_8401857908",
      type: "Transfer",
      date: "Feb 12, 2022",
      time: "10:30AM",
      status: "Processed",
   },
   {
      id: "8",
      amount: 125000,
      transactionId: "TR_8401857909",
      type: "Transfer",
      date: "Feb 11, 2022",
      time: "2:15PM",
      status: "Processed",
   },
   {
      id: "9",
      amount: 67890,
      transactionId: "TR_8401857910",
      type: "Deposit",
      date: "Feb 11, 2022",
      time: "11:45AM",
      status: "Processed",
   },
   {
      id: "10",
      amount: 15000,
      transactionId: "TR_8401857911",
      type: "Withdrawal",
      date: "Feb 10, 2022",
      time: "9:20AM",
      status: "Failed",
   },
   {
      id: "11",
      amount: 89500,
      transactionId: "TR_8401857912",
      type: "Transfer",
      date: "Feb 10, 2022",
      time: "4:30PM",
      status: "Processed",
   },
   {
      id: "12",
      amount: 22300,
      transactionId: "TR_8401857913",
      type: "Request",
      date: "Feb 9, 2022",
      time: "1:10PM",
      status: "Processed",
   },
   {
      id: "13",
      amount: 156000,
      transactionId: "TR_8401857914",
      type: "Transfer",
      date: "Feb 9, 2022",
      time: "8:45AM",
      status: "Failed",
   },
   {
      id: "14",
      amount: 78900,
      transactionId: "TR_8401857915",
      type: "Deposit",
      date: "Feb 8, 2022",
      time: "3:25PM",
      status: "Processed",
   },
   {
      id: "15",
      amount: 45600,
      transactionId: "TR_8401857916",
      type: "Withdrawal",
      date: "Feb 8, 2022",
      time: "12:00PM",
      status: "Processed",
   },
   {
      id: "16",
      amount: 98000,
      transactionId: "TR_8401857917",
      type: "Transfer",
      date: "Feb 7, 2022",
      time: "5:15PM",
      status: "Failed",
   },
   {
      id: "17",
      amount: 34500,
      transactionId: "TR_8401857918",
      type: "Request",
      date: "Feb 7, 2022",
      time: "10:30AM",
      status: "Processed",
   },
   {
      id: "18",
      amount: 187000,
      transactionId: "TR_8401857919",
      type: "Transfer",
      date: "Feb 6, 2022",
      time: "7:20AM",
      status: "Processed",
   },
   {
      id: "19",
      amount: 56700,
      transactionId: "TR_8401857920",
      type: "Deposit",
      date: "Feb 5, 2022",
      time: "2:45PM",
      status: "Failed",
   },
   {
      id: "20",
      amount: 23400,
      transactionId: "TR_8401857921",
      type: "Withdrawal",
      date: "Feb 5, 2022",
      time: "11:15AM",
      status: "Processed",
   },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
   async getDashboardData(period: string): Promise<ApiResponse<DashboardData>> {
      await delay(300); // Simulate network delay

      // Generate different data based on period
      let chartData = mockChartData;
      let revenue = { current: 0, change: 0, period: "vs Last 7 days" };

      switch (period) {
         case "today":
            chartData = [{ month: "Today", value: 45000 }];
            revenue = { current: 45000, change: 12.5, period: "vs Yesterday" };
            break;
         case "last7days":
            chartData = mockChartData.slice(0, 7);
            revenue = {
               current: 1850000,
               change: -8.2,
               period: "vs Last 7 days",
            };
            break;
         case "last30days":
            chartData = mockChartData;
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
               accountDetails: {
                  bank: "STERLING BANK",
                  accountNumber: "8000000000",
                  businessName: "OGEDENGBE FRUITS STORE",
               },
            },
            chartData,
         },
      };
   },

   async getTransactions(
      page: number = 1
   ): Promise<ApiResponse<TransactionsData>> {
      await delay(300); // Simulate network delay

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
   },
};
