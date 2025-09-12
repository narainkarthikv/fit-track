import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaEnvelope, FaEye } from 'react-icons/fa';
import InputField from '../../../../components/common/InputField';

describe('InputField component', () => {
  test('renders input with correct props', () => {
    render(
      <InputField
        id="1"
        name="email"
        type="email"
        placeholder="write here"
        value="manuel@gmail.com"
        Icon={FaEnvelope}
      />
    );

    const input = screen.getByPlaceholderText('write here');

    expect(input.value).toBe('manuel@gmail.com');
    expect(input).toHaveAttribute('id', '1');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('type', 'email');

    // Controlla che l'icona sia renderizzata
    expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  });

  test('calls onChange when user types', async () => {
    const onChangeMock = vi.fn();
    render(
      <InputField
        id="2"
        name="email"
        type="email"
        placeholder="write here"
        value=""
        onChange={onChangeMock}
      />
    );

    const input = screen.getByPlaceholderText('write here');
    await userEvent.type(input, 'hello');

    expect(onChangeMock).toHaveBeenCalled();
    expect(input.value).toBe('hello');
  });

  test('calls onAppendIconClick when append icon is clicked', async () => {
    const onAppendClickMock = vi.fn();
    render(
      <InputField
        id="3"
        name="password"
        type="password"
        placeholder="password"
        value=""
        AppendIcon={FaEye}
        onAppendIconClick={onAppendClickMock}
      />
    );

    const appendIcon = screen.getByTestId('append-icon');
    await userEvent.click(appendIcon);

    expect(onAppendClickMock).toHaveBeenCalled();
  });
});
