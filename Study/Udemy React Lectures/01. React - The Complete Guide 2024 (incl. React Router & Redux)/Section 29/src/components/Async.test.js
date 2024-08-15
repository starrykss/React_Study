import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  // 테스트
  test('renders posts if request succeeds', async () => {
    // mock 함수 생성
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });

    // Arrange
    render(<Async />);

    // Act
    // getAllByRole는 렌더링 즉시 테스트를 수행한다.
    // findAllByRole은 Promise 객체를 반환하고, 데이터가 전부 fetch 되면 테스트를 수행한다.
    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0); // 전부 불러와졌는지 체크

    // Assert
  });
});
