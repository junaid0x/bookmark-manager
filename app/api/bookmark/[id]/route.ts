import { connectDB } from "@/lib/mongodb";
import { getUserId } from "@/lib/auth";
import Bookmark from "@/models/Bookmark";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    const userId = await getUserId();
    const { id } = await params;

    if (!userId) {
        return Response.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }


    const bookmark = await Bookmark.findOne({
        _id: id,
        userId: userId
    });

    

    if (!bookmark) {
        return Response.json(
            { message: "Bookmark not found" },
            { status: 404 }
        );
    }

    await Bookmark.deleteOne({
        _id: id
    });

    return Response.json({
        message: "Bookmark deleted"
    });
}


export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    const userId = await getUserId();

    if (!userId) {
        return Response.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    const { title, url, description, category } = await request.json();

    const bookmark = await Bookmark.findOne({
        _id: id,
        userId: userId
    });

    if (!bookmark) {
        return Response.json(
            { message: "Bookmark not found" },
            { status: 404 }
        );
    }

    bookmark.title = title;
    bookmark.url = url;
    bookmark.description = description;
    bookmark.category = category;

    await bookmark.save();

    return Response.json({
        message: "Bookmark updated",
        bookmark
    });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await connectDB();

    const userId = await getUserId();

    if (!userId) {
        return Response.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }

    const { id } = await params;

    const bookmark = await Bookmark.findOne({
        _id: id,
        userId: userId
    });

    if (!bookmark) {
        return Response.json(
            { message: "Bookmark not found" },
            { status: 404 }
        );
    }

    bookmark.isFavourite = !bookmark.isFavourite;

    await bookmark.save();

    return Response.json({
        message: "Favourite updated",
        bookmark
    });
}