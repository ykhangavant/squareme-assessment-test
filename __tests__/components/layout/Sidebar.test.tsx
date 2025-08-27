import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Sidebar } from '@/components/layout/Sidebar';
import { renderWithProviders } from '../../test-utils';

// Mock usePathname to control the active route
const mockUsePathname = vi.fn();
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    usePathname: () => mockUsePathname(),
  };
});

describe('Sidebar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders without crashing', () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays all navigation items', () => {
    renderWithProviders(<Sidebar />);
    
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /accounts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /transfers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /transactions/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    renderWithProviders(<Sidebar />);
    
    expect(screen.getByRole('link', { name: /get started/i })).toHaveAttribute('href', '/get-started');
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /accounts/i })).toHaveAttribute('href', '/accounts');
    expect(screen.getByRole('link', { name: /transfers/i })).toHaveAttribute('href', '/transfers');
    expect(screen.getByRole('link', { name: /transactions/i })).toHaveAttribute('href', '/transactions');
    expect(screen.getByRole('link', { name: /settings/i })).toHaveAttribute('href', '/settings');
  });

  it('highlights the active navigation item', () => {
    mockUsePathname.mockReturnValue('/');
    renderWithProviders(<Sidebar />);
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveClass('bg-blue-600', 'text-gray-50');
  });

  it('applies hover styles to inactive navigation items', () => {
    mockUsePathname.mockReturnValue('/');
    renderWithProviders(<Sidebar />);
    
    const accountsLink = screen.getByRole('link', { name: /accounts/i });
    expect(accountsLink).toHaveClass('text-blue-900', 'hover:bg-gray-50', 'hover:text-gray-900');
  });

  it('displays icons for each navigation item', () => {
    renderWithProviders(<Sidebar />);
    
    // Check that each link contains an icon (svg element)
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('changes active state when pathname changes', () => {
    mockUsePathname.mockReturnValue('/transactions');
    renderWithProviders(<Sidebar />);
    
    const transactionsLink = screen.getByRole('link', { name: /transactions/i });
    expect(transactionsLink).toHaveClass('bg-blue-600', 'text-gray-50');
    
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).not.toHaveClass('bg-blue-600', 'text-gray-50');
  });

  it('has proper layout structure', () => {
    renderWithProviders(<Sidebar />);
    
    const container = screen.getByRole('navigation').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'h-full', 'bg-white', 'border-r', 'border-gray-200');
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex-1', 'px-0', 'py-4', 'space-y-1');
  });
});
