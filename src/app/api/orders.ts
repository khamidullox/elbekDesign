// pages/api/orders.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { name, number, design } = req.body;

    try {
      const newOrder = await prisma.order.create({
        data: {
          name,
          number,
          design,
        },
      });

      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: "Unable to save order" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
