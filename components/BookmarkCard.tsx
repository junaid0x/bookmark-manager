import { Edit2Icon, Eye, Star, Trash2Icon } from "lucide-react";
import { useState } from "react";
import DeleteBookmarkModal from "./DeleteBookmarkModal";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import ViewBookmarkModal from "./ViewBookmarkModal";
import UpdateBookmarkModal from "./UpdateBookmarkModal";


type Bookmark = {
    _id: string;
    title: string;
    url: string;
    description: string;
    category: string;
    isFavourite: boolean;
    createdAt: string;
    updatedAt: string;
};


export default function BookmarkCard({
    bookmark
}: {
    bookmark: Bookmark;
}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isFavourite, setIsFavourite] = useState(bookmark.isFavourite);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/bookmark/${bookmark._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                toast.error("Failed to delete bookmark");
                setLoading(false)
                return;
            }

            toast.success("Bookmark deleted");
            setShowDeleteModal(false);

            setTimeout(() => {
                window.location.reload();
            }, 500);


        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    const handleFavourite = async () => {
        try {
            const response = await fetch(`/api/bookmark/${bookmark._id}`, {
                method: "PATCH",
            });

            if (!response.ok) {
                toast.error("Failed to update favourite");
                return;
            }

            setIsFavourite(!isFavourite);

        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>{loading && <Loader />}
            <div className="border border-[#C7C4D8] flex flex-col justify-between py-4 rounded bg-white w-100 h-70">
                <div className="flex flex-row justify-between px-6">
                    <p className="text-[#464555]">{bookmark.url}</p>
                    
                    <Star
                        onClick={handleFavourite}
                        className={`w-5 h-5 ${isFavourite
                            ? "fill-[#3525CD] text-[#3525CD]"
                            : "text-[#464555]"
                            }`}
                    />
                </div>
                <div className="flex flex-col gap-1 py-3 px-6">
                    <h1 className="font-black text-3xl line-clamp-1">{bookmark.title}</h1>
                    <p className="text-[#464555] line-clamp-3">{bookmark.description}</p>
                    <span className="self-start text-[#464555] bg-[#E5EEFF] py-1.5 px-2 rounded text-[13px]">{bookmark.category}</span>
                </div>
                <hr className="w-[90%] mx-auto text-[#C7C4D8]" />
                <div className="flex flex-row gap-2 justify-between pr-5">
                    <span className="pl-6">{new Date(bookmark.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    })}</span>
                    <div className="flex flex-row gap-2">
                        <button>
                            <Eye onClick={() => setShowViewModal(true)} className="w-5 h-5 text-[#464555] hover:text-[#3525CD] transition-colors duration-200" />
                        </button>
                        <button>
                            <Edit2Icon onClick={() => setShowUpdateModal(true)} className="w-5 h-5 text-[#464555] hover:text-[#3525CD] transition-colors duration-200" />
                        </button>
                        <button onClick={() => setShowDeleteModal(true)}>
                            <Trash2Icon className="w-5 h-5 text-[#464555] hover:text-[#ED2D1C] transition-colors duration-200" />
                        </button>
                    </div>
                </div>

                {showDeleteModal && (
                    <DeleteBookmarkModal
                        bookmarkId={bookmark._id}
                        setShowDeleteModal={setShowDeleteModal}
                        handleDelete={handleDelete}
                    />
                )}

                {showViewModal && (
                    <ViewBookmarkModal
                        bookmark={bookmark}
                        setShowViewModal={setShowViewModal}
                    />
                )}

                {showUpdateModal && (
                    <UpdateBookmarkModal
                        bookmark={bookmark}
                        setShowUpdateModal={setShowUpdateModal}
                    />
                )}
            </div>
        </>

    );
}