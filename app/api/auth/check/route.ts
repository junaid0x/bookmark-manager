import { getUserId } from "@/lib/auth";

export async function GET(request: Request) {
    const userId = await getUserId();

    if (!userId) {
        return Response.json(
            { message: "Not Authorized" },
            { status: 401 }
        );
    }

    return Response.json({
        message: "Authorized",
        userId
    });

}