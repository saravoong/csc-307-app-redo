// backend.js
import express from "express";
import cors from "cors";
import {
  getUsers,
  addUser,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById } from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
    .then((result) => {
      if (result) {
        res.send({ users_list: result });
      } else {
        res.status(404).send("Resource not found.");
      }
    })
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  deleteUserById(userId)
    .then((result) => {
      if (result) {
        res.status(204).send("User deleted successfully");
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

