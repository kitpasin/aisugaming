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
      "INSERT INTO games(image, title, url) VALUE(?, ?, ?)",
      [`/games/${image}`, title, url],
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
});
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
// Update game route
app.patch("/game/update/:id", async (request, response) => {
  const id = request.params.id;
  const newImage = request.body.newImage;
  const newTitle = request.body.newTitle;
  const newUrl = request.body.newUrl;
  try {
    connection.query(
      "SELECT image, title, url FROM games WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = newImage || results[0].image;
        const title = newTitle || results[0].title;
        const url = newUrl || results[0].url;

        connection.query(
          "UPDATE games SET image = ?, title = ?, url = ? WHERE id = ?",
          [`/games/${image}`, title, url, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Game data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete game route
app.delete("game/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM games WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No game with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Game deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

// Create content route
app.post("/content/create", async (request, response) => {
  const { image, title, description, detail, url, start_date, end_date } =
    request.body;
  try {
    connection.query(
      "INSERT INTO contents(image, title, description, detail, url, start_date, end_date) VALUE(?, ?, ?, ?, ?, ?, ?)",
      [
        `/contents/${image}`,
        title,
        description,
        detail,
        url,
        start_date,
        end_date
      ],
      (error, results, fields) => {
        if (error) {
          console.log(
            "Error while inserting a content into the database",
            error
          );
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New content created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read content route
app.get("/contents/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM contents", (error, results, fields) => {
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
app.get("/content/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM contents WHERE id = ?",
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
// Update content route
app.patch("/content/update/:id", async (request, response) => {
  const id = request.params.id;
  const newImage = request.body.newImage;
  const newTitle = request.body.newTitle;
  const newDescription = request.body.newDescription;
  const newDetail = request.body.newDetail;
  const newUrl = request.body.newUrl;
  const newStart_date = request.body.newStart_date;
  const newEnd_date = request.body.newEnd_date;

  try {
    connection.query(
      "SELECT image, title, description, detail, url, start_date, end_date FROM contents WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = newImage || results[0].image;
        const title = newTitle || results[0].title;
        const description = newDescription || results[0].description;
        const detail = newDetail || results[0].detail;
        const url = newUrl || results[0].url;
        const start_date = newStart_date || results[0].start_date;
        const end_date = newEnd_date || results[0].end_date;

        connection.query(
          "UPDATE contents SET image = ?, title = ?, description = ?, detail = ?, url = ?, start_date = ?, end_date = ? WHERE id = ?",
          [`/contents/${image}`, title, description, detail, url, start_date, end_date, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Content data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete content route
app.delete("content/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM contents WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No content with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Content deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
