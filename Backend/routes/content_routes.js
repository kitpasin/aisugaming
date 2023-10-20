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

// Create content route
router.post("/content/create", async (request, response) => {
  const { image, title, description, detail, url, start_date, end_date } =
    request.body;
  try {
    connection.query(
      "INSERT INTO contents(image, title, description, detail, url, start_date, end_date) VALUE(?, ?, ?, ?, ?, ?, ?)",
      [image, title, description, detail, url, start_date, end_date],
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
router.get("/contents/read", async (request, response) => {
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
router.get("/content/read/:id", async (request, response) => {
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
router.patch("/content/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_image = request.body.new_image;
  const new_title = request.body.new_title;
  const new_description = request.body.new_description;
  const new_detail = request.body.new_detail;
  const new_url = request.body.new_url;
  const new_start_date = request.body.new_start_date;
  const new_end_date = request.body.new_end_date;

  try {
    connection.query(
      "SELECT image, title, description, detail, url, start_date, end_date FROM contents WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = new_image || results[0].image;
        const title = new_title || results[0].title;
        const description = new_description || results[0].description;
        const detail = new_detail || results[0].detail;
        const url = new_url || results[0].url;
        const start_date = new_start_date || results[0].start_date;
        const end_date = new_end_date || results[0].end_date;

        connection.query(
          "UPDATE contents SET image = ?, title = ?, description = ?, detail = ?, url = ?, start_date = ?, end_date = ? WHERE id = ?",
          [image, title, description, detail, url, start_date, end_date, id],
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
router.delete("content/delete/:id", async (request, response) => {
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

module.exports = router;
