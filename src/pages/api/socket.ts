import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../utils/types";

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
