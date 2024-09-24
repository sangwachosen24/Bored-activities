import express from "express";
import { activities } from "./activities.js"; // Named import

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// load the CSS file
app.use(express.static("public"));

// Route to render the page with filtered activities
app.get("/", (req, res) => {
  let filteredActivities = activities;

  // Get query parameters (e.g., participants, category)
  const participants = req.query.participants;
  const category = req.query.category;

    // filter activities that are relational to the number of participants
  if (participants) {
    filteredActivities = filteredActivities.filter(activity => activity.participants == participants);
  }
  // filter activities that are relational to the category selected by user
  if (category) {
    filteredActivities = filteredActivities.filter(activity => activity.category.toLowerCase() === category.toLowerCase());
  }

  // Render index.ejs and pass the filtered activities
  res.render("index", { activities: filteredActivities });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
