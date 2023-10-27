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

// Create talent route
router.post("/talent/create", async (request, response) => {
  const {
    talent_id,
    talent_title,
    talent_description_level_1,
    talent_description_level_2,
    talent_description_level_3,
    talent_description_level_4,
    talent_description_level_5,
    talent_description_level_6,
    talent_description_level_7,
    talent_description_level_8,
    talent_description_level_9,
    talent_description_level_10,
    talent_description_level_11,
    talent_description_level_12,
    talent_type,
    talent_gain,
    talent_break,
  } = request.body;
  try {
    connection.query(
      "INSERT INTO talents(talent_id, talent_title, talent_description_level_1, talent_description_level_2, talent_description_level_3, talent_description_level_4, talent_description_level_5, talent_description_level_6, talent_description_level_7, talent_description_level_8, talent_description_level_9, talent_description_level_10, talent_description_level_11, talent_description_level_12, talent_type, talent_gain, talent_break) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        talent_id,
        talent_title,
        talent_description_level_1,
        talent_description_level_2,
        talent_description_level_3,
        talent_description_level_4,
        talent_description_level_5,
        talent_description_level_6,
        talent_description_level_7,
        talent_description_level_8,
        talent_description_level_9,
        talent_description_level_10,
        talent_description_level_11,
        talent_description_level_12,
        talent_type,
        talent_gain,
        talent_break,
      ],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a star into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New talent created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read talent route
router.get("/talent/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM talents", (error, results, fields) => {
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
router.get("/talent/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT t.* FROM talents t INNER JOIN characters c ON FIND_IN_SET(t.talent_id, c.talent_id) > 0 WHERE c.url = ?",
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
// Update talent route
router.patch("/talent/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_talent_id = request.body.new_talent_id;
  const new_talent_title = request.body.new_talent_title;
  const new_talent_description_level_1 =
    request.body.new_talent_description_level_1;
  const new_talent_description_level_2 =
    request.body.new_talent_description_level_2;
  const new_talent_description_level_3 =
    request.body.new_talent_description_level_3;
  const new_talent_description_level_4 =
    request.body.new_talent_description_level_4;
  const new_talent_description_level_5 =
    request.body.new_talent_description_level_5;
  const new_talent_description_level_6 =
    request.body.new_talent_description_level_6;
  const new_talent_description_level_7 =
    request.body.new_talent_description_level_7;
  const new_talent_description_level_8 =
    request.body.new_talent_description_level_8;
  const new_talent_description_level_9 =
    request.body.new_talent_description_level_9;
  const new_talent_description_level_10 =
    request.body.new_talent_description_level_10;
  const new_talent_description_level_11 =
    request.body.new_talent_description_level_11;
  const new_talent_description_level_12 =
    request.body.new_talent_description_level_12;
  const new_talent_type = request.body.new_talent_type;
  const new_talent_gain = request.body.new_talent_gain;
  const new_talent_break = request.body.new_talent_break;
  try {
    connection.query(
      "SELECT talent_id, talent_title, talent_description_level_1, talent_description_level_2, talent_description_level_3, talent_description_level_4, talent_description_level_5, talent_description_level_6, talent_description_level_7, talent_description_level_8, talent_description_level_9, talent_description_level_10, talent_description_level_11, talent_description_level_12, talent_type, talent_gain, talent_break FROM talents WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const talent_id = new_talent_id || results[0].talent_id;
        const talent_title = new_talent_title || results[0].talent_title;
        const talent_description_level_1 =
          new_talent_description_level_1 || results[0].talent_description_level_1;
        const talent_description_level_2 =
          new_talent_description_level_2 || results[0].talent_description_level_2;
        const talent_description_level_3 =
          new_talent_description_level_3 || results[0].talent_description_level_3;
        const talent_description_level_4 =
          new_talent_description_level_4 || results[0].talent_description_level_4;
        const talent_description_level_5 =
          new_talent_description_level_5 || results[0].talent_description_level_5;
        const talent_description_level_6 =
          new_talent_description_level_6 || results[0].talent_description_level_6;
        const talent_description_level_7 =
          new_talent_description_level_7 || results[0].talent_description_level_7;
        const talent_description_level_8 =
          new_talent_description_level_8 || results[0].talent_description_level_8;
        const talent_description_level_9 =
          new_talent_description_level_9 || results[0].talent_description_level_9;
        const talent_description_level_10 =
          new_talent_description_level_10 ||
          results[0].talent_description_level_10;
        const talent_description_level_11 =
          new_talent_description_level_11 ||
          results[0].talent_description_level_11;
        const talent_description_level_12 =
          new_talent_description_level_12 ||
          results[0].talent_description_level_12;
        const talent_type = new_talent_type || results[0].talent_type;
        const talent_gain = new_talent_gain || results[0].talent_gain;
        const talent_break = new_talent_break || results[0].talent_break;

        connection.query(
          "UPDATE talents SET talent_id = ?, talent_title = ?, talent_description_level_1 = ?, talent_description_level_2 = ?, talent_description_level_3 = ?, talent_description_level_4 = ?, talent_description_level_5 = ?, talent_description_level_6 = ?, talent_description_level_7 = ?, talent_description_level_8 = ?, talent_description_level_9 = ?, talent_description_level_10 = ?, talent_description_level_11 = ?, talent_description_level_12 = ?, talent_type = ?, talent_gain = ?, talent_break = ? WHERE id = ?",
          [
            talent_id,
            talent_title,
            talent_description_level_1,
            talent_description_level_2,
            talent_description_level_3,
            talent_description_level_4,
            talent_description_level_5,
            talent_description_level_6,
            talent_description_level_7,
            talent_description_level_8,
            talent_description_level_9,
            talent_description_level_10,
            talent_description_level_11,
            talent_description_level_12,
            talent_type,
            talent_gain,
            talent_break,
            id,
          ],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Talent data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete talent route
router.delete("/talent/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM talents WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No talent with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Talent deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
