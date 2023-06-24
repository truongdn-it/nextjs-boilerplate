import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Home from '../pages';

test('Home page', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );

  expect(screen.getByText('title')).toBeDefined();
});
