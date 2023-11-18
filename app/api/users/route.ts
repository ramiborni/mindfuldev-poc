import {NextResponse} from "next/server";
import User, {IStressLog} from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function POST(req: Request) {
    const body: IStressLog = await req.json();
    const stressLog = await User.updateOne(
        {
            _id: "6557bbe9089c56339e172b05"
        },
        {
            $push: {
                stressLog: body
            }
        }
    )
    return NextResponse.json({
        message: "Stress log added"
    });
}

export async function GET(req: Request) {
    const user = await User.find({});
    return NextResponse.json(user);
}