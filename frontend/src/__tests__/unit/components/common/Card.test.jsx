import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../../../components/common/Card';

describe('Card component', () => {
  test('renders Title, Content and Children', () => {
    render(
      <Card title="Hello" text="World">
        Dev = Manuel Crispino {/* test children */}
      </Card>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(screen.getByText('Dev = Manuel Crispino')).toBeInTheDocument();
  });
});
