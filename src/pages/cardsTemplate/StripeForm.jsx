import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Input, Button } from 'antd';

const StripeForm = () => {
    //   const stripe = useStripe();
    //   const elements = useElements();

    //   const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //       type: 'card',
    //       card: elements.getElement(CardElement),
    //     });

    //     if (!error) {
    //       console.log(paymentMethod);
    //     }
    //   };

    return (
        <Form
            // onFinish={handleSubmit}
            className="checkout-form">
            <Form.Item>
                {/* <CardElement /> */}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit"
                //  disabled={!stripe}
                >
                    Pay
                </Button>
            </Form.Item>
        </Form>
    );
};

export default StripeForm;
