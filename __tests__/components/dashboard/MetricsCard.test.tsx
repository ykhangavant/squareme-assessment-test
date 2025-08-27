import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test-utils";

describe("MetricsCard", () => {
   const mockProps = {
      bank: "STERLING BANK",
      accountNumber: "8000000000",
      businessName: "OGEDENGBE FRUITS STORE",
   };

   beforeEach(() => {
      // Clear clipboard mock before each test
      vi.clearAllMocks();
   });

   afterEach(() => {
      vi.clearAllTimers();
   });

   it("renders without crashing", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);
      expect(screen.getByText("ACCOUNT DETAILS")).toBeInTheDocument();
   });

   it("displays bank name", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);
      expect(screen.getByText("STERLING BANK")).toBeInTheDocument();
   });

   it("displays account number", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);
      expect(screen.getByText("8000000000")).toBeInTheDocument();
   });

   it("displays business name", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);
      expect(screen.getByText("OGEDENGBE FRUITS STORE")).toBeInTheDocument();
   });

   it("displays copy button with correct initial text", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);
      const copyButton = screen.getByRole("button", { name: /copy/i });
      expect(copyButton).toBeInTheDocument();
      expect(screen.getByText("Copy")).toBeInTheDocument();
   });

   it("copies account number to clipboard when copy button is clicked", async () => {
      const user = userEvent.setup();
      const writeTextSpy = vi.spyOn(navigator.clipboard, "writeText");
      renderWithProviders(<MetricsCard {...mockProps} />);

      const copyButton = screen.getByRole("button", { name: /copy/i });
      await user.click(copyButton);

      expect(writeTextSpy).toHaveBeenCalledWith("8000000000");
   });

   it('shows "Copied" text after clicking copy button', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MetricsCard {...mockProps} />);

      const copyButton = screen.getByRole("button", { name: /copy/i });
      await user.click(copyButton);

      expect(screen.getByText("Copied")).toBeInTheDocument();
      expect(screen.queryByText("Copy")).not.toBeInTheDocument();
   });

   it('reverts to "Copy" text after 2 seconds', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MetricsCard {...mockProps} />);

      const copyButton = screen.getByRole("button", { name: /copy/i });
      await user.click(copyButton);

      expect(screen.getByText("Copied")).toBeInTheDocument();

      // Wait for the timeout to complete
      await waitFor(
         () => {
            expect(screen.getByText("Copy")).toBeInTheDocument();
            expect(screen.queryByText("Copied")).not.toBeInTheDocument();
         },
         { timeout: 3000 }
      );
   });

   it("has proper styling classes", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);

      const card = screen.getByText("ACCOUNT DETAILS").closest(".fundr-card");
      expect(card).toHaveClass("fundr-card", "max-w-md", "p-0");

      const copyButton = screen.getByRole("button", { name: /copy/i });
      expect(copyButton).toHaveClass(
         "bg-purple-200",
         "text-purple-500",
         "border-purple-200",
         "hover:bg-purple-100",
         "hover:text-purple-500"
      );
   });

   it("displays copy icon in button", () => {
      renderWithProviders(<MetricsCard {...mockProps} />);

      const copyButton = screen.getByRole("button", { name: /copy/i });
      const icon = copyButton.querySelector("svg");
      expect(icon).toBeInTheDocument();
   });

   it("handles different account numbers correctly", () => {
      const customProps = {
         ...mockProps,
         accountNumber: "1234567890",
      };

      renderWithProviders(<MetricsCard {...customProps} />);
      expect(screen.getByText("1234567890")).toBeInTheDocument();
   });

   it("handles different bank names correctly", () => {
      const customProps = {
         ...mockProps,
         bank: "FIRST BANK",
      };

      renderWithProviders(<MetricsCard {...customProps} />);
      expect(screen.getByText("FIRST BANK")).toBeInTheDocument();
   });

   it("handles different business names correctly", () => {
      const customProps = {
         ...mockProps,
         businessName: "TEST BUSINESS STORE",
      };

      renderWithProviders(<MetricsCard {...customProps} />);
      expect(screen.getByText("TEST BUSINESS STORE")).toBeInTheDocument();
   });
});
