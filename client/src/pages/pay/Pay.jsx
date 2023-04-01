import React, { useEffect, useState } from 'react';
import './Pay.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkOutForm/checkOutForm.jsx';

const stripePromise = loadStripe(
  'pk_test_51Mrm35GiHcV4qtiGm4yhUXXsFBdjQDGdftlWXk6zsMn1eLB6qUyf2dJoiJx4eQdSn81yHLCW3THkS5vYyZE1MdB300j4OOlzZu'
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState('');

  const { gigID } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${gigID}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay ">
      <div className="container">
        <div className="title">
          <h1> Check Out</h1>
        </div>

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Pay;
