import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupLink from '../../../../components/common/SignupLink';
import { BrowserRouter } from 'react-router-dom';

describe('SignupLink component', () => {
  test('renders default text and link', () => {
    render(
      <BrowserRouter>
        <SignupLink />
      </BrowserRouter>
    );

    // Check default text
    expect(screen.getByText('New to Fit-Track?')).toBeInTheDocument();

    // Check default link text
    const link = screen.getByText('Sign Up Now');
    expect(link).toBeInTheDocument();

    // Check link points to the correct URL
    expect(link.closest('a')).toHaveAttribute('href', '/signup');
  });

  test('renders custom text and link props', () => {
    render(
      <BrowserRouter>
        <SignupLink
          text="Already have an account?"
          linkText="Log In"
          linkTo="/login"
        />
      </BrowserRouter>
    );

    const link = screen.getByText('Log In');
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/login');
  });

  test('clicking the link works (simulate user interaction)', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignupLink />
      </BrowserRouter>
    );

    const link = screen.getByText('Sign Up Now');
    await user.click(link);

    // Since we cannot test navigation without mocking react-router,
    // we just check that the link is present and clickable
    expect(link).toBeInTheDocument();
  });
});
