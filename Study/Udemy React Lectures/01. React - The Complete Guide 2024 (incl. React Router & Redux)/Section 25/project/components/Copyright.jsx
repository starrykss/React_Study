import React from 'react';

export default function Copyright() {
  return (
    <p
      className="copyright"
      style={{
        fontFamily: 'Consolas',
        marginTop: '1rem',
        textAlign: 'center',
        color: 'coral',
        paddingTop: '50px',
      }}
    >
      Made By{' '}
      <a
        href="https://www.github.com/starrykss"
        style={{
          color: 'rgba(200, 200, 200, 0.9)',
        }}
      >
        @starrykss
      </a>
    </p>
  );
}
