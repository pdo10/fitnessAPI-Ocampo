const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: {
        type: String,
        required: [true, 'Workout Name is Required']
    },
    duration: {
        type: String,
        required: [true, 'Workout Duration is Required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending'
    }    
});

module.exports = mongoose.model('Workout', workoutSchema);
