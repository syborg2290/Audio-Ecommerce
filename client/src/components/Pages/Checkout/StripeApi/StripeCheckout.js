import React, { forwardRef, useImperativeHandle, useState, useContext } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import { AppContext } from '../../../../Contexts/AppContext';
import Spinner from '../../../reusables/Spinner';

const StripeCheckout = forwardRef(({ setStripeErrorMessage }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const { setShowSuccessModal } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    async handleSubmit() {
      if (!stripe || !elements) return;

      setIsLoading(true);

      setShowSuccessModal(true);
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://audio-commerce.netlify.app/checkout/success',
        },
      });

      if (error) {
        console.log(error);
        setStripeErrorMessage(error);
      } else {
        console.log('Something went wrong. Please try again.');
      }

      setIsLoading(false);
    },
  }));

  return (
    <div className='relative mt-12'>
      {isLoading && (
        <div className='absolute w-full h-full flex items-center justify-center bg-gray bg-opacity-50 rounded z-20'>
          <Spinner />
        </div>
      )}
      <PaymentElement />
    </div>
  );
});

export default StripeCheckout;
