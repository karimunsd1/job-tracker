import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Empty({ onAdd }) {
    return (
        <div className="text-center py-20">
            <div className="flex justify-center mb-4">
                <FileIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold">No applications found</h2>
            <p className="text-gray-500 mt-1">
                Try adjusting your filters or search terms.
            </p>
            <Button
                onClick={onAdd}
                className="mt-6"
                variant="default"
            >
                + Add Your First Application
            </Button>
        </div>
    );
}
