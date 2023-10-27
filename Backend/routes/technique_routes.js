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

// Create technique route
router.post("/technique/create", async (request, response) => {
  const {
    technique_id,
    technique_title,
    technique_description,
    technique_gain,
    technique_break,
  } = request.body;
  try {
    connection.query(
      "INSERT INTO techniques(technique_id, technique_title, technique_description, technique_gain, technique_break) VALUE(?, ?, ?, ?, ?)",
      [
        technique_id,
        technique_title,
        technique_description,  
        technique_gain,
        technique_break,
      ],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a star into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New technique created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read technique route
router.get("/technique/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM techniques", (error, results, fields) => {
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
router.get("/technique/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT t.* FROM techniques t INNER JOIN characters c ON FIND_IN_SET(t.technique_id, c.technique_id) > 0 WHERE c.url = ?",
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
// Update technique route
router.patch("/technique/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_technique_id = request.body.new_technique_id;
  const new_technique_title = request.body.new_technique_title;
  const new_technique_description = request.body.new_technique_description;
  const new_technique_gain = request.body.new_technique_gain;
  const new_technique_break = request.body.new_technique_break;
  try {
    connection.query(
      "SELECT technique_id, technique_title, technique_description, technique_gain, technique_break FROM techniques WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const technique_id = new_technique_id || results[0].technique_id;
        const technique_title = new_technique_title || results[0].technique_title;
        const technique_description = new_technique_description || results[0].technique_description;
        const technique_gain = new_technique_gain || results[0].technique_gain;
        const technique_break = new_technique_break || results[0].technique_break;

        connection.query(
          "UPDATE techniques SET technique_id = ?, technique_title = ?, technique_description = ?, technique_type = ?, technique_gain = ?, technique_break = ? WHERE id = ?",
          [
            technique_id,
            technique_title,
            technique_description,
            technique_gain,
            technique_break,
            id,
          ],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Technique data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete technique route
router.delete("/technique/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM techniques WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No technique with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Technique deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
