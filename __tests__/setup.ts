import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
   useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
   }),
   usePathname: () => "/",
   useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
   default: ({ src, alt, ...props }: any) => {
      return React.createElement("img", { src, alt, ...props });
   },
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
   default: ({ children, href, ...props }: any) => {
      return React.createElement("a", { href, ...props }, children);
   },
}));

// Mock clipboard API
Object.assign(navigator, {
   clipboard: {
      writeText: vi.fn(() => Promise.resolve()),
      readText: vi.fn(() => Promise.resolve("")),
   },
});

// Mock window.matchMedia for responsive components
Object.defineProperty(window, "matchMedia", {
   writable: true,
   value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
   })),
});

// Mock hasPointerCapture for Radix UI components
Object.defineProperty(Element.prototype, "hasPointerCapture", {
   writable: true,
   value: vi.fn().mockReturnValue(false),
});

// Mock setPointerCapture for Radix UI components
Object.defineProperty(Element.prototype, "setPointerCapture", {
   writable: true,
   value: vi.fn(),
});

// Mock releasePointerCapture for Radix UI components
Object.defineProperty(Element.prototype, "releasePointerCapture", {
   writable: true,
   value: vi.fn(),
});

// Mock scrollIntoView for Radix UI components
Object.defineProperty(Element.prototype, "scrollIntoView", {
   writable: true,
   value: vi.fn(),
});

// Mock ResizeObserver for chart components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
   observe: vi.fn(),
   unobserve: vi.fn(),
   disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
   observe: vi.fn(),
   unobserve: vi.fn(),
   disconnect: vi.fn(),
}));
