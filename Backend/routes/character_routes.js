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

// Create character route
router.post("/character/create", async (request, response) => {
  const {
    image,
    name,
    detail,
    url,
    star_id,
    element_id,
    path_id,
    basic_id,
    skill_id,
    ultimate_id,
    talent_id,
    eidolon_id,
  } = request.body;
  try {
    connection.query(
      "INSERT INTO characters(image, name, detail, url, star_id, element_id, path_id, basic_id, skill_id, ultimate_id, talent_id, eidolon_id) VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        image,
        name,
        detail,
        url,
        star_id,
        element_id,
        path_id,
        basic_id,
        skill_id,
        ultimate_id,
        talent_id,
        eidolon_id,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(
            "Error while inserting a character into the database",
            error
          );
          return response.status(400).send();
        }
        return response
          .status(201)
          .json({ message: "New character created successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Read character route
router.get("/characters/read", async (request, response) => {
  try {
    connection.query(
      "SELECT c.*, c.image AS character_image, e.image AS element_image, e.name AS element_name, p.image AS path_image, p.name AS path_name FROM characters c INNER JOIN stars s ON c.star_id = s.id INNER JOIN elements e ON c.element_id = e.id INNER JOIN paths p ON c.path_id = p.id ORDER BY c.name ASC",
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
router.get("/character/read/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "SELECT c.*, c.image AS character_image, e.image AS element_image, e.name AS element_name, p.image AS path_image, p.name AS path_name FROM characters c INNER JOIN stars s ON c.star_id = s.id INNER JOIN elements e ON c.element_id = e.id INNER JOIN paths p ON c.path_id = p.id WHERE c.url = ?",
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
// Update character route
router.patch("/character/update/:id", async (request, response) => {
  const id = request.params.id;
  const new_image = request.body.new_image;
  const new_name = request.body.new_name;
  const new_detail = request.body.new_detail;
  const new_url = request.body.new_url;
  const new_star_id = request.body.new_star_id;
  const new_element_id = request.body.new_element_id;
  const new_path_id = request.body.new_path_id;
  const new_basic_id = request.body.new_basic_id;
  const new_skill_id = request.body.new_skill_id;
  const new_ultimate_id = request.body.new_ultimate_id;
  const new_talent_id = request.body.new_talent_id;
  const new_eidolon_id = request.body.new_eidolon_id;

  try {
    connection.query(
      "SELECT image, name, detail, url, star_id, element_id, path_id, basic_id, skill_id, ultimate_id, talent_id, eidolon_id FROM characters WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while reading the database", error);
          return response.status(400).send();
        }
        const image = new_image || results[0].image;
        const name = new_name || results[0].name;
        const detail = new_detail || results[0].detail;
        const url = new_url || results[0].url;
        const star_id = new_star_id || results[0].star_id;
        const element_id = new_element_id || results[0].element_id;
        const path_id = new_path_id || results[0].path_id;
        const basic_id = new_basic_id || results[0].basic_id;
        const skill_id = new_skill_id || results[0].skill_id;
        const ultimate_id = new_ultimate_id || results[0].ultimate_id;
        const talent_id = new_talent_id || results[0].talent_id;
        const eidolon_id = new_eidolon_id || results[0].eidolon_id;

        connection.query(
          "UPDATE characters SET image = ?, name = ?, detail = ?, url = ?, star_id = ?, element_id = ?, path_id = ?, basic_id = ?, skill_id = ?, ultimate_id = ?, talent_id = ?, eidolon_id = ? WHERE id = ?",
          [
            image,
            name,
            detail,
            url,
            star_id,
            element_id,
            path_id,
            basic_id,
            skill_id,
            ultimate_id,
            talent_id,
            eidolon_id,
            id,
          ],
          (error, results, fields) => {
            if (error) {
              console.log("Error while updating the database", error);
              return response.status(400).send();
            }
            return response
              .status(200)
              .json({ message: "Character data updated successfully!" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});
// Delete character route
router.delete("character/delete/:id", async (request, response) => {
  const id = request.params.id;
  try {
    connection.query(
      "DELETE FROM characters WHERE id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("Error while deleting the database", error);
          return response.status(400).send();
        }
        if (results.affectedRows === 0) {
          return response
            .status(404)
            .json({ message: "No character with that id!" });
        }
        return response
          .status(200)
          .json({ message: "Character deleted successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).send();
  }
});

module.exports = router;
