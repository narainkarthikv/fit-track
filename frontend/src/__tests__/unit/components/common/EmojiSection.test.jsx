import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmojiSection from '../../../../components/common/EmojiSection';

describe('EmojiSection component', () => {
  test('renders the emoji text', () => {
    render(<EmojiSection emoji="💪" />);
    
    // Check the emoji 
    expect(screen.getByText('Feeling 💪 today?')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = vi.fn(); // func for test 
    render(<EmojiSection emoji="🏋️‍♀️" onClick={handleClick} />);
    
    const div = screen.getByText('Feeling 🏋️‍♀️ today?').parentElement; // div principale
    fireEvent.click(div); // click simulation
    
    expect(handleClick).toHaveBeenCalledTimes(1); // verifica che sia stato chiamato
  });
});
