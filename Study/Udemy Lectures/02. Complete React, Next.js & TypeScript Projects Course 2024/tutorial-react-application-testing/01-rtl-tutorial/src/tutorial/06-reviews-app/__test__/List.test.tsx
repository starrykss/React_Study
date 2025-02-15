import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import List from '../List';
import { Review } from '../Sandbox';

// Mock data is used to simulate real data that would typically come from an API or user input
// This allows us to test our components in isolation without depending on external services
const mockReviews: Review[] = [
  {
    email: 'test@example.com',
    rating: '4',
    text: 'Great product!',
  },
  {
    email: 'user@example.com',
    rating: '5',
    text: 'Excellent service',
  },
];

// show beforeEach example with props
describe('List Component', () => {
  test('renders heading', () => {
    render(<List reviews={mockReviews} />);
    expect(
      screen.getByRole('heading', { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  test('displays "No reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });

  test('renders reviews correctly when provided', () => {
    render(<List reviews={mockReviews} />);

    // Check if both reviews are rendered
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();

      // Check if stars are rendered
      const stars = '⭐'.repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
  // ALTERNATIVE : show how to test with articles in the DOM
});
