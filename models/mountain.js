const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MountainSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    height: { type: Number, required: true, min: 1 }, // height in feet
    location: { 
      type: [Number], required: true,
      validate: {
        validator: arr => arr.length === 2,
        message: 'Location must be an array of two numbers (latitude and longitude).'
      }
    },
    attempts: { type: [Date] },
    summits: { type: [Date] },
    region: { type: Schema.Types.ObjectId, ref: 'Region', required: true }
});
  
MountainSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/mountains/${this._id}`;
});

module.exports = mongoose.model('Mountain', MountainSchema);
