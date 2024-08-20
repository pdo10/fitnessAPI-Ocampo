const Workout = require("../models/Workout");

module.exports.getAllWorkouts = (req, res) => {

	return Workout.find()
	.then(workouts => res.status(200).send({ workouts }))
	.catch(err => res.status(500).send({ error: "Error in Find", details: err}))

};

module.exports.getWorkout = (req, res) => {
    const workoutId = req.params.workoutId;

    Workout.findById(workoutId)
        .then(workout => {
            if (!workout) {
                return res.status(404).json({ message: 'Workout not found' });
            }

            res.status(200).json({ workout });
        })
        .catch(err => res.status(500).send({ error: "Error in Find", details: err}))
};

module.exports.addWorkout = (req,res) => {
    
	let newWorkout = new Workout({
		name : req.body.name,
		duration : req.body.duration
	});

	return newWorkout.save()
	.then((Workout) => res.status(201).send({Workout}))
	.catch(err => res.status(500).send({ error: "Error in Save", details: err}))  
};

module.exports.updateWorkoutStatus = (req, res) => {

	let updatedWorkout = {
		status: 'Completed'
	}

	return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
	.then((workout) => res.status(200).send({ 
    	message: 'Workout updated successfully', 
    	updatedWorkout: workout
    	}))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))
};


module.exports.deleteWorkout = (req, res) => {

	return Workout.deleteOne({ _id: req.params.workoutId })
	.then((deleteStatus) => res.status(200).send({ 
    	message: 'Workout deleted successfully'
    }))
	.catch(err => res.status(500).send({ error: "Error in Saving", details: err}))  
};
