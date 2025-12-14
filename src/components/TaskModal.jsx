import { useState } from "react";

function TaskModal({
  task,
  onClose,
  onAddTask,
  onUpdateTask,
  onDeleteTask
}) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "Low");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (task) {
      onUpdateTask({
        ...task,
        title,
        description,
        priority,
        dueDate,
      });
    } else {
      onAddTask({
        id: Date.now(),
        title,
        description,
        priority,
        status: "To-Do",
        dueDate,
        createdAt: new Date().toISOString().split("T")[0],
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-[90%] max-w-md p-6">
        
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          {task ? "Edit Task" : "Add New Task"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:outline-none"
          />

          <div className="flex justify-end gap-2 pt-4">
            {task && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Delete this task?")) {
                    onDeleteTask(task.id);
                  }
                }}
                className="px-4 py-2 border border-red-500 text-red-400 rounded hover:bg-red-500/10 transition"
              >
                Delete
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded hover:bg-slate-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-slate-900 rounded hover:bg-emerald-600 transition"
            >
              {task ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

