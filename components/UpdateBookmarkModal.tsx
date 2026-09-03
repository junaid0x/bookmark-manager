import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

type Bookmark = {
    _id: string;
    title: string;
    url: string;
    description: string;
    category: string;
};

type UpdateBookmarkModalProps = {
    bookmark: Bookmark;
    setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateBookmarkModal({
    bookmark,
    setShowUpdateModal
}: UpdateBookmarkModalProps) {

    const [title, setTitle] = useState(bookmark.title);
    const [url, setUrl] = useState(bookmark.url);
    const [description, setDescription] = useState(bookmark.description);
    const [category, setCategory] = useState(bookmark.category);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/bookmark/${bookmark._id}`, {
                method: "PUT",
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
                toast.error("Failed to update bookmark");
                setLoading(false);
                return;
            }

            toast.success("Bookmark updated successfully");

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
                                Update Bookmark
                            </h2>

                            <p className="text-sm text-[#464555] mt-1">
                                Update your bookmark details
                            </p>
                        </div>

                        <X
                            onClick={() => setShowUpdateModal(false)}
                            className="cursor-pointer"
                        />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-[#464555]">
                                Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-[#C7C4D8] rounded-lg px-4 py-3 outline-none focus:border-[#3525CD]"
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
                                <option value="Development">
                                    Development
                                </option>

                                <option value="Design">
                                    Design
                                </option>

                                <option value="Learning">
                                    Learning
                                </option>

                                <option value="Tools">
                                    Tools
                                </option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-2">

                            <button
                                type="button"
                                onClick={() => setShowUpdateModal(false)}
                                className="px-5 py-2.5 rounded-lg border border-[#C7C4D8] text-[#464555] hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-lg bg-[#3525CD] text-white font-semibold hover:bg-[#2b1fb0] transition-colors"
                            >
                                Update Bookmark
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}