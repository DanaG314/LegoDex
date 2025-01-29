const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLegoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    legoName: {
      type: String,
      required: true,
    },
    legoId: {
      type: String,
      required: true,
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
      required: false,
      default: 'Available',
    },
    condition: {
      type: String,
      enum: ['Opened', 'Unopened'],
      default: 'Opened',
    },
    rating: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserLegoSet', userLegoSchema);
