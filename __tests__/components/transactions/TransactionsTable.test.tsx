import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
   mockPagination,
   mockTransactions,
   renderWithProviders,
} from "../../test-utils";

describe("TransactionsTable", () => {
   const mockProps = {
      transactions: mockTransactions,
      pagination: mockPagination,
      isLoading: false,
      onPageChange: vi.fn(),
   };

   beforeEach(() => {
      vi.clearAllMocks();
   });

   it("renders without crashing", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);
      expect(screen.getByRole("table")).toBeInTheDocument();
   });

   it("displays loading skeleton when isLoading is true", () => {
      renderWithProviders(
         <TransactionsTable {...mockProps} isLoading={true} />
      );
      // The TableSkeleton component doesn't have a test-id, so check for skeleton structure
      expect(document.querySelector(".fundr-card")).toBeInTheDocument();
   });

   it("displays table headers correctly", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      expect(screen.getByText("AMOUNT")).toBeInTheDocument();
      expect(screen.getByText("TRANSACTION ID")).toBeInTheDocument();
      expect(screen.getByText("TRANSACTION TYPE")).toBeInTheDocument();
      expect(screen.getByText("DATE")).toBeInTheDocument();
      expect(screen.getByText("TIME")).toBeInTheDocument();
      expect(screen.getByText("STATUS")).toBeInTheDocument();
   });

   it("displays transaction data correctly", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Check first transaction - use getAllByText since elements appear in both desktop and mobile views
      expect(screen.getAllByText("₦43,644")).toHaveLength(4); // 2 in desktop table, 2 in mobile cards
      expect(screen.getByText("TR_8401857902")).toBeInTheDocument();
      expect(screen.getByText("Transfer")).toBeInTheDocument();
      expect(screen.getAllByText("Feb 12, 2022")).toHaveLength(3); // All 3 transactions have same date
      expect(screen.getAllByText("10:30AM")).toHaveLength(3); // All 3 transactions have same time
   });

   it("displays status badges with correct styling", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      const processedBadges = screen.getAllByText("Processed");
      expect(processedBadges[0]).toHaveClass("bg-green-100", "text-green-800");

      const failedBadges = screen.getAllByText("Failed");
      expect(failedBadges[0]).toHaveClass("bg-red-100", "text-red-800");
   });

   it("formats currency correctly", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Check Nigerian Naira formatting - use getAllByText since amounts appear in both desktop and mobile views
      expect(screen.getAllByText("₦43,644")).toHaveLength(4); // 2 transactions with same amount, each in desktop and mobile
      expect(screen.getAllByText("₦35,471")).toHaveLength(2); // 1 transaction, in desktop and mobile
   });

   it("displays pagination when provided", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Check for pagination elements by looking for page numbers
      expect(screen.getByText("1")).toBeInTheDocument(); // Current page
      expect(screen.getByText("5")).toBeInTheDocument(); // Total pages

      // Check for pagination info text
      const paginationText = screen.getByText(/showing/i);
      expect(paginationText).toBeInTheDocument();
   });

   it("displays pagination buttons", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Look for buttons with chevron icons instead of aria-labels
      const buttons = screen.getAllByRole("button");
      const paginationButtons = buttons.filter(
         (button) =>
            button.querySelector("svg") && button.className.includes("h-8 w-8")
      );
      expect(paginationButtons.length).toBeGreaterThanOrEqual(2); // At least prev/next buttons
   });

   it("disables previous button on first page", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Find the first pagination button (should be previous)
      const buttons = screen.getAllByRole("button");
      const paginationButtons = buttons.filter(
         (button) =>
            button.querySelector("svg") && button.className.includes("h-8 w-8")
      );
      const prevButton = paginationButtons[0];
      expect(prevButton).toBeDisabled();
   });

   it("enables next button when not on last page", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Find the last pagination button (should be next)
      const buttons = screen.getAllByRole("button");
      const paginationButtons = buttons.filter(
         (button) =>
            button.querySelector("svg") && button.className.includes("h-8 w-8")
      );
      const nextButton = paginationButtons[paginationButtons.length - 1];
      expect(nextButton).not.toBeDisabled();
   });

   it("disables next button on last page", () => {
      const lastPagePagination = {
         ...mockPagination,
         currentPage: 5,
      };

      renderWithProviders(
         <TransactionsTable {...mockProps} pagination={lastPagePagination} />
      );

      // Find the last pagination button (should be next)
      const buttons = screen.getAllByRole("button");
      const paginationButtons = buttons.filter(
         (button) =>
            button.querySelector("svg") && button.className.includes("h-8 w-8")
      );
      const nextButton = paginationButtons[paginationButtons.length - 1];
      expect(nextButton).toBeDisabled();
   });

   it("calls onPageChange when pagination buttons are clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Find the last pagination button (should be next)
      const buttons = screen.getAllByRole("button");
      const paginationButtons = buttons.filter(
         (button) =>
            button.querySelector("svg") && button.className.includes("h-8 w-8")
      );
      const nextButton = paginationButtons[paginationButtons.length - 1];
      await user.click(nextButton);

      expect(mockProps.onPageChange).toHaveBeenCalledWith(2);
   });

   it("displays checkboxes for row selection", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      const checkboxes = screen.getAllByRole("checkbox");
      // One in header + one for each transaction row
      expect(checkboxes).toHaveLength(mockTransactions.length + 1);
   });

   it("handles empty transactions array", () => {
      renderWithProviders(
         <TransactionsTable {...mockProps} transactions={[]} />
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      // Should still show headers but no data rows
      expect(screen.getByText("AMOUNT")).toBeInTheDocument();
   });

   it("handles missing pagination gracefully", () => {
      renderWithProviders(
         <TransactionsTable {...mockProps} pagination={undefined} />
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      // Should not show pagination controls
      expect(screen.queryByText("Page")).not.toBeInTheDocument();
   });

   it("displays mobile card layout on small screens", () => {
      renderWithProviders(<TransactionsTable {...mockProps} />);

      // Mobile cards should be present (hidden on desktop)
      const mobileContainer = document.querySelector(".md\\:hidden");
      expect(mobileContainer).toBeInTheDocument();

      // Check that mobile cards contain transaction data
      const allAmountElements = screen.getAllByText("₦43,644");
      expect(allAmountElements.length).toBeGreaterThan(1); // Should appear in both desktop and mobile
   });
});
