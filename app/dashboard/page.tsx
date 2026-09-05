"use client"

import AddBookmarkModal from "@/components/AddBookmarkModal";
import BookmarkCard from "@/components/BookmarkCard";
import { ListFilter, ListSortDescending, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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

export default function Dashboard() {

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [showAddBookmark, setShowAddBookmark] = useState(false);
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [showSort, setShowSort] = useState(false);

    useEffect(() => {
        const getBookmarks = async () => {
            try {
                const response = await fetch("/api/bookmark", {
                    method: "GET",
                });

                if (!response.ok) {
                    toast.error("Failed to load bookmarks");
                    return;
                }

                const data = await response.json();

                setBookmarks(data.bookmark);


            } catch (error) {
                console.log("Error:", error);
                toast.error("Something went wrong");
            }
        };

        getBookmarks();
    }, []);

    const filteredBookmarks = bookmarks.filter((bookmark) => {
        const matchesSearch =
            bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(search.toLowerCase()) ||
            bookmark.category.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === "" ||
            bookmark.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
        if (sortOption === "newest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        if (sortOption === "oldest") {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        if (sortOption === "a-z") {
            return a.title.localeCompare(b.title);
        }

        if (sortOption === "z-a") {
            return b.title.localeCompare(a.title);
        }

        return 0;
    });

    const categories = [...new Set(
        bookmarks.map((bookmark) => bookmark.category)
    )];


    return (
        <div className="w-full h-screen bg-[#F8F9FF]">
            {/* Header */}
            <div className="hidden md:flex font-black text-[#3525CD] text-[28px] md:p-4  border-b-2 border-[#C7C4D8]">
                Bookmarkly
            </div>

            {/* Mid Section */}
            <div className="md:px-6 md:py-8 px-3 py-2">
                <h1 className="md:text-[28px] text-[20px] font-semibold">
                    Good evening, <span className="text-[#3525CD]">John</span> 👋 <br />
                    Here's what's happening with your bookmarks.
                </h1>
            </div>

            {/* Title */}
            <div className="flex flex-row justify-between items-center md:px-5 md:py-2 px-3 py-2">
                <h1 className="font-black md:text-4xl text-xl">My Bookmarks</h1>
                <button onClick={() => setShowAddBookmark(true)} className="text-white bg-[#3525CD] md:text-[14px] text-[12px] flex flex-row justify-center items-center md:py-2 md:px-6 py-2 px-4 font-semibold gap-2 rounded">
                    <Plus className="w-5 h-5" />
                    Add Bookmark
                </button>
            </div>

            {/* inputs */}
            <div className="w-full flex flex-row md:px-5 md:py-4 px-2 py-1 gap-2">
                <form action="" className="md:w-[75%] w-full relative">
                    <input type="text" placeholder="Search by title, domain.." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full  md:py-2 py-2 md:pl-10 pl-10 bg-white rounded border border-[#C7C4D8]" />
                    <Search color="#777587" className="absolute top-2 left-2" />
                </form>

                {/* Filter Button */}
                <div className="relative hidden md:block flex-1">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="w-full flex flex-row justify-center items-center h-8 md:py-5 bg-white rounded border gap-2 border-[#C7C4D8]"
                    >
                        <ListFilter className="w-4 h-4" />
                        <span className="text-[16px]">Filter</span>
                    </button>

                    {showFilter && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-[#C7C4D8] rounded shadow-md z-10">

                            <button
                                onClick={() => setCategoryFilter("")}
                                className="w-full text-left px-4 py-2 hover:bg-[#F8F9FF]"
                            >
                                All
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setCategoryFilter(category)}
                                    className="w-full text-left px-4 py-2 hover:bg-[#F8F9FF]"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort */}
                <div className="relative hidden md:block flex-1">
                    <button
                        onClick={() => setShowSort(!showSort)}
                        className="w-full flex flex-row justify-center items-center h-8 md:py-5 bg-white rounded border gap-2 border-[#C7C4D8]"
                    >
                        <ListSortDescending className="w-4 h-4" />
                        <span className="text-[16px]">Sort</span>
                    </button>

                    {showSort && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-[#C7C4D8] rounded shadow-md z-10">
                            <button
                                onClick={() => setSortOption("newest")}
                                className="w-full text-left px-4 py-2 hover:bg-[#F8F9FF]"
                            >
                                Newest
                            </button>

                            <button
                                onClick={() => setSortOption("oldest")}
                                className="w-full text-left px-4 py-2 hover:bg-[#F8F9FF]"
                            >
                                Oldest
                            </button>

                            <button
                                onClick={() => setSortOption("a-z")}
                                className="w-full text-left px-4 py-2 hover:bg-[#F8F9FF]"
                            >
                                A → Z
                            </button>

                            <button
                                onClick={() => setSortOption("z-a")}
                                className="w-full text-left px-4 py-2 hover:bg-[#F8F9FF]"
                            >
                                Z → A
                            </button>
                        </div>
                    )}
                </div>
            </div>


            {/* Cards */}
            <div className="flex flex-col md:flex-row md:px-5 px-4 py-3 gap-3">
                {sortedBookmarks.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark._id}
                        bookmark={bookmark}
                    />
                ))}
            </div>
            {/* Modal */}

            {showAddBookmark && <AddBookmarkModal setShowAddBookmark={setShowAddBookmark} />}

        </div>
    )
}