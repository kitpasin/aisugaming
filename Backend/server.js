const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aisugaming",
});
connection.connect((error) => {
  if (error) {
    console.log("Error connecting to database = ", error);
    return;
  }
  console.log("Database connected successfully!");
});

// Create user route
app.post("/user/create", async (request, response) => {
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
app.get("/users/read", async (request, response) => {
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
app.get("/user/read/:id", async (request, response) => {
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
app.patch("/user/update/:id", async (request, response) => {
  const id = request.params.id;
  const newEmail = request.body.newEmail;
  const newUsername = request.body.newUsername;
  const newPassword = request.body.newPassword;
  try {
    connection.query(
      "SELECT email, username, password FROM users WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const email = newEmail || results[0].email;
        const username = newUsername || results[0].username;
        const password = newPassword || results[0].password;

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
app.delete("/user/delete/:id", async (request, response) => {
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

// Create game route
app.post("/game/create", async (request, response) => {
  const { image, title, url } = request.body;
  try {
    connection.query(
      "INSERT INTO games(image, title, description) VALUE(?, ?, ?)",
      [`/upload/${image}`, title, url],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a game into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New game created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
})

// Read game route
app.get("/games/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM games", (error, results, fields) => {
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
app.get("/game/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM games WHERE id = ?",
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

app.listen(3000, () => console.log("Server is running on port 3000"));
