const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    createdReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      }
    ],
    savedReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

// Set up pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log('Password hashed:', this.password); // Debug log
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
