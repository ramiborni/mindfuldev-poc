import mongoose from "mongoose";

export interface IStressLog{
    detectedByCodeStress: boolean;
    detectedByTextStress: boolean;
    detectedDate: number;
}

export interface IUser extends mongoose.Document {
    firstname: string;
    lastname: string;
    role: string;
    joinDate?: string;
    stressLog: IStressLog[];
}

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide a firstname"],
    },
    lastname: {
        type: String,
        required: [true, "Please provide a lastname"],
        unique: true,
    },
    role: {
        type: String,
        required: [true, "Please provide a role"],
    },
    joinDate: {
        type: String,
    },
    stressLog: {
        type: Array<IStressLog>,
    },
})

const User = mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;