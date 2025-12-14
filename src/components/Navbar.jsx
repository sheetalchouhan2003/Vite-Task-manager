function Navbar({ onAddClick }) {
  return (
    <div className="flex justify-between items-center px-6 py-3 border-b border-slate-700 bg-slate-800">
      <h2 className="text-xl font-semibold text-emerald-400">
        Task Manager
      </h2>

      <button
        onClick={onAddClick}
        className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 hover:bg-emerald-600 transition"
      >
        Add Task
      </button>
    </div>
  );
}

export default Navbar;
