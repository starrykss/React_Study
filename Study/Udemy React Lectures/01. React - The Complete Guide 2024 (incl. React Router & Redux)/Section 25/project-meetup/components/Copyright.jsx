import React from 'react';

export default function Copyright() {
  return (
    <p
      className="copyright"
      style={{
        fontFamily: 'Consolas',
        marginTop: '1rem',
        textAlign: 'center',
        color: 'darkred',
        paddingTop: '50px',
      }}
    >
      Made By{' '}
      <a
        href="https://www.github.com/starrykss"
        style={{
          color: 'rgba(120, 120, 120, 0.9)',
        }}
      >
        @starrykss
      </a>
    </p>
  );
}
