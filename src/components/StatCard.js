"use client";

const StatCard = ({ title, value, subtitle }) => {
    return (
        <div className="p-4 rounded-lg shadow-sm bg-white border">
            <h2 className="text-sm text-gray-500 font-medium mb-1">{title}</h2>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
    );
};

export default StatCard;
