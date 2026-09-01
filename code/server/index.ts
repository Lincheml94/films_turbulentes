import Server from "./core/server";

const server = new Server().createServer();
server.listen(process.env.PORT);
