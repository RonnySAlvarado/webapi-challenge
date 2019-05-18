const express = require("express");

const server = express();

const logger = require("morgan");

server.use(express.json());
// server.use(cors());
// server.use(helmet());
server.use(logger("dev"));

const projectdb = require("./data/helpers/projectModel.js");
const actiondb = require("./data/helpers/actionModel.js");

server.get("/api/projects/", async (req, res) => {
  try {
    const getProjects = await projectdb.get();
    res.send(getProjects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was a problem retrieving all of the projects." });
  }
});

// server.get("/api/projects/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const getProjects = await projectdb.get(id);
//     res.send(getProjects);
//   } catch (err) {
//     res
//       .status(500)
//       .json({
//         message:
//           "There was a problem retrieving all of the actions of the specified project."
//       });
//   }
// });

server.post("/api/projects", validateProjectInfo, async (req, res) => {
  try {
    const newProject = req.body;
    const addProject = await projectdb.insert(newProject);
    res.status(201).json(addProject);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong when attempting to add a new project."
    });
  }
});

server.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProject = await projectdb.remove(id);
    if (deleteProject) {
      res.status(200).json(deleteProject);
    } else {
      res.status(404).json({ message: "Project id not found." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error in processing your request." });
  }
});

// server.put('/api/projects/:id', validateProjectInfo, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description } = req.body;
//         const updateProject = await projectdb.update(id, req.body);
//         if (name.length > 0 && description.length > 0 && updateProject){
//             res.status(200).json(updateProject);
//         }
//     }
// })

function validateProjectInfo(req, res, next) {
  const project = req.body;
  if (project && Object.keys(project).length) {
    if (project.name.length && project.description) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "Missing required name and description fields." });
    }
  }
}

module.exports = server;
