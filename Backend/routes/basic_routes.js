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

// Create basic route
router.post("/basic/create", async (request, response) => {
  const { skill_id, basic_title, basic_description, basic_type, level_id, basic_gain, basic_break } = request.body;
  try {
    connection.query(
      "INSERT INTO basics(skill_id, basic_title, basic_description, basic_type, level_id, basic_gain, basic_break) VALUE(?, ?, ?, ?, ?, ?, ?)",
      [skill_id, basic_title, basic_description, basic_type, level_id, basic_gain, basic_break],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a star into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New basic created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read basic route
router.get("/basic/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM basics", (error, results, fields) => {
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
router.get("/basic/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM basics WHERE id = ?",
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
// Update basic route
router.patch("/basic/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_skill_id = request.body.new_skill_id;
  const new_basic_title = request.body.new_basic_title;
  const new_basic_description = request.body.new_basic_description;
  const new_basic_type = request.body.new_basic_type;
  const new_level_id = request.body.new_level_id;
  const new_basic_gain = request.body.new_basic_gain;
  const new_basic_break = request.body.new_basic_break;
  try {
    connection.query(
      "SELECT skill_id, basic_title, basic_description, basic_type, level_id, basic_gain, basic_break FROM basics WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const skill_id = new_skill_id || results[0].skill_id;
        const basic_title = new_basic_title || results[0].basic_title;
        const basic_description = new_basic_description || results[0].basic_description;
        const basic_type = new_basic_type || results[0].basic_type;
        const level_id = new_level_id || results[0].level_id;
        const basic_gain = new_basic_gain || results[0].basic_gain;
        const basic_break = new_basic_break || results[0].basic_break;

        connection.query(
          "UPDATE basics SET skill_id = ?, title = ?, description = ?, type = ?, level_id = ?, gain = ?, break = ? WHERE id = ?",
          [skill_id, basic_title, basic_description, basic_type, level_id, basic_gain, basic_break, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Basic data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete basic route
router.delete("/basic/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM basics WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No basic with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Basic deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
