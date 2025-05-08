const Workout = require("../models/Workout");
const { errorHandler } = require('../auth');

module.exports.addWorkout = (req, res) => {

    let newWorkout = new Workout({
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status,
        userId: req.user.id
    });

    return Workout.findOne({ name: req.body.name, userId: req.user.id })
    .then(existingWorkout => {

        if(existingWorkout) {
            return res.status(409).send({ message: 'Workout already exists' });

        } else {
            return newWorkout.save()
            .then(savedWorkout => res.status(201).send({
                success: true,
                message: 'Workout added successfully',
                workout: {
                    _id: savedWorkout._id,
                    name: savedWorkout.name,
                    duration: savedWorkout.duration,
                    status: savedWorkout.status,
                    userId: savedWorkout.userId
                }
            }))
            .catch(err => errorHandler(err, req, res));
        }
    })
    .catch(err => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {

    return Workout.find({ userId: req.user.id })
    .then(result => {
        if(result.length > 0){

            return res.status(200).send(result);

        } else {
            return res.status(404).send({ message: 'No workouts found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.completeWorkoutStatus = (req, res) => {

    return Workout.findById(req.params.workoutId)
    .then(workout => {
        if(workout) {
            return  res.status(200).send({ 
                success: true, 
                message: 'Workout retrieved successfully', 
                workout 
            });;
        } else {
            return res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(err => errorHandler(err, req, res));   
};

module.exports.updateWorkout = (req, res) => {

    let updatedWorkout = {
        name : req.body.name,
        duration : req.body.duration,
        status : req.body.status
    }

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        res.status(200).send({ 
            success: true, 
            message: 'Workout updated successfully', 
            workout 
        });
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deleteWorkout = (req, res) => {
  Workout.findById(req.params.workoutId)
    .then(workout => {
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found.' });
      }

      if (workout.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete this workout.' });
      }

      return workout.deleteOne().then(() => {
        res.status(200).json({ message: 'Workout deleted successfully.' });
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Server error while deleting workout.' });
    });
};
