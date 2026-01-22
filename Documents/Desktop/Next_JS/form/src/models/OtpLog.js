// import mongoose from "mongoose";

// const OtpLogSchema = new mongoose.Schema({

//   name: String,

//   phone: String,

//   generatedOtp: String,

//   enteredOtp: String,

//   status: {
//     type: String,
//     enum: ["SENT", "VERIFIED", "FAILED", "EXPIRED"],
//     default: "SENT"
//   }

// }, { timestamps: true });

// export default mongoose.models.OtpLog ||
//  mongoose.model("OtpLog", OtpLogSchema);


import mongoose from "mongoose";

const OtpLogSchema = new mongoose.Schema({

  name: String,

  phone: String,

  generatedOtp: String,

  enteredOtp: String,

  status: {
    type: String,
    default: "SENT"
  }

}, { timestamps: true });

export default mongoose.models.OtpLog ||
 mongoose.model("OtpLog", OtpLogSchema);
