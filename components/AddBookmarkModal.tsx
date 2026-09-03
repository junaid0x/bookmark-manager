import { Cross, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function AddBookmarkModal({ setShowAddBookmark }: { setShowAddBookmark: React.Dispatch<React.SetStateAction<boolean>> }) {



    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/bookmark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    url,
                    description,
                    category
                })
            });

            if (!response.ok) {
                toast.error("Failed to create bookmark");
                setLoading(false);
                return;
            }

            toast.success("Bookmark added successfully");
            
            setTimeout(() => {
            window.location.reload();
            }, 500);

        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <>
        {loading && <Loader />}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-[90%] max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <div className="flex flex-row justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[#3525CD]">
                            Add Bookmark
                        </h2>
                        <p className="text-sm text-[#464555] mt-1">
                            Save a bookmark to your collection
                        </p>
                    </div>
                    <X onClick={() => setShowAddBookmark(false)} />

                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[#464555]">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="React Fundamentals"
                            className="border border-[#C7C4D8] rounded-lg px-4 py-3 outline-none focus:border-[#3525CD]"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[#464555]">
                            URL
                        </label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="border border-[#C7C4D8] rounded-lg px-4 py-3 outline-none focus:border-[#3525CD]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[#464555]">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What is this bookmark about?"
                            rows={3}
                            className="border border-[#C7C4D8] rounded-lg px-4 py-3 outline-none resize-none focus:border-[#3525CD]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-[#464555]">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-[#C7C4D8] rounded-lg px-4 py-3 outline-none focus:border-[#3525CD]"
        
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Development">Development</option>
                            <option value="Design">Design</option>
                            <option value="Learning">Learning</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            onClick={() => setShowAddBookmark(false)}
                            type="button"
                            className="px-5 py-2.5 rounded-lg border border-[#C7C4D8] text-[#464555] hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-[#3525CD] text-white font-semibold hover:bg-[#2b1fb0] transition-colors"
                        >
                            Save Bookmark
                        </button>
                    </div>

                </form>
            </div>
        </div>
        </>
    );
}