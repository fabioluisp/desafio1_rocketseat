const express = require("express");

const app = express();

app.use(express.json());

//Middleware global - utilizado em todas as reqs
app.use((req, res, next) => {
  console.count("Reqs");
  next();
});

//Middleware local - check project exists
function checkProjExists(req, res, next) {
  const { id } = req.params;
  const proj = projects.find(p => p.id == id);
  if (!proj) {
    return res.status(400).json({ error: "Project does not exists!!!" });
  }

  return next();
}
const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: []
  },
  {
    id: "2",
    title: "Mais novo projeto",
    tasks: []
  }
];

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

app.post("/projects/:id/tasks", checkProjExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

app.put("/projects/:id", checkProjExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

app.delete("/projects/:id", checkProjExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

app.listen(3000);
