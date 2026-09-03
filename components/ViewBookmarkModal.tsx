type ViewBookmarkModalProps = {
    bookmark: {
        title: string;
        url: string;
        description: string;
        category: string;
    };
    setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ViewBookmarkModal({
    bookmark,
    setShowViewModal
}: ViewBookmarkModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-[90%] max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <h2 className="text-2xl font-bold text-[#3525CD] mb-6">
                    Bookmark Details
                </h2>

                <div className="flex flex-col gap-4">

                    <div>
                        <p className="text-sm font-semibold text-[#464555]">
                            Title
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                            {bookmark.title}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#464555]">
                            URL
                        </p>
                        <p className="mt-1 break-all">
                            {bookmark.url}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#464555]">
                            Description
                        </p>
                        <p className="mt-1 text-[#464555]">
                            {bookmark.description || "No description"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-[#464555]">
                            Category
                        </p>
                        <span className="inline-block mt-1 bg-[#E5EEFF] px-2 py-1 rounded text-sm">
                            {bookmark.category || "No category"}
                        </span>
                    </div>

                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setShowViewModal(false)}
                        className="px-5 py-2.5 rounded-lg bg-[#3525CD] text-white font-semibold hover:bg-[#2b1fb0]"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}