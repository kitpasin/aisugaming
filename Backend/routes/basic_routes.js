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
  const {
    basic_id,
    basic_title,
    basic_description_level_1,
    basic_description_level_2,
    basic_description_level_3,
    basic_description_level_4,
    basic_description_level_5,
    basic_description_level_6,
    basic_description_level_7,
    basic_type,
    basic_gain,
    basic_break,
  } = request.body;
  try {
    connection.query(
      "INSERT INTO basics(basic_id, basic_title, basic_description_level_1, basic_description_level_2, basic_description_level_3, basic_description_level_4, basic_description_level_5, basic_description_level_6, basic_description_level_7, basic_type, basic_gain, basic_break) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        basic_id,
        basic_title,
        basic_description_level_1,
        basic_description_level_2,
        basic_description_level_3,
        basic_description_level_4,
        basic_description_level_5,
        basic_description_level_6,
        basic_description_level_7,
        basic_type,
        basic_gain,
        basic_break,
      ],
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
      "SELECT b.* FROM basics b INNER JOIN characters c ON FIND_IN_SET(b.basic_id, c.basic_id) > 0 WHERE c.url = ?",
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
  const new_basic_id = request.body.new_basic_id;
  const new_basic_title = request.body.new_basic_title;
  const new_basic_description_level_1 =
    request.body.new_basic_description_level_1;
  const new_basic_description_level_2 =
    request.body.new_basic_description_level_2;
  const new_basic_description_level_3 =
    request.body.new_basic_description_level_3;
  const new_basic_description_level_4 =
    request.body.new_basic_description_level_4;
  const new_basic_description_level_5 =
    request.body.new_basic_description_level_5;
  const new_basic_description_level_6 =
    request.body.new_basic_description_level_6;
  const new_basic_description_level_7 =
    request.body.new_basic_description_level_7;
  const new_basic_type = request.body.new_basic_type;
  const new_basic_gain = request.body.new_basic_gain;
  const new_basic_break = request.body.new_basic_break;
  try {
    connection.query(
      "SELECT basic_id, basic_title, basic_description_level_1, basic_description_level_2, basic_description_level_3, basic_description_level_4, basic_description_level_5, basic_description_level_6, basic_description_level_7, basic_type, basic_gain, basic_break FROM basics WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const basic_id = new_basic_id || results[0].basic_id;
        const basic_title = new_basic_title || results[0].basic_title;
        const basic_description_level_1 =
          new_basic_description_level_1 || results[0].basic_description_level_1;
        const basic_description_level_2 =
          new_basic_description_level_2 || results[0].basic_description_level_2;
        const basic_description_level_3 =
          new_basic_description_level_3 || results[0].basic_description_level_3;
        const basic_description_level_4 =
          new_basic_description_level_4 || results[0].basic_description_level_4;
        const basic_description_level_5 =
          new_basic_description_level_5 || results[0].basic_description_level_5;
        const basic_description_level_6 =
          new_basic_description_level_6 || results[0].basic_description_level_6;
        const basic_description_level_7 =
          new_basic_description_level_7 || results[0].basic_description_level_7;
        const basic_type = new_basic_type || results[0].basic_type;
        const basic_gain = new_basic_gain || results[0].basic_gain;
        const basic_break = new_basic_break || results[0].basic_break;

        connection.query(
          "UPDATE basics SET basic_id = ?, basic_title = ?, basic_description_level_1 = ?, basic_description_level_2 = ?, basic_description_level_3 = ?, basic_description_level_4 = ?, basic_description_level_5 = ?, basic_description_level_6 = ?, basic_description_level_7 = ?, basic_type = ?, basic_gain = ?, basic_break = ? WHERE id = ?",
          [
            basic_id,
            basic_title,
            basic_description_level_1,
            basic_description_level_2,
            basic_description_level_3,
            basic_description_level_4,
            basic_description_level_5,
            basic_description_level_6,
            basic_description_level_7,
            basic_type,
            basic_gain,
            basic_break,
            id,
          ],
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
