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

// Create element route
router.post("/element/create", async (request, response) => {
  const { image, name } = request.body;
  try {
    connection.query(
      "INSERT INTO elements(image, name) VALUE(?, ?)",
      [image, name],
      (error, results, fields) => {
        if (error) {
          console.log(
            "Error while inserting a element into the database",
            error
          );
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New element created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read element route
router.get("/elements/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM elements", (error, results, fields) => {
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
router.get("/element/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM elements WHERE id = ?",
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
// Update element route
router.patch("/element/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_image = request.body.new_image;
  const new_name = request.body.new_name;
  try {
    connection.query(
      "SELECT image, name FROM elements WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = new_image || results[0].image;
        const name = new_name || results[0].name;

        connection.query(
          "UPDATE elements SET name = ? WHERE id = ?",
          [image, name, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Element data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete element route
router.delete("/element/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM elements WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No element with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Element deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
