const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aisugaming",
});
connection.connect((error) => {
  if (error) {
    console.log("Error connecting to database = ", error);
    return;
  }
  console.log("Database connected successfully!");
});

// Import route files
const user_routes = require("./routes/user_routes");
const game_routes = require("./routes/game_routes");
const content_routes = require("./routes/content_routes");
const character_routes = require("./routes/character_routes");
const star_routes = require("./routes/star_routes");
const element_routes = require("./routes/element_routes");
const path_routes = require("./routes/path_routes");
const basic_routes = require("./routes/basic_routes");
const skill_routes = require("./routes/skill_routes");
const ultimate_routes = require("./routes/ultimate_routes");
const talent_routes = require("./routes/talent_routes");
const technique_routes = require("./routes/technique_routes");

// Use routes
app.use(user_routes);
app.use(game_routes);
app.use(content_routes);
app.use(character_routes);
app.use(star_routes);
app.use(element_routes);
app.use(path_routes);
app.use(basic_routes);
app.use(skill_routes);
app.use(ultimate_routes);
app.use(talent_routes);
app.use(technique_routes);

app.listen(3000, () => console.log("Server is running on port 3000"));
