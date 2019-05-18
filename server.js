const express = require("express");

const server = express();

const logger = require("morgan");

server.use(express.json());
// server.use(cors());
// server.use(helmet());
server.use(logger("dev"));

const projectdb = require("./data/helpers/projectModel.js");
const actiondb = require("./data/helpers/actionModel.js");

server.get("/api/projects", async (req, res) => {
  try {
    const getProjects = await projectdb.get();
    res.send(getProjects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was a problem retrieving all of the projects." });
  }
});

module.exports = server;
