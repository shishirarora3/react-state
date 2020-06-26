import React from 'react';
import { render } from '@testing-library/react';
import AppWithProps from './AppWithProps';

test('renders learn react link', () => {
  const { getByText } = render(<AppWithProps />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
