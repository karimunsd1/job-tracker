import { Progress } from "./ui/progress.jsx";

export default function StatusBar({ title, data }) {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    return (
        <div className="p-4 rounded-lg shadow-sm bg-white border">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {Object.entries(data).map(([key, val]) => (
                <div key={key} className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{key}</span>
                        <span>{val} ({total > 0 ? Math.round((val / total) * 100) : 0}%)</span>
                    </div>
                    <Progress value={total > 0 ? (val / total) * 100 : 0} />
                </div>
            ))}
        </div>
    );
}
