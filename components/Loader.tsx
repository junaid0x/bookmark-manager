export default function Loading() {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C7C4D8] border-t-[#3525CD]" />
        </div>
    );
}