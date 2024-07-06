const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

const connection = mysql.createConnection(dbConfig);

// Cria a tabela people se não existir
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
  )
`;

connection.query(createTableQuery, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err);
    return;
  }
});

app.get('/', (req, res) => {
  const insertQuery = `INSERT INTO people (nome) VALUES ('Tadeu')`;

  connection.query(insertQuery, (err) => {
    if (err) {
      console.error('Erro ao inserir o registro:', err);
      return res.status(500).send('Erro ao inserir o registro.');
    }

    const selectQuery = `SELECT nome FROM people`;

    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Erro ao buscar os registros:', err);
        return res.status(500).send('Erro ao buscar os registros.');
      }

      const names = results.map(row => row.nome);
      res.send(`<h1>Full Cycle Rocks!!</h1><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});