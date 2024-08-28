const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
  const { name, duration, userId } = req.body;

  // Log the received data to verify userId is being sent
  console.log('Received data:', { name, duration, userId });

  let newWorkout = new Workout({
    name,
    duration,
    userId  // Save the userId
  });

  return newWorkout.save()
    .then(workout => res.status(201).send({ Workout: workout }))
    .catch(err => res.status(500).send({ error: "Error in Save", details: err }));
};



module.exports.getMyWorkouts = (req, res) => {
  const userId = req.user._id;

  return Workout.find({ userId: userId })
    .then(workouts => res.status(200).send({ workouts }))
    .catch(err => res.status(500).send({ error: "Error in Find", details: err }));
};


module.exports.updateWorkout = (req, res) => {
    
    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration        
    }

    Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
        .then(workout => {
            if (!workout) {
                return res.status(404).send({ error: 'Workout not found' });
            }
            res.status(200).send({
                message: 'Workout updated successfully',
                updatedWorkout: workout
            });
        })
        .catch(err => res.status(500).send({ error: 'Error in updating workout', details: err }));
};

module.exports.deleteWorkout = (req, res) => {

	return Workout.deleteOne({ _id: req.params.workoutId })
	.then((deleteStatus) => res.status(200).send({ 
    	message: 'Workout deleted successfully'
    }))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))  
};

module.exports.completeWorkoutStatus = (req, res) => {

	let completeWorkout = {
		status: 'Completed'
	}

	return Workout.findByIdAndUpdate(req.params.workoutId, completeWorkout, { new: true })
	.then((workout) => res.status(200).send({ 
    	message: 'Workout updated successfully', 
    	completeWorkout: workout
    	}))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))
};
