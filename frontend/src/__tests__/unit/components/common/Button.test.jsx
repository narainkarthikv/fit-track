import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../../components/common/Button';

describe('Button component', () => {
  test('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const btn = screen.getByText('Click me');
    fireEvent.click(btn);
    
    expect(handleClick).toHaveBeenCalled();
  });

  test('applies variant prop', () => {
    render(<Button variant="success">Click me</Button>);
    const btn = screen.getByText('Click me');
    expect(btn).toHaveClass('btn-success'); // react-bootstrap 
  });
});
