const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.get("/", getGoals);

//router.get("/", (req, res) => {
//res.status(200).json({ message: "Get goals" }); // to cos pozwala nam dodac ? goala
//});

router.post("/", setGoal);

//router.post("/", (req, res) => {
//res.status(200).json({ message: "Set goal" }); // to cos pozwala nam tworzyc goal
//});

router.put("/:id", updateGoal);

//router.put("/:id", (req, res) => {
//res.status(200).json({ message: `Update goal ${req.params.id}` }); // to cos pozwala nam zrobic update goala
//});

router.delete("/:id", deleteGoal);

//router.delete("/:id", (req, res) => {
//res.status(200).json({ message: `Delete goal ${req.params.id}` }); // a to pozwala nam usunąć jakiegoś goala
//});

module.exports = router;
