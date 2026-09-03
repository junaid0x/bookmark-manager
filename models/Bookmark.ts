import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        required: true
    },

},{
    timestamps: true
})

const Bookmark = mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema)

export default Bookmark