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

// Create ultimate route
router.post("/ultimate/create", async (request, response) => {
  const {
    ultimate_id,
    ultimate_title,
    ultimate_description_level_1,
    ultimate_description_level_2,
    ultimate_description_level_3,
    ultimate_description_level_4,
    ultimate_description_level_5,
    ultimate_description_level_6,
    ultimate_description_level_7,
    ultimate_description_level_8,
    ultimate_description_level_9,
    ultimate_description_level_10,
    ultimate_description_level_11,
    ultimate_description_level_12,
    ultimate_cost,
    ultimate_type,
    ultimate_gain,
    ultimate_break,
  } = request.body;
  try {
    connection.query(
      "INSERT INTO ultimates(ultimate_id, ultimate_title, ultimate_description_level_1, ultimate_description_level_2, ultimate_description_level_3, ultimate_description_level_4, ultimate_description_level_5, ultimate_description_level_6, ultimate_description_level_7, ultimate_description_level_8, ultimate_description_level_9, ultimate_description_level_10, ultimate_description_level_11, ultimate_description_level_12, ultimate_cost, ultimate_type, ultimate_gain, ultimate_break) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        ultimate_id,
        ultimate_title,
        ultimate_description_level_1,
        ultimate_description_level_2,
        ultimate_description_level_3,
        ultimate_description_level_4,
        ultimate_description_level_5,
        ultimate_description_level_6,
        ultimate_description_level_7,
        ultimate_description_level_8,
        ultimate_description_level_9,
        ultimate_description_level_10,
        ultimate_description_level_11,
        ultimate_description_level_12,
        ultimate_cost,
        ultimate_type,
        ultimate_gain,
        ultimate_break,
      ],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a star into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New ultimate created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read ultimate route
router.get("/ultimate/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM ultimates", (error, results, fields) => {
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
router.get("/ultimate/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT u.* FROM ultimates u INNER JOIN characters c ON FIND_IN_SET(u.ultimate_id, c.ultimate_id) > 0 WHERE c.url = ?",
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
// Update ultimate route
router.patch("/ultimate/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_ultimate_id = request.body.new_ultimate_id;
  const new_ultimate_title = request.body.new_ultimate_title;
  const new_ultimate_description_level_1 =
    request.body.new_ultimate_description_level_1;
  const new_ultimate_description_level_2 =
    request.body.new_ultimate_description_level_2;
  const new_ultimate_description_level_3 =
    request.body.new_ultimate_description_level_3;
  const new_ultimate_description_level_4 =
    request.body.new_ultimate_description_level_4;
  const new_ultimate_description_level_5 =
    request.body.new_ultimate_description_level_5;
  const new_ultimate_description_level_6 =
    request.body.new_ultimate_description_level_6;
  const new_ultimate_description_level_7 =
    request.body.new_ultimate_description_level_7;
  const new_ultimate_description_level_8 =
    request.body.new_ultimate_description_level_8;
  const new_ultimate_description_level_9 =
    request.body.new_ultimate_description_level_9;
  const new_ultimate_description_level_10 =
    request.body.new_ultimate_description_level_10;
  const new_ultimate_description_level_11 =
    request.body.new_ultimate_description_level_11;
  const new_ultimate_description_level_12 =
    request.body.new_ultimate_description_level_12;
  const new_ultimate_cost = request.body.new_ultimate_cost;
  const new_ultimate_type = request.body.new_ultimate_type;
  const new_ultimate_gain = request.body.new_ultimate_gain;
  const new_ultimate_break = request.body.new_ultimate_break;
  try {
    connection.query(
      "SELECT ultimate_id, ultimate_title, ultimate_description_level_1, ultimate_description_level_2, ultimate_description_level_3, ultimate_description_level_4, ultimate_description_level_5, ultimate_description_level_6, ultimate_description_level_7, ultimate_description_level_8, ultimate_description_level_9, ultimate_description_level_10, ultimate_description_level_11, ultimate_description_level_12, ultimate_cost, ultimate_type, ultimate_gain, ultimate_break FROM ultimates WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const ultimate_id = new_ultimate_id || results[0].ultimate_id;
        const ultimate_title = new_ultimate_title || results[0].ultimate_title;
        const ultimate_description_level_1 =
          new_ultimate_description_level_1 || results[0].ultimate_description_level_1;
        const ultimate_description_level_2 =
          new_ultimate_description_level_2 || results[0].ultimate_description_level_2;
        const ultimate_description_level_3 =
          new_ultimate_description_level_3 || results[0].ultimate_description_level_3;
        const ultimate_description_level_4 =
          new_ultimate_description_level_4 || results[0].ultimate_description_level_4;
        const ultimate_description_level_5 =
          new_ultimate_description_level_5 || results[0].ultimate_description_level_5;
        const ultimate_description_level_6 =
          new_ultimate_description_level_6 || results[0].ultimate_description_level_6;
        const ultimate_description_level_7 =
          new_ultimate_description_level_7 || results[0].ultimate_description_level_7;
        const ultimate_description_level_8 =
          new_ultimate_description_level_8 || results[0].ultimate_description_level_8;
        const ultimate_description_level_9 =
          new_ultimate_description_level_9 || results[0].ultimate_description_level_9;
        const ultimate_description_level_10 =
          new_ultimate_description_level_10 ||
          results[0].ultimate_description_level_10;
        const ultimate_description_level_11 =
          new_ultimate_description_level_11 ||
          results[0].ultimate_description_level_11;
        const ultimate_description_level_12 =
          new_ultimate_description_level_12 ||
          results[0].ultimate_description_level_12;
        const ultimate_cost = new_ultimate_cost || results[0].ultimate_cost;
        const ultimate_type = new_ultimate_type || results[0].ultimate_type;
        const ultimate_gain = new_ultimate_gain || results[0].ultimate_gain;
        const ultimate_break = new_ultimate_break || results[0].ultimate_break;

        connection.query(
          "UPDATE ultimates SET ultimate_id = ?, ultimate_title = ?, ultimate_description_level_1 = ?, ultimate_description_level_2 = ?, ultimate_description_level_3 = ?, ultimate_description_level_4 = ?, ultimate_description_level_5 = ?, ultimate_description_level_6 = ?, ultimate_description_level_7 = ?, ultimate_description_level_8 = ?, ultimate_description_level_9 = ?, ultimate_description_level_10 = ?, ultimate_description_level_11 = ?, ultimate_description_level_12 = ?, ultimate_cost = ?, ultimate_type = ?, ultimate_gain = ?, ultimate_break = ? WHERE id = ?",
          [
            ultimate_id,
            ultimate_title,
            ultimate_description_level_1,
            ultimate_description_level_2,
            ultimate_description_level_3,
            ultimate_description_level_4,
            ultimate_description_level_5,
            ultimate_description_level_6,
            ultimate_description_level_7,
            ultimate_description_level_8,
            ultimate_description_level_9,
            ultimate_description_level_10,
            ultimate_description_level_11,
            ultimate_description_level_12,
            ultimate_cost,
            ultimate_type,
            ultimate_gain,
            ultimate_break,
            id,
          ],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Ultimate data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete ultimate route
router.delete("/ultimate/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM ultimates WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No ultimate with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Ultimate deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
