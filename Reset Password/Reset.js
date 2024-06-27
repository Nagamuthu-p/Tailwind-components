router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // const otp = crypto.randomBytes(3).toString("hex");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const mailOptions = {
      from: "vulturelines@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email." });
      }
      res.status(200).json({ message: "OTP sent to email." });
    });
  } catch (err) {
    console.error("Error during forgot password:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (
      user.resetPasswordOtp !== otp ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Error during password reset:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

module.exports = router;