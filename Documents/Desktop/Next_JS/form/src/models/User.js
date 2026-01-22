// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({

//   name: {
//     type: String,
//     required: true
//   },

//   phone: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   verified: {
//     type: Boolean,
//     default: false
//   },

//   status: {
//     type: String,
//     enum: ["PENDING", "ACTIVE"],
//     default: "PENDING"
//   }

// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    default: "PENDING"
  }

}, { timestamps: true });

export default mongoose.models.User ||
 mongoose.model("User", UserSchema);
