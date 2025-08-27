import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import { ReduxProvider } from '@/components/common/ReduxProvider';
import { RootState } from '@/store';

// Test component that uses Redux
function TestComponent() {
  const dashboardState = useSelector((state: RootState) => state.dashboard);
  const transactionsState = useSelector((state: RootState) => state.transactions);
  
  return (
    <div>
      <div data-testid="dashboard-loading">{dashboardState.isLoading.toString()}</div>
      <div data-testid="dashboard-period">{dashboardState.selectedPeriod}</div>
      <div data-testid="transactions-loading">{transactionsState.isLoading.toString()}</div>
      <div data-testid="transactions-account">{transactionsState.filters.account}</div>
    </div>
  );
}

describe('ReduxProvider', () => {
  it('renders without crashing', () => {
    render(
      <ReduxProvider>
        <div>Test Content</div>
      </ReduxProvider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('provides Redux store to child components', () => {
    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    // Check that the store is accessible and has initial state
    expect(screen.getByTestId('dashboard-loading')).toHaveTextContent('false');
    expect(screen.getByTestId('dashboard-period')).toHaveTextContent('last7days');
    expect(screen.getByTestId('transactions-loading')).toHaveTextContent('false');
    expect(screen.getByTestId('transactions-account')).toHaveTextContent('All Accounts');
  });

  it('allows child components to access dashboard state', () => {
    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByTestId('dashboard-loading')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-period')).toBeInTheDocument();
  });

  it('allows child components to access transactions state', () => {
    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByTestId('transactions-loading')).toBeInTheDocument();
    expect(screen.getByTestId('transactions-account')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <ReduxProvider>
        <div>First Child</div>
        <div>Second Child</div>
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-loading')).toBeInTheDocument();
  });

  it('provides the same store instance to all children', () => {
    function FirstChild() {
      const state = useSelector((state: RootState) => state.dashboard.selectedPeriod);
      return <div data-testid="first-child">{state}</div>;
    }

    function SecondChild() {
      const state = useSelector((state: RootState) => state.dashboard.selectedPeriod);
      return <div data-testid="second-child">{state}</div>;
    }

    render(
      <ReduxProvider>
        <FirstChild />
        <SecondChild />
      </ReduxProvider>
    );
    
    expect(screen.getByTestId('first-child')).toHaveTextContent('last7days');
    expect(screen.getByTestId('second-child')).toHaveTextContent('last7days');
  });

  it('handles nested components correctly', () => {
    function NestedComponent() {
      const state = useSelector((state: RootState) => state.transactions.filters.account);
      return <div data-testid="nested">{state}</div>;
    }

    function ParentComponent() {
      return (
        <div>
          <span>Parent</span>
          <NestedComponent />
        </div>
      );
    }

    render(
      <ReduxProvider>
        <ParentComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByTestId('nested')).toHaveTextContent('All Accounts');
  });

  it('maintains store state across re-renders', () => {
    const { rerender } = render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('dashboard-period')).toHaveTextContent('last7days');
    
    // Re-render with same content
    rerender(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    // State should remain the same
    expect(screen.getByTestId('dashboard-period')).toHaveTextContent('last7days');
  });

  it('works with components that do not use Redux', () => {
    function NonReduxComponent() {
      return <div data-testid="non-redux">No Redux here</div>;
    }

    render(
      <ReduxProvider>
        <NonReduxComponent />
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByTestId('non-redux')).toHaveTextContent('No Redux here');
    expect(screen.getByTestId('dashboard-loading')).toHaveTextContent('false');
  });
});
