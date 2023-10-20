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

// Create game route
router.post("/game/create", async (request, response) => {
  const { image, title, url } = request.body;
  try {
    connection.query(
      "INSERT INTO games(image, title, url) VALUE(?, ?, ?)",
      [image, title, url],
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
router.get("/games/read", async (request, response) => {
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
router.get("/game/read/:id", async (request, response) => {
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
router.patch("/game/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_image = request.body.new_image;
  const new_title = request.body.new_title;
  const new_url = request.body.new_url;
  try {
    connection.query(
      "SELECT image, title, url FROM games WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = new_image || results[0].image;
        const title = new_title || results[0].title;
        const url = new_url || results[0].url;

        connection.query(
          "UPDATE games SET image = ?, title = ?, url = ? WHERE id = ?",
          [image, title, url, id],
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
router.delete("game/delete/:id", async (request, response) => {
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

module.exports = router;
