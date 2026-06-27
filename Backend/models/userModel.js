const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ek email se ek hi account ban sakega
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // By default har user normal customer hoga, admin nahi
    },
  },
  {
    timestamps: true, // Isse createdAt aur updatedAt automatically ban jayega
  }
);

// 1. LOGIN KE LIYE: Bheje gaye password ko database ke hashed password se compare karna
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt.compare() automatic salt nikal kar match kar leta hai
  return await bcrypt.compare(enteredPassword, this.password);
};
// MIDDLEWARE: Save karne se pehle password ko automatically encrypt/hash karna
// Password ko save karne se pehle automatic hash karne ke liye
// Password ko save karne se pehle automatic hash karne ke liye (Bina next ke)
userSchema.pre('save', async function () {
  // Agar password badla (modify) nahi gaya hai, toh yahi se return ho jao (aage badho)
  if (!this.isModified('password')) {
    return; 
  }

  // Agar password badla hai, toh use hash karo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;