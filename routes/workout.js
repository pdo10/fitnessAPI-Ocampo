const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout");
const {verify} = require("../auth");

router.get("/all", verify, workoutController.getAllWorkouts);
router.get("/:workoutId", verify, workoutController.getWorkout);
router.post("/", verify, workoutController.addWorkout);
router.patch("/:workoutId", verify, workoutController.updateWorkoutStatus);
router.delete("/:workoutId", verify, workoutController.deleteWorkout);

module.exports = router;