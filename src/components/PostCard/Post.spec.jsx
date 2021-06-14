const { render, screen } = require('@testing-library/react');
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;
describe('<PostCard /.', () => {
  it('should render "PostCard" correctly', () => {
    render(<PostCard {...props} />);
    expect(screen.getByRole('img', { name: 'Title 1' })).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: /Title 1/i })).toBeInTheDocument();
    expect(screen.getByText('Body 1')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
