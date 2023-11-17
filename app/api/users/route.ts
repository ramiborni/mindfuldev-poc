import {NextResponse} from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function POST(req: Request) {
    return NextResponse.json({message: "Hello, world!"});

}

export async function GET(req: Request) {
    const user = await User.find({});
    return NextResponse.json(user);
}