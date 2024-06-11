const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  mountains: [{ type: Schema.Types.ObjectId, ref: 'Mountain' }]
});

RegionSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/regions/${this._id}`;
});

RegionSchema.virtual("mountainCount").get(function () {
    // We don't use an arrow function as we'll need the this object
    return this.mountains.length;
});

module.exports = mongoose.model('Region', RegionSchema);
