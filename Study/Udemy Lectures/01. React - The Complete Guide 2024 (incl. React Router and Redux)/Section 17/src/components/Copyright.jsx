import React from "react";

export default function Copyright() {
  return (
    <>
      <style>
        {`
          .copyright {
            font-family: 'Consolas';
            margin-top: 1rem;
            text-align: center;
            color: darkgreen;
          }

          .copyright > a {
            color: rgba(20, 20, 20, 0.9);
          }
        `}
      </style>
      <p className="copyright">
        Made By <a href="https://www.github.io/starrykss">@starrykss</a>
      </p>
    </>
  );
}
