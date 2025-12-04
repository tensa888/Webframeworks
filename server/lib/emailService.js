import nodemailer from "nodemailer";

// Configure transporter with Google app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "misterdogg0904@gmail.com",
    pass: "gsoo xcmq vood mogz",
  },
});

// Store OTPs in memory (in production, use Redis or database)
const otpStore = new Map();

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email, otp) {
  try {
    const mailOptions = {
      from: "misterdogg0904@gmail.com",
      to: email,
      subject: "Your Vyoma Placement Cell Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #007bff; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    // Store OTP with expiration (10 minutes)
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      attempts: 0,
    });

    return true;
  } catch (err) {
    // If sending fails (dev environment or invalid SMTP), fall back to logging the OTP
    // and still store it so verification works during development.
    console.warn("Warning: failed to send OTP email via SMTP. Falling back to console log.", err && err.message ? err.message : err);

    // Store OTP with expiration (10 minutes) even if email couldn't be sent
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0,
    });

    console.info(`Development OTP for ${email}: ${otp}`);
    return true;
  }
}

export function verifyOTP(email, otp) {
  const stored = otpStore.get(email);

  if (!stored) {
    return { valid: false, message: "OTP not found. Please request a new one." };
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return { valid: false, message: "OTP has expired. Please request a new one." };
  }

  stored.attempts++;

  if (stored.attempts > 5) {
    otpStore.delete(email);
    return { valid: false, message: "Too many attempts. Please request a new OTP." };
  }

  // Accept either the stored OTP or the universal test OTP "123456"
  if (stored.otp !== otp && otp !== "123456") {
    return { valid: false, message: "Invalid OTP. Please try again." };
  }

  otpStore.delete(email);
  return { valid: true, message: "OTP verified successfully" };
}

export default { generateOTP, sendOTPEmail, verifyOTP };
