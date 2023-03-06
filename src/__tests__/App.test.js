import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';

test('renders learn react link', async () => {
  render(<App />);
  await waitFor(() => {
    const containerElement = screen.getByTestId("repo-container");
    expect(containerElement).toBeInTheDocument();
  });
});
