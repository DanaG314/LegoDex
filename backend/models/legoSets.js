const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLegoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    legoId: {
      type: String,
      required: true,
    },
    inCollection: {
      type: Boolean,
    },
    inWishlist: {
      type: Boolean,
    },
    inFavourites: {
      type: Boolean,
    },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Hard to Find', 'Leaving Soon', 'Retired'],
      required: true,
      default: 'Available',
    },
    condition: {
      type: String,
      enum: ['Opened', 'Unopened'],
      default: 'Opened',
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LegoSet', userLegoSchema);
