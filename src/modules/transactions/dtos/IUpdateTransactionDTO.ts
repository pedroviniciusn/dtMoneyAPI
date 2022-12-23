interface IUpdateTransactionDTO {
  transactionId: string;
  title?: string;
  amount?: number;
  category?: string;
  type?: string;
}

export { IUpdateTransactionDTO };