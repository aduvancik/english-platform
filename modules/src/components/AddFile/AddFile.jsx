import React from 'react'

function AddFile({ text, className }) {
  return (
    <button className={` ${className} flex gap-[8px] items-center justify-center`}>
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.49992 3.1875C8.69552 3.1875 8.85409 3.34607 8.85409 3.54167V13.4583C8.85409 13.6539 8.69552 13.8125 8.49992 13.8125C8.30432 13.8125 8.14575 13.6539 8.14575 13.4583V3.54167C8.14575 3.34607 8.30432 3.1875 8.49992 3.1875Z" fill="#5B2BBA" />
        <path fillRule="evenodd" clipRule="evenodd" d="M3.1875 8.49992C3.1875 8.30432 3.34607 8.14575 3.54167 8.14575H13.4583C13.6539 8.14575 13.8125 8.30432 13.8125 8.49992C13.8125 8.69552 13.6539 8.85409 13.4583 8.85409H3.54167C3.34607 8.85409 3.1875 8.69552 3.1875 8.49992Z" fill="#5B2BBA" />
        <circle cx="8.5" cy="8.5" r="8" stroke="#5B2BBA" />
      </svg>
      <p>{text}</p>
    </button>
  )
}

export default AddFile
