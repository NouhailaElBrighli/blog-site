import chalk from "chalk"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteBlogs = async  () => {
	console.log(chalk.red("delete all blogs"));
	const del = await prisma.blogs.deleteMany();
}
