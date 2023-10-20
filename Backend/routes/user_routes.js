const express = require("express");
const mysql = require("mysql");

const router = express.Router();

// Connect to DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aisugaming",
});
connection.connect();

// Create user route
router.post("/user/create", async (request, response) => {
  const { email, username, password } = request.body;
  try {
    connection.query(
      "INSERT INTO users(email, username, password) VALUE(?, ?, ?)",
      [email, username, password],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a user into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New user created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read user route
router.get("/users/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM users", (error, results, fields) => {
      if (error) {
        console.log("Error while reading the database", error);
        return response.status(400).send();
      }
      return response.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
router.get("/user/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        return response.status(200).json(results);
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Update user route
router.patch("/user/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_email = request.body.new_email;
  const new_username = request.body.new_username;
  const new_password = request.body.new_password;
  try {
    connection.query(
      "SELECT email, username, password FROM users WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const email = new_email || results[0].email;
        const username = new_username || results[0].username;
        const password = new_password || results[0].password;

        connection.query(
          "UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?",
          [email, username, password, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "User data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete user route
router.delete("/user/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM users WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No user with that id!" });
        }
        return response
          .status(200)
          .json({ message: "User deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
