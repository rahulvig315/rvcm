import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { generateMockCustomers } from "../vendor/data-generator/customers";
import { CustomerTransaction } from "../vendor/data-generator/customers/types";

const prisma = new PrismaClient();

async function main() {
  const mockCustomers: CustomerTransaction[] = generateMockCustomers(30, 20);
  prisma.customer.createMany({
    data: [...mockCustomers] as any,
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
