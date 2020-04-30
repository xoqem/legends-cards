import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders logo', () => {
  const { getByAltText } = render(<App />);
  const logoElement = getByAltText(/logo/i);
  expect(logoElement).toBeInTheDocument();
});
