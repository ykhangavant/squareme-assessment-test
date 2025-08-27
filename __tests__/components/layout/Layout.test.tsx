import { Layout } from "@/components/layout/Layout";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test-utils";

describe("Layout", () => {
   it("renders without crashing", () => {
      renderWithProviders(
         <Layout>
            <div>Test Content</div>
         </Layout>
      );
      expect(screen.getByText("Test Content")).toBeInTheDocument();
   });

   it("renders the Header component", () => {
      renderWithProviders(
         <Layout>
            <div>Test Content</div>
         </Layout>
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
   });

   it("renders the Sidebar component", () => {
      renderWithProviders(
         <Layout>
            <div>Test Content</div>
         </Layout>
      );
      expect(screen.getByRole("navigation")).toBeInTheDocument();
   });

   it("renders children content in main area", () => {
      renderWithProviders(
         <Layout>
            <div data-testid="main-content">Test Content</div>
         </Layout>
      );
      expect(screen.getByTestId("main-content")).toBeInTheDocument();
   });

   it("has proper layout structure", () => {
      renderWithProviders(
         <Layout>
            <div>Test Content</div>
         </Layout>
      );

      // Check main container
      const mainContainer = screen
         .getByText("Test Content")
         .closest('div[class*="min-h-screen"]');
      expect(mainContainer).toHaveClass("min-h-screen", "bg-gray-50");

      // Check main content area
      const main = screen.getByRole("main");
      expect(main).toHaveClass("flex-1", "lg:ml-64", "py-6");

      // Check content wrapper
      const contentWrapper = screen
         .getByText("Test Content")
         .closest('div[class*="mx-auto"]');
      expect(contentWrapper).toHaveClass(
         "mx-auto",
         "max-w-7xl",
         "px-4",
         "sm:px-6",
         "lg:px-8"
      );
   });

   it("has responsive sidebar layout", () => {
      renderWithProviders(
         <Layout>
            <div>Test Content</div>
         </Layout>
      );

      // Check sidebar container has basic layout classes
      const sidebarContainer = screen.getByRole("navigation").parentElement;
      expect(sidebarContainer).toHaveClass("flex", "flex-col", "h-full");
   });

   it("has proper spacing for header", () => {
      renderWithProviders(
         <Layout>
            <div>Test Content</div>
         </Layout>
      );

      // Check that content area has top padding for fixed header
      const flexContainer = screen.getByRole("main").parentElement;
      expect(flexContainer).toHaveClass("flex", "pt-20");
   });

   it("accepts and renders different types of children", () => {
      renderWithProviders(
         <Layout>
            <div>
               <h1>Page Title</h1>
               <p>Page content</p>
               <button>Action Button</button>
            </div>
         </Layout>
      );

      expect(screen.getByText("Page Title")).toBeInTheDocument();
      expect(screen.getByText("Page content")).toBeInTheDocument();
      expect(screen.getByText("Action Button")).toBeInTheDocument();
   });
});
