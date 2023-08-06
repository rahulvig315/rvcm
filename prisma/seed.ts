import { Customer, PrismaClient, Transaction } from "@prisma/client";
import { generateMockCustomers } from "../vendor/data-generator/customers";
import {
  CustomerWithTransactions,
  TransactionWithProductAndCreditCardDetails,
} from "../vendor/data-generator/customers/types";

const prisma = new PrismaClient();
async function main() {
  const customersWithTransactions: CustomerWithTransactions[] =
    generateMockCustomers(100, 5);
  for (const { transactions, ...customer } of customersWithTransactions) {
    const customerToAdd: Customer = customer;
    const transactionsToAdd: TransactionWithProductAndCreditCardDetails[] =
      transactions;
    // Add Customer
    await prisma.customer.create({
      data: customerToAdd,
    });
    for (let {
      creditCardDetails,
      productDetails,
      transaction,
    } of transactionsToAdd) {
      // Add Transaction
      await prisma.transaction.create({
        data: transaction,
      });
      // Add CreditCardDetails
      await prisma.creditCardDetails.create({
        data: creditCardDetails,
      });
      // Add ProductDetails
      await prisma.productDetails.create({
        data: productDetails,
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
