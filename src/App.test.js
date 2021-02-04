import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App', () => {
    render(<App />);
  });

  test('renders Avatar', () => {
    render(<App />);
    const imgElement = screen.getByAltText(/User avatar/i);
    const userName = screen.getByTestId('userName');

    expect(imgElement).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userName.textContent).toBe('Dasha Kavalenka');
  });

  test('renders initial rewards', () => {
    render(<App />);
    const myRewards = screen.getByTestId('my-rewards');
    const giveRewards = screen.getByTestId('give-rewards');

    expect(myRewards).toBeInTheDocument();
    expect(giveRewards).toBeInTheDocument();
  });

  test('renders rewards tabs', () => {
    render(<App />);
    const feedTab = screen.getByTestId('feed-tab');
    const myRewardsTab = screen.getByTestId('my-rewards-tab');

    expect(feedTab).toBeInTheDocument();
    expect(feedTab.textContent).toBe('Feed');
    expect(myRewardsTab).toBeInTheDocument();
    expect(myRewardsTab.textContent).toBe('My rewards');
  });
});
