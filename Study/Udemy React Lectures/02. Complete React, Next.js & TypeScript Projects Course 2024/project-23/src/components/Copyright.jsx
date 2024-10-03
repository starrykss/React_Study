import { useSelector } from 'react-redux';

export default function Copyright() {
  const theme = useSelector((state) => state.userState.theme);

  return (
    <p
      className="copyright"
      style={{
        fontFamily: 'Consolas',
        textAlign: 'center',
        color: { theme },
        marginBottom: '5rem',
      }}
    >
      Made By{' '}
      <a
        href="https://www.github.com/starrykss"
        style={{
          color:
            theme === 'dracula' ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)',
        }}
      >
        @starrykss
      </a>
    </p>
  );
}
