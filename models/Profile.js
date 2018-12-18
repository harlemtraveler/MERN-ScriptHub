const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 2);
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    // Array of Strings
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  onlinestatus: {
    type: Boolean,
    default: false
  },
  userlevel: {
    type: Number
  },
  joindate: {
    type: Date,
    default: Date.now
  },
  sellerrating: {
    type: Float
  },
  buyerrating: {
    type: Float
  },
  positiverating: {
    type: Float
  },
  negativerating: {
    type: Float
  },
  responsetime: {
    type: Float
  },
  lastseen: {
    type: Float
  },
  experience: [
    // An array of objects
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        // Start date
        type: Date,
        required: true
      },
      to: {
        // End date
        type: Date
      },
      current: {
        // Currently work here?
        type: Boolean,
        default: false
      },
      description: {
        type: String
      },
    },
  ],
  education: [
    // An array of objects
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        // Start date
        type: Date,
        required: true
      },
      to: {
        // End date
        type: Date
      },
      current: {
        // Currently work here?
        type: Boolean,
        default: false
      },
      description: {
        type: String
      },
    },
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
