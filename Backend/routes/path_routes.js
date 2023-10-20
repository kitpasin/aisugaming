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

// Create path route
router.post("/path/create", async (request, response) => {
  const { image, name } = request.body;
  try {
    connection.query(
      "INSERT INTO paths(image, name) VALUE(?, ?)",
      [image, name],
      (error, results, fields) => {
        if (error) {
          console.log(
            "Error while inserting a path into the database",
            error
          );
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New path created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read path route
router.get("/paths/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM paths", (error, results, fields) => {
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
router.get("/path/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM paths WHERE id = ?",
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
// Update path route
router.patch("/path/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_image = request.body.new_image;
  const new_name = request.body.new_name;
  try {
    connection.query(
      "SELECT image, name FROM paths WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = new_image || results[0].image;
        const name = new_name || results[0].name;

        connection.query(
          "UPDATE paths SET name = ? WHERE id = ?",
          [image, name, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Path data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete path route
router.delete("/path/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM paths WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No path with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Path deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
