import React from "react";

type DashboardProps = {
  undo: (() => void) | null;
  redeal: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ undo, redeal }) => {
  return (
    <section className="flex w-full justify-between mt-6">
      <div className="flex gap-2 w-full">
        <button
          onClick={undo || undefined}
          disabled={!undo}
          className={`px-4 py-2 border rounded text-sm ${
            undo
              ? "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Undo
        </button>

        <button
          onClick={redeal}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          New Deal
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
