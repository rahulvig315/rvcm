import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const password = await hash("password123", 12);
    await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {
            password,
        },
        create: {
            email: "admin@admin.com",
            name: "Admin",
            updatedAt: new Date(),
            createdAt: new Date(),
            password
        },
    } as any);

}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });