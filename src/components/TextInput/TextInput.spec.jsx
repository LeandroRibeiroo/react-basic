const { render, screen } = require('@testing-library/react');
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a "value" of searchValue', () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={'test'} />);
    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test');
  });

  it('should call "handleChange" function on each key pressed', () => {
    const fn = jest.fn();

    const value = 'this is the value';
    render(<TextInput handleChange={fn} searchValue={value} />);
    const input = screen.getByPlaceholderText(/type your search/i);

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toBeCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();

    const { container } = render(<TextInput handleChange={fn} searchValue={'test'} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
