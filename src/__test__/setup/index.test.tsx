import React from 'react';
import { MOCK_TASKS } from '@/mocks';
import { TodoQuery } from '@/services/apollo/adapters/todos.adapter';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Home from '../../pages';

const mocks = [
  {
    request: {
      query: TodoQuery,
    },
    result: () => {
      return { data: { getTodos: MOCK_TASKS } };
    },
  },
];

test('Home page', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    </QueryClientProvider>,
  );

  expect(screen.getByText('title')).toBeDefined();
});
