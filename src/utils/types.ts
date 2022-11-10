import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export interface IPhoneNumber {
  id: string;
  number: string;
}

export type NextApiResponseServerIO<T = any> = NextApiResponse<T> & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
