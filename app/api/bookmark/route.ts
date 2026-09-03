import { getUserId } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";

export async function POST(request:Request){
    await connectDB()
    const userId = await getUserId()

    if (!userId) {
    return Response.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }



    const {title, description, url, category} = await request.json()

    const bookmark = await Bookmark.create({
        userId,
        title,
        url,
        description,
        category
    });

    return Response.json({
    message: "Bookmark created",
    bookmark
    }, { status: 201 });
}

export async function GET(request:Request){
    await connectDB()
    const userId = await getUserId()


    if (!userId) {
    return Response.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }

    const bookmark = await Bookmark.find({userId: userId})

    return Response.json({
    message: "Bookmark is here",
    bookmark
    }, { status: 201 });
}