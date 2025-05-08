const express = require('express');
const workoutController = require('../controllers/workout');
const { verify } = require('../auth');

const router = express.Router();

router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);
router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/:workoutId/completeWorkoutStatus", verify, workoutController.completeWorkoutStatus);
router.put("/:workoutId/updateWorkout", verify, workoutController.updateWorkout);
router.delete("/:workoutId/deleteWorkout", verify, workoutController.deleteWorkout);

module.exports = router;