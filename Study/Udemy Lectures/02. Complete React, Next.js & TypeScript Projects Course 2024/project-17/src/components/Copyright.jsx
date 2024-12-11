import React from 'react';

export default function Copyright() {
  return (
    <p
      className="copyright"
      style={{
        fontFamily: 'Consolas',
        textAlign: 'center',
        color: 'purple',
        marginBottom: '5rem',
      }}
    >
      Made By{' '}
      <a
        href="https://www.github.com/starrykss"
        style={{
          color: 'rgba(128, 128, 128, 0.9)',
        }}
      >
        @starrykss
      </a>
    </p>
  );
}
