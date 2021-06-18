import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

describe('<Home />', () => {
  const handlers = [
    rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'title1',
            body: 'body1',
            url: 'img1.jpg',
          },
          {
            userId: 2,
            id: 2,
            title: 'title2',
            body: 'body2',
            url: 'img2.jpg',
          },
          {
            userId: 3,
            id: 3,
            title: 'title3',
            body: 'body3',
            url: 'img3.jpg',
          },
        ]),
      );
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nothing was found in our database.');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nothing was found in our database.');

    expect.assertions(12);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4 4' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: '' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();

    userEvent.type(search, 'blablabla');
    expect(screen.getByText('Nothing was found in our database.')).toBeInTheDocument();
  });

  it('should load more posts when button "Load more posts" is clicked', async () => {
    render(<Home />);
    const fn = jest.fn();
    const noMorePosts = screen.getByText('Nothing was found in our database.');

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
