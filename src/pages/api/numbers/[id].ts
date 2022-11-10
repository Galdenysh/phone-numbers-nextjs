import type { NextApiRequest, NextApiResponse } from "next";
import { getStaticRedisClient } from "../../../database/redis";

const client = getStaticRedisClient();

type Data = {
  message?: string;
  number?: { id: string; number: string };
};

const NumbersIdHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "DELETE":
      const { id } = req.query;

      if (typeof id === "string") {
        try {
          const number = await client.get(id);
          await client.del(id);
          number ? res.status(200).json({ number: { id, number } }) : res.status(500).send({ message: "Number not found" });
        } catch (err) {
          console.error("[/api/numbers]", err);
          res.status(500).send({ message: "Error while processing request" });
          return;
        }
      } else {
        res.status(500).send({ message: "Number not found" });
      }
      break;
    default: //Method Not Allowed
      res.status(405).send({ message: "Only DELETE requests allowed" });
      break;
  }
};

export default NumbersIdHandler;
