// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import OtpLog from "@/models/OtpLog";
// import { sendWhatsAppOTP } from "@/lib/whatsapp";

// export async function POST(req) {

//   try {

//     const { name, phone, otp } = await req.json();

//     await connectDB();

//     // ==============================
//     // STEP 1 → SEND OTP
//     // ==============================
//     if (name && phone && !otp) {

//       const existing = await User.findOne({ phone });

//       if (existing?.verified) {
//         return Response.json(
//           { error: "Phone already registered" },
//           { status: 400 }
//         );
//       }

//       // Create user as pending
//       await User.findOneAndUpdate(
//         { phone },
//         {
//           name,
//           phone,
//           verified: false,
//           status: "PENDING"
//         },
//         { upsert: true }
//       );

//       // Generate OTP
//       const generatedOTP = Math.floor(
//         100000 + Math.random() * 900000
//       ).toString();

//       // Save OTP Log
//       await OtpLog.create({
//         name,
//         phone,
//         generatedOtp: generatedOTP,
//         status: "SENT"
//       });

//       // Send WhatsApp OTP
//       await sendWhatsAppOTP(phone, generatedOTP);

//       return Response.json({ step: "OTP_SENT" });
//     }

//     // ==============================
//     // STEP 2 → VERIFY OTP
//     // ==============================
//     if (phone && otp) {

//       // Find latest OTP
//       const otpRecord = await OtpLog.findOne({ phone })
//         .sort({ createdAt: -1 });

//       if (!otpRecord) {
//         return Response.json(
//           { error: "OTP not found" },
//           { status: 400 }
//         );
//       }

//       // Check expiry (5 minutes)
//       const diff =
//         (Date.now() - otpRecord.createdAt.getTime()) / 1000;

//       if (diff > 300) {

//         otpRecord.status = "EXPIRED";
//         await otpRecord.save();

//         return Response.json(
//           { error: "OTP expired" },
//           { status: 400 }
//         );
//       }

//       // Match OTP
//       if (otpRecord.generatedOtp !== otp) {

//         otpRecord.enteredOtp = otp;
//         otpRecord.status = "FAILED";
//         await otpRecord.save();

//         return Response.json(
//           { error: "Invalid OTP" },
//           { status: 400 }
//         );
//       }

//       // Mark OTP Verified
//       otpRecord.enteredOtp = otp;
//       otpRecord.status = "VERIFIED";
//       await otpRecord.save();

//       // Activate User
//       const user = await User.findOneAndUpdate(
//         { phone },
//         {
//           verified: true,
//           status: "ACTIVE"
//         },
//         { new: true }
//       );

//       return Response.json({
//         step: "VERIFIED",
//         user: {
//           id: user._id,
//           name: user.name,
//           phone: user.phone
//         }
//       });
//     }

//     return Response.json(
//       { error: "Invalid Request" },
//       { status: 400 }
//     );

//   } catch (error) {

//     console.error("Register Error ❌", error);

//     return Response.json(
//       { error: "Server Error" },
//       { status: 500 }
//     );
//   }
// }


import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import OtpLog from "@/models/OtpLog";
import { sendWhatsAppOTP } from "@/lib/whatsapp";

export async function POST(req) {

  try {

    const { name, phone, otp } = await req.json();

    await connectDB();

    // =====================
    // SEND OTP
    // =====================
    if (name && phone && !otp) {

      const alreadyUser = await User.findOne({ phone });

      if (alreadyUser?.verified) {
        return Response.json(
          { error: "Phone already registered" },
          { status: 400 }
        );
      }

      // Create / Update User (Pending)
      await User.findOneAndUpdate(
        { phone },
        {
          name,
          phone,
          verified: false,
          status: "PENDING"
        },
        { upsert: true }
      );

      // Generate OTP
      const generatedOTP = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Store OTP log
      await OtpLog.create({
        name,
        phone,
        generatedOtp: generatedOTP,
        status: "SENT"
      });

      // Send WhatsApp OTP
      await sendWhatsAppOTP(phone, generatedOTP);

      return Response.json({ step: "OTP_SENT" });
    }

    // =====================
    // VERIFY OTP
    // =====================
    if (phone && otp) {

      const otpData = await OtpLog.findOne({ phone })
        .sort({ createdAt: -1 });

      if (!otpData) {
        return Response.json(
          { error: "OTP not found" },
          { status: 400 }
        );
      }

      // Expiry check (5 minutes)
      const timeDiff =
        (Date.now() - otpData.createdAt.getTime()) / 1000;

      if (timeDiff > 300) {

        otpData.status = "EXPIRED";
        await otpData.save();

        return Response.json(
          { error: "OTP expired" },
          { status: 400 }
        );
      }

      // OTP match
      if (otpData.generatedOtp !== otp) {

        otpData.enteredOtp = otp;
        otpData.status = "FAILED";
        await otpData.save();

        return Response.json(
          { error: "Invalid OTP" },
          { status: 400 }
        );
      }

      // Success
      otpData.enteredOtp = otp;
      otpData.status = "VERIFIED";
      await otpData.save();

      const user = await User.findOneAndUpdate(
        { phone },
        {
          verified: true,
          status: "ACTIVE"
        },
        { new: true }
      );

      return Response.json({
        step: "VERIFIED",
        user
      });
    }

    return Response.json(
      { error: "Invalid Request" },
      { status: 400 }
    );

  } catch (err) {

    console.error("REGISTER ERROR:", err);

    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
