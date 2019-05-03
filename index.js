const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

// configurando o nunjucks

nunjucks.configure("views", {
  autoescape: true, // para manipular o nome dos arquivos
  express: app, // recebe a variavel q contem o express
  watch: true // para atualizar os arquivos a cada alteracao, sem precisar reiniciar o servico
});

// habilita o express para lidar com dados provenientes de um formulario, do copo da pagina
app.use(express.urlencoded({ extended: false }));

// o SET dentro do app serve para fazer configuracoes globais
app.set("view engine", "njk"); // configura a extensao q o nunjucks vai usar

app.get("/", (req, res) => {
  return res.render("ageForm");
});

app.post("/check", (req, res) => {
  console.log(req.body);
  return res.send("Ok");
});

app.listen(3000);
