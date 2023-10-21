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

// Create basic level route
router.post("/basic/level/create", async (request, response) => {
  const { level_id, basic_level_1, basic_level_2, basic_level_3, basic_level_4, basic_level_5, basic_level_6, basic_level_7} = request.body;
  try {
    connection.query(
      "INSERT INTO basic_levels(level_id, basic_level_1, basic_level_2, basic_level_3, basic_level_4, basic_level_5, basic_level_6, basic_level_7) VALUE(?, ?, ?, ?, ?, ?, ?, ?)",
      [level_id, basic_level_1, basic_level_2, basic_level_3, basic_level_4, basic_level_5, basic_level_6, basic_level_7],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a star into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New basic level created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read basic level route
router.get("/basic/levels/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM basic_levels", (error, results, fields) => {
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
router.get("/basic/level/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT * FROM basic_levels WHERE id = ?",
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
// Update basic level route
router.patch("/basic/level/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_level_id = request.body.new_level_id;
  const new_basic_level_1 = request.body.new_basic_level_1;
  const new_basic_level_2 = request.body.new_basic_level_2;
  const new_basic_level_3 = request.body.new_basic_level_3;
  const new_basic_level_4 = request.body.new_basic_level_4;
  const new_basic_level_5 = request.body.new_basic_level_5;
  const new_basic_level_6 = request.body.new_basic_level_6;
  const new_basic_level_7 = request.body.new_basic_level_7;

  try {
    connection.query(
      "SELECT level_id, level_1, level_2, level_3, level_4, level_5, level_6, level_7 FROM basic_levels WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const level_id = new_level_id || results[0].level_id;
        const basic_level_1 = new_basic_level_1 || results[0].basic_level_1;
        const basic_level_2 = new_basic_level_2 || results[0].basic_level_2;
        const basic_level_3 = new_basic_level_3 || results[0].basic_level_3;
        const basic_level_4 = new_basic_level_4 || results[0].basic_level_4;
        const basic_level_5 = new_basic_level_5 || results[0].basic_level_5;
        const basic_level_6 = new_basic_level_6 || results[0].basic_level_6;
        const basic_level_7 = new_basic_level_7 || results[0].basic_level_7;

        connection.query(
          "UPDATE basic_levels SET level_id = ?, level_1 = ?, level_2 = ?, level_3 = ?, level_4 = ?, level_5 = ?, level_6 = ?, level_7 = ? WHERE id = ?",
          [level_id, basic_level_1, basic_level_2, basic_level_3, basic_level_4, basic_level_5, basic_level_6, basic_level_7, id],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Basic level data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete basic level route
router.delete("/basic/level/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM basic_levels WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No basic level with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Basic level deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
