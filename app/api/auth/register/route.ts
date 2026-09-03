import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    await connectDB()

    const { username, email, password } = await request.json()

    if (!username || !email || !password) {
        return Response.json({
            message: "Bad Request"
        },
            {
                status: 400
            });
    }

    const part = email.split("@")
    if (part.length !== 2 || part[0] == "" || part[1] == "") {
        return Response.json({
            message: "Bad Request"
        },
            {
                status: 400
            });
    }

    const existingUser = await User.findOne({
        email: email
    })

    if (existingUser) {
        return Response.json({
            message: "User Exists"
        },
            {
                status: 409
            }
        )
    }

    if(password.length < 6){
        return Response.json({
            message: "Password Must be atleast 6 characters"
        },
        {
            status: 400
        });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const success = await User.create({
        username: username,
        email: email,
        password: hashPassword
    })

    if (success) {
        return Response.json({
            message: "You can Login",
            data: success
        })
    }

    return Response.json({
        message: "Error"
    })



}