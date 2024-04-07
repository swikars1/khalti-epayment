/**
 * Represents the possible statuses of a payment transaction.
 */
export type PaymentStatus =
  | "Completed"
  | "Pending"
  | "Refunded"
  | "Expired"
  | "UserCanceled"
  | "PartiallyRefunded"
  | "Initiated";

/**
 * Represents the request payload for the payment lookup API.
 */
export interface PaymentLookupRequest {
  /** The initial payment identifier. */
  pidx: string;
}

/**
 * Represents the base structure of a successful lookup API response.
 */
interface PaymentLookupGeneralResponse {
  /** The initial payment identifier. */
  pidx: string;

  /** The total amount of the transaction (in what currency? Assuming Paisa here). */
  total_amount: number;

  /** The unique transaction identifier assigned by Khalti. */
  transaction_id: string | null;

  /** The fee associated with the transaction. */
  fee: number;

  /** Indicates whether the transaction has been refunded. */
  refunded: boolean;

  /** The current status of the transaction. */
  status: PaymentStatus;
}

/**
 * Represents a specific lookup response for a 'Success' transaction.
 */
export interface PaymentLookupSuccessResponse
  extends PaymentLookupGeneralResponse {
  status: "Completed"; // Enforce the specific status
}

/**
 * Represents a specific lookup response for a 'Pending' transaction.
 */
export interface PaymentLookupPendingResponse
  extends PaymentLookupGeneralResponse {
  status: "Pending"; // Enforce the specific status
  transaction_id: null; // Transaction ID not yet generated
}

/**
 * Represents a specific lookup response for an 'Initiated' transaction.
 */
export interface PaymentLookupInitiatedResponse
  extends PaymentLookupGeneralResponse {
  status: "Initiated";
}

/**
 * Represents a specific lookup response for a 'Refunded' transaction.
 */
export interface PaymentLookupRefundedResponse
  extends PaymentLookupGeneralResponse {
  status: "Refunded";
  refunded: true;
}

/**
 * Represents a specific lookup response for an 'Expired' transaction.
 */
export interface PaymentLookupExpiredResponse
  extends PaymentLookupGeneralResponse {
  status: "Expired";
  transaction_id: null;
}

/**
 * Represents a specific lookup response for a 'UserCanceled' transaction.
 */
export interface PaymentLookupCanceledResponse
  extends PaymentLookupGeneralResponse {
  status: "UserCanceled";
  transaction_id: null;
}

export type AllLookupResponse =
  | PaymentLookupSuccessResponse
  | PaymentLookupPendingResponse
  | PaymentLookupInitiatedResponse
  | PaymentLookupRefundedResponse
  | PaymentLookupExpiredResponse
  | PaymentLookupCanceledResponse;

// Completed	- Provide service to user.
// Pending	- Hold, do not provide service. And contact Khalti team.
// Refunded	- Transaction has been refunded to user. Do not provide service.
// Expired	- User have not made the payment, Do not provide the service.
// User canceled	User have canceled the payment, Do not provide the service.

// Only the status with Completed must be treated as success.
// Status Canceled , Expired , Failed must be treated as failed.
// If any negative consequences occur due to incomplete API integration or providing service without checking lookup status, Khalti won’t be accountable for any such losses.
// For status other than these, hold the transaction and contact KHALTI team.
// Payment link expires in 60 minutes in production.
