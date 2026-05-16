export function SuccessToast({ message, visible }: { message: string; visible: boolean }) {
    return (
        <div
            className={`fixed inset-x-0 top-8 flex justify-center z-50 transition-opacity duration-500 ${
                visible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium">
                {message}
            </div>
        </div>
    );
}
