import { Header } from "@/components/layout/Header";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test-utils";

describe("Header", () => {
   it("renders without crashing", () => {
      renderWithProviders(<Header />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
   });

   it("displays the logo", () => {
      renderWithProviders(<Header />);
      const logos = screen.getAllByAltText("FundR");
      expect(logos).toHaveLength(2); // One for desktop, one for mobile
   });

   it("displays the mobile menu button on mobile", () => {
      renderWithProviders(<Header />);
      const menuButton = screen.getByRole("button", {
         name: /toggle navigation menu/i,
      });
      expect(menuButton).toBeInTheDocument();
   });

   it("displays the notifications button", () => {
      renderWithProviders(<Header />);
      const notificationButton = screen.getByRole("button", {
         name: /view notifications/i,
      });
      expect(notificationButton).toBeInTheDocument();
   });

   it("displays the user avatar", () => {
      renderWithProviders(<Header />);
      const avatar = screen.getByRole("button", { name: /user menu/i });
      expect(avatar).toBeInTheDocument();
      expect(screen.getByText("GA")).toBeInTheDocument(); // Avatar fallback text
   });

   it("opens mobile sidebar when menu button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole("button", {
         name: /toggle navigation menu/i,
      });
      await user.click(menuButton);

      // Check if the sheet content is opened (mobile sidebar)
      expect(screen.getByRole("dialog")).toBeInTheDocument();
   });

   it("has proper accessibility attributes", () => {
      renderWithProviders(<Header />);

      const menuButton = screen.getByRole("button", {
         name: /toggle navigation menu/i,
      });
      expect(menuButton).toHaveAttribute("aria-expanded");

      const notificationButton = screen.getByRole("button", {
         name: /view notifications/i,
      });
      expect(notificationButton).toHaveAttribute(
         "aria-label",
         "View notifications"
      );

      const avatar = screen.getByRole("button", { name: /user menu/i });
      expect(avatar).toHaveAttribute("aria-label", "User menu");
      expect(avatar).toHaveAttribute("tabIndex", "0");
   });

   it("has fixed positioning and proper z-index", () => {
      renderWithProviders(<Header />);
      const header = screen.getByRole("banner");
      expect(header).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-50");
   });
});
