import type { NextApiRequest, NextApiResponse } from "next";
import { getStaticRedisClient } from "../../database/redis";
import { v4 as uuidv4 } from "uuid";
import { NextApiResponseServerIO } from "../../utils/types";

const client = getStaticRedisClient();

type Data = {
  message?: string;
  data?: ({ id: string; number: string } | undefined)[];
  number?: { id: string; number: string };
};

const NumbersHandler = async (req: NextApiRequest, res: NextApiResponseServerIO<Data>) => {
  switch (req.method) {
    case "GET":
      try {
        const keys = await client.keys("*");

        const values = keys.map(async (item) => {
          try {
            const value = await client.get(item);
            if (value) return { id: item, number: value };
          } catch (err) {
            console.error("[/api/numbers]", err);
          }
        });

        Promise.all(values).then((values) => {
          res.status(200).json({ data: values });
        });
      } catch (err) {
        console.error("[/api/numbers]", err);
        res.status(500).send({ message: "Error while processing request" });
        return;
      }
      break;
    case "POST":
      const number = req.body.number as string;
      const id = uuidv4();

      if (number) {
        try {
          await client.set(id, number);
          res?.socket?.server?.io?.emit("add-number", { id, number }); //emit message other clients
        } catch (err) {
          console.error("[/api/numbers]", err);
          res.status(500).send({ message: "Error while processing request" });
          return;
        }
        res.status(200).json({ number: { id, number } });
      } else {
        res.status(500).send({ message: "Number not found" });
      }
      break;
    default: //Method Not Allowed
      res.status(405).send({ message: "Only GET and POST requests allowed" });
      break;
  }
};

export default NumbersHandler;
