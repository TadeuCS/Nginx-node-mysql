# Projeto Nginx + Node + Mysql

This project is a Node.js application that connects to a MySQL database. When accessed on port 3000, it creates a `people` table (if it doesn't exist) and inserts a record with the name "Tadeu". The application then returns the list of names stored in the database.

## Requirements

- Docker
- Docker Compose

## How to Run

```sh
docker-compose up -d