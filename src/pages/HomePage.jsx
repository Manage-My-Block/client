export default function HomePage() {
    return <div className="h-screen grid grid-rows-[1fr_2fr]">
        <div className="grid grid-cols-[2fr_3fr]">
            <div className="bg-gray-800">Building Picture</div>
            <div className="bg-gray-700">Building Contacts</div>
        </div>
        <div className="bg-gray-600">
            Dashboard
        </div>
    </div>
}