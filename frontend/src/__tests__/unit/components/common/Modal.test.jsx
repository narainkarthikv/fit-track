import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../../components/common/Modal';

describe('Modal component', () => {
  test('renders modal with title and children', () => {
    const handleCloseMock = vi.fn(); // Mock function to test handleClose

    render(
      <Modal show={true} title="Modal Title" handleClose={handleCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );

    // Check that the title is rendered
    expect(screen.getByText('Modal Title')).toBeInTheDocument();

    // Check that the children content is rendered
    expect(screen.getByText('Modal Content')).toBeInTheDocument();

    // Check that the "Close" button is rendered
    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();

    // Simulate clicking the "Close" button
    fireEvent.click(closeButton);

    // Verify handleClose was called
    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('does not render modal when show is false', () => {
    const handleCloseMock = vi.fn();

    render(
      <Modal show={false} title="Modal Title" handleClose={handleCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );

    // The modal content should not be present in the document
    expect(screen.queryByText('Modal Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls handleClose when clicking the close icon in the header', () => {
    const handleCloseMock = vi.fn();

    render(
      <Modal show={true} title="Modal Title" handleClose={handleCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );

    const closeIcon = screen.getByLabelText('Close'); // Bootstrap close button has aria-label="Close"
    fireEvent.click(closeIcon);

    expect(handleCloseMock).toHaveBeenCalled();
  });
  test('renders multiple children elements', () => {
    const handleCloseMock = vi.fn();

    render(
      <Modal show={true} title="Modal Title" handleClose={handleCloseMock}>
        <p>Child 1</p>
        <p>Child 2</p>
      </Modal>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
  test('calls handleClose when pressing Escape key', () => {
    const handleCloseMock = vi.fn();

    render(
      <Modal show={true} title="Modal Title" handleClose={handleCloseMock}>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
