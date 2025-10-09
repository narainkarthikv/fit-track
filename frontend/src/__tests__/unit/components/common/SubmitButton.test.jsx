import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitButton from '../../../../components/common/SubmitButton';

describe('SubmitButton component', () => {
  test('renders button with default text', () => {
    render(<SubmitButton isSubmitting={false} />);
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(screen.queryByTestId('submit-spinner')).not.toBeInTheDocument(); // spinner non visibile
  });

  test('renders button with custom text', () => {
    render(<SubmitButton isSubmitting={false} text="Submit Now" />);
    const button = screen.getByRole('button', { name: /submit now/i });
    expect(button).toBeInTheDocument();
  });

  test('renders spinner and disables button when submitting', () => {
    render(<SubmitButton isSubmitting={true} />);
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();

    // Controlla spinner tramite data-testid
    const spinner = screen.getByTestId('submit-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
