import type { NextApiRequest, NextApiResponse } from "next";
import { getStaticRedisClient } from "../../database/redis";
import { v4 as uuidv4 } from "uuid";

const client = getStaticRedisClient();

type Data = {
  message: string;
};

export default async function numbersHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      const number = req.body.number as string;
      const id = uuidv4();

      if (number) {
        try {
          await client.set(id, number, "EX", 1200);
        } catch (e) {
          console.error("[/api/numbers]", e);
          res.status(500).send({ message: "Error while processing request" });
          return;
        }
        res.status(200).json({ message: number });
      } else {
        res.status(500).send({ message: "Number not found" });
      }
      break;
    default: //Method Not Allowed
      res.status(405).send({ message: "Only GET and POST requests allowed" });
      break;
  }
}
