"use client";
import { HostedForm } from 'react-acceptjs';

const authData = {
  clientKey: "5FcB6WrfHGS76gHW3v7btBCE3HuuBuke9Pj96Ztfn5R32G5ep42vne7MCWZtAucY",
  apiLoginID: "5KP3u95bQpv",
};

export default function App() {
  if (typeof window !== "undefined") {
    console.log(window, "==============");
    if (window.ApplePaySession) {
      var merchantIdentifier = 'merchant.apple-pay-new';
      var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
      promise.then(function (canMakePayments) {
        if (canMakePayments) {
          console.log("Apple Pay Payment Available");
          $("#applePayButton").prop('disabled', false);
        } else {
          console.log("Apple Pay is available but not activated yet");
        }
      });
    }
    else {
      console.log("Apple Pay not available in this browser");
    }
  }

  const handleSubmit = (response) => {
    console.log('Received response:', response);

    const data = {
      dataDescriptor: response.opaqueData.dataDescriptor,
      dataValue: response.opaqueData.dataValue
    }
    fetch('http://52.9.60.249:5000/api/v1/auth/create-apple-pay-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response:', data);
        alert("PAYMENT SUCCESSFUL !!")
      })
      .catch(error => {
        console.error('Error:', error);
        alert("PAYMENT FAILED !!")
      });
  };
  return <HostedForm authData={authData} onSubmit={handleSubmit} buttonText="Apple Pay" />;
};
