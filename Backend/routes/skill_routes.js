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

// Create skill route
router.post("/skill/create", async (request, response) => {
  const {
    skill_id,
    skill_title,
    skill_description_level_1,
    skill_description_level_2,
    skill_description_level_3,
    skill_description_level_4,
    skill_description_level_5,
    skill_description_level_6,
    skill_description_level_7,
    skill_description_level_8,
    skill_description_level_9,
    skill_description_level_10,
    skill_description_level_11,
    skill_description_level_12,
    skill_type,
    skill_gain,
    skill_break,
  } = request.body;
  try {
    connection.query(
      "INSERT INTO skills(skill_id, skill_title, skill_description_level_1, skill_description_level_2, skill_description_level_3, skill_description_level_4, skill_description_level_5, skill_description_level_6, skill_description_level_7, skill_description_level_8, skill_description_level_9, skill_description_level_10, skill_description_level_11, skill_description_level_12, skill_type, skill_gain, skill_break) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        skill_id,
        skill_title,
        skill_description_level_1,
        skill_description_level_2,
        skill_description_level_3,
        skill_description_level_4,
        skill_description_level_5,
        skill_description_level_6,
        skill_description_level_7,
        skill_description_level_8,
        skill_description_level_9,
        skill_description_level_10,
        skill_description_level_11,
        skill_description_level_12,
        skill_type,
        skill_gain,
        skill_break,
      ],
      (error, results, fields) => {
        if (error) {
          console.log("Error while inserting a star into the database", error);
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New skill created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read skill route
router.get("/skill/read", async (request, response) => {
  try {
    connection.query("SELECT * FROM skills", (error, results, fields) => {
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
router.get("/skill/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT s.* FROM skills s INNER JOIN characters c ON FIND_IN_SET(s.skill_id, c.skill_id) > 0 WHERE c.url = ?",
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
// Update skill route
router.patch("/skill/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_skill_id = request.body.new_skill_id;
  const new_skill_title = request.body.new_skill_title;
  const new_skill_description_level_1 =
    request.body.new_skill_description_level_1;
  const new_skill_description_level_2 =
    request.body.new_skill_description_level_2;
  const new_skill_description_level_3 =
    request.body.new_skill_description_level_3;
  const new_skill_description_level_4 =
    request.body.new_skill_description_level_4;
  const new_skill_description_level_5 =
    request.body.new_skill_description_level_5;
  const new_skill_description_level_6 =
    request.body.new_skill_description_level_6;
  const new_skill_description_level_7 =
    request.body.new_skill_description_level_7;
  const new_skill_description_level_8 =
    request.body.new_skill_description_level_8;
  const new_skill_description_level_9 =
    request.body.new_skill_description_level_9;
  const new_skill_description_level_10 =
    request.body.new_skill_description_level_10;
  const new_skill_description_level_11 =
    request.body.new_skill_description_level_11;
  const new_skill_description_level_12 =
    request.body.new_skill_description_level_12;
  const new_skill_type = request.body.new_skill_type;
  const new_skill_gain = request.body.new_skill_gain;
  const new_skill_break = request.body.new_skill_break;
  try {
    connection.query(
      "SELECT skill_id, skill_title, skill_description_level_1, skill_description_level_2, skill_description_level_3, skill_description_level_4, skill_description_level_5, skill_description_level_6, skill_description_level_7, skill_description_level_8, skill_description_level_9, skill_description_level_10, skill_description_level_11, skill_description_level_12, skill_type, skill_gain, skill_break FROM skills WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const skill_id = new_skill_id || results[0].skill_id;
        const skill_title = new_skill_title || results[0].skill_title;
        const skill_description_level_1 =
          new_skill_description_level_1 || results[0].skill_description_level_1;
        const skill_description_level_2 =
          new_skill_description_level_2 || results[0].skill_description_level_2;
        const skill_description_level_3 =
          new_skill_description_level_3 || results[0].skill_description_level_3;
        const skill_description_level_4 =
          new_skill_description_level_4 || results[0].skill_description_level_4;
        const skill_description_level_5 =
          new_skill_description_level_5 || results[0].skill_description_level_5;
        const skill_description_level_6 =
          new_skill_description_level_6 || results[0].skill_description_level_6;
        const skill_description_level_7 =
          new_skill_description_level_7 || results[0].skill_description_level_7;
        const skill_description_level_8 =
          new_skill_description_level_8 || results[0].skill_description_level_8;
        const skill_description_level_9 =
          new_skill_description_level_9 || results[0].skill_description_level_9;
        const skill_description_level_10 =
          new_skill_description_level_10 ||
          results[0].skill_description_level_10;
        const skill_description_level_11 =
          new_skill_description_level_11 ||
          results[0].skill_description_level_11;
        const skill_description_level_12 =
          new_skill_description_level_12 ||
          results[0].skill_description_level_12;
        const skill_type = new_skill_type || results[0].skill_type;
        const skill_gain = new_skill_gain || results[0].skill_gain;
        const skill_break = new_skill_break || results[0].skill_break;

        connection.query(
          "UPDATE skills SET skill_id = ?, skill_title = ?, skill_description_level_1 = ?, skill_description_level_2 = ?, skill_description_level_3 = ?, skill_description_level_4 = ?, skill_description_level_5 = ?, skill_description_level_6 = ?, skill_description_level_7 = ?, skill_description_level_8 = ?, skill_description_level_9 = ?, skill_description_level_10 = ?, skill_description_level_11 = ?, skill_description_level_12 = ?, skill_type = ?, skill_gain = ?, skill_break = ? WHERE id = ?",
          [
            skill_id,
            skill_title,
            skill_description_level_1,
            skill_description_level_2,
            skill_description_level_3,
            skill_description_level_4,
            skill_description_level_5,
            skill_description_level_6,
            skill_description_level_7,
            skill_description_level_8,
            skill_description_level_9,
            skill_description_level_10,
            skill_description_level_11,
            skill_description_level_12,
            skill_type,
            skill_gain,
            skill_break,
            id,
          ],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Skill data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete skill route
router.delete("/skill/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM skills WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No skill with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Skill deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
