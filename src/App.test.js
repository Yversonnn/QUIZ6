import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

test('redirects unauthenticated users to sign in page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getByRole('heading', { name: /sign in/i });
  expect(headingElement).toBeInTheDocument();
});
