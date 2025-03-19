import express from "express";
import { app as backend } from "./backend/build/src/app.js";
const frontend = `${process.cwd()}/frontend/dist/`;

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.static(frontend));

server.use("/api", backend);

server.get("/", (req, res) => res.sendFile(frontend));

// Always send frontend to client browser
server.get("*", (req, res) => {
  res.sendFile(frontend);
});

server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
