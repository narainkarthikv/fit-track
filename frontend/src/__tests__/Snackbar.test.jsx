import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Snackbar from '../components/common/Snackbar';

describe('Snackbar component', () => {
  test('renders success message', () => {
    render(<Snackbar show={true} message="Success!" type="success" onClose={() => {}} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  test('renders failure message', () => {
    render(<Snackbar show={true} message="Failed!" type="failure" onClose={() => {}} />);
    expect(screen.getByText('Failed!')).toBeInTheDocument();
  });
});


