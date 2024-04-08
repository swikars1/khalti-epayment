# Khalti e-Payment Checkout Library

This library provides a convenient way to integrate Khalti e-Payments into your web applications.

## Installation

```bash
npm install khalti-epayment
```

## Usage

```javascript
import { createKhaltiInstance } from "khalti-epayment";

const khalti = createKhaltiInstance({
  env: "sandbox", // Use 'production' for live environment
  secretKey: "your_khalti_secret_key",
});

// Initiate a payment
const initiateResponse = await khalti.initiatePayment({
  return_url: "https://example.com/payment/",
  website_url: "https://example.com/",
  amount: 1300,
  purchase_order_id: "test12",
  purchase_order_name: "test",
  customer_info: {
    name: "Khalti Bahadur",
    email: "example@gmail.com",
    phone: "9800000123",
  },
  amount_breakdown: [
    {
      label: "Mark Price",
      amount: 1000,
    },
    {
      label: "VAT",
      amount: 300,
    },
  ],
  product_details: [
    {
      identity: "1234567890",
      name: "Khalti logo",
      total_price: 1300,
      quantity: 1,
      unit_price: 1300,
    },
  ],
  merchant_username: "merchant_name",
  merchant_extra: "merchant_extra",
});

// Lookup payment status
const lookupResponse = await khalti.paymentLookup({
  pidx: initiateResponse.pidx,
});
```

## API Reference

### `createKhaltiInstance(config)`

#### `config`

- `env`: "sandbox" or "production"
- `secretKey`: Your Khalti secret key

**Returns:** An object with the following methods:

- `paymentLookup(request)`

  - **request:** pidx (Payment index)
  - **Returns:** Payment lookup details

- `initiatePayment(payload)`
  - **payload:** Payment initiation data (refer to Khalti documentation)
  - **Returns:** Payment initiation response

## Error Handling

The library uses an `awTry` utility function for robust error handling. See the code for details on how to handle errors in responses.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Open an issue to discuss proposed changes.
2. Fork the repository and create a pull request with your changes.
3. Include tests for any new functionality.

## License

MIT
