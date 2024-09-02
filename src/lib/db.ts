import {PrismaClient} from "@prisma/client"
interface CustomNodejsGlobal {
    prisma: PrismaClient;
}
declare const global: CustomNodejsGlobal;
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;
export default prisma;