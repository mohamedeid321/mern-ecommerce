import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
    },
    email: {
      type: String,
      required: [true, "is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "is required"],
      minlength: [6, "please enter at least 6 characters"],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

// develop a middleware inside mongoose to hash the password before save operation
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// add comparePassword as a function inside mongoose throw methods
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
//craete  model from the schema
const User = mongoose.model("User", userSchema);
export default User;
