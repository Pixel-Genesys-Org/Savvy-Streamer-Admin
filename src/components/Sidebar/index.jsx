import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5 space-y-4">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <nav className="flex flex-col gap-2">
                <div to="/" className="hover:bg-gray-800 p-2 rounded">Dashboard</div>
                <div to="/products" className="hover:bg-gray-800 p-2 rounded">Products</div>
            </nav>
        </div>
    );
};

export default Sidebar;
