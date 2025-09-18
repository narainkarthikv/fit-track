import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderSection from '../../../../components/common/HeaderSection'
import { FaDumbbell } from 'react-icons/fa';

describe('HeaderSection component', () => {
  test('renders the title', () => {
    render(<HeaderSection title='Hello' icon={<FaDumbbell />} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  test('renders the icon', () => {
    render(<HeaderSection title='Hello' icon={<FaDumbbell />} />)
    expect(screen.getByTestId('header-section-icon')).toBeInTheDocument()
  })
})
