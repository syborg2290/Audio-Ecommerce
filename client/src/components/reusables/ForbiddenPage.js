import React from 'react';
import { useHistory } from 'react-router-dom';

const ForbiddenPage = ({ text, btnText }) => {
  const history = useHistory();

  return (
    <div className='w-full h-screen flex flex-col bg-auth-pattern bg-center  bg-cover justify-center items-center bg-primary text-white absolute z-50 top-0 left-0'>
      <h1 className='bg-primary-light px-4 py-1 mb-4 rounded'>Not Authorized</h1>
      <p className='mb-6 text-lg font-bold tracking-wider'>{text}</p>
      <button
        onClick={() => history.goBack()}
        className='btn-secondary rounded border-0'
      >
        {btnText}
      </button>
    </div>
  );
};

export default ForbiddenPage;
