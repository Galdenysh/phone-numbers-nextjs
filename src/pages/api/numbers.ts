import type { NextApiRequest, NextApiResponse } from "next";
import { getStaticRedisClient } from "../../database/redis";

const client = getStaticRedisClient();

type Data = {
  message: string;
};

export default async function numbersHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      try {
        await client.set("foo", "bar", "EX", 120);
      } catch (e) {
        console.error("[/api/numbers]", e);
        res.status(500).send({ message: "Error while processing request" });
        return;
      }
      res.status(200).json({ message: "OK" });
      break;
    default: //Method Not Allowed
      res.status(405).send({ message: "Only GET requests allowed" });
      break;
  }
}
