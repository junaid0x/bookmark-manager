
type DeleteBookmarkModalProps = {
    bookmarkId: string;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: () => void;
};


export default function DeleteBookmarkModal({
    bookmarkId,
    setShowDeleteModal,
    handleDelete
}: DeleteBookmarkModalProps) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

            <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-xl">

                <h2 className="text-xl font-bold">
                    Delete Bookmark?
                </h2>

                <p className="mt-2 text-[#464555]">
                    Are you sure you want to delete this bookmark?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-2 rounded border border-[#C7C4D8]"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        type="button"
                        className="px-4 py-2 rounded bg-[#ED2D1C] text-white"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}