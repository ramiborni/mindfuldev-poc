import {NextResponse} from "next/server";
import {MongoClient, ServerApiVersion} from "mongodb";

const username = process.env.MONGODB_USERNAME || "";
const password = process.env.MONGODB_PASSWORD || "";

const uri = `mongodb+srv://${username}:${password}@cluster0.89p64jy.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    console.log(uri)
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

export async function POST(req: Request) {
    await run();
    return NextResponse.json({message: "Hello, world!"});

}

export async function GET(req: Request) {
    await run();
    return NextResponse.json({message: "Hello, world!"});
}