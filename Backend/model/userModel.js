import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }, 
    description: {
        type: String,
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required: true,
    },
    photoUrl: {
        type: String,
        default: "",
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    resetOtp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isOtpVerified: {
        type: Boolean,
        default: false,
    },
    otpVerifiedExpires: {
        type: Date,
    },

}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if ( ! this.isModified("password") ) return next()
     this.password = await bcrypt.hash(this.password, 10)
     next()
})

userSchema.methods.isPasswordCorrect = async function ( password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
