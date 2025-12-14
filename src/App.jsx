import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import TaskModal from "./components/TaskModal";
import tasksData from "./data/tasks.json";
import { DragDropContext } from "@hello-pangea/dnd";
import Filters from "./components/Filters";

function App() {
  // TASKS (localStorage aware)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : tasksData;
  });

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // FILTERS
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    sort: "",
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ADD TASK
  function addTask(task) {
    setTasks((prev) => [...prev, task]);
  }

  // UPDATE TASK
  function updateTask(updatedTask) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
  }

  // DELETE TASK
  function deleteTask(id) {
    if (window.confirm("Delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setSelectedTask(null);
    }
  }

  // ADD BUTTON
  function handleAddClick() {
    setSelectedTask(null);
    setShowModal(true);
  }

  // EDIT TASK
  function handleEditTask(task) {
    setSelectedTask(task);
    setShowModal(true);
  }

  // DRAG & DROP
  function handleDragEnd(result) {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    setTasks((prev) =>
      prev.map((task) =>
        task.id.toString() === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );
  }

  // FILTER + SORT LOGIC 
  const filteredTasks = tasks
    .filter((task) => {
      if (filters.priority && task.priority !== filters.priority)
        return false;

      if (filters.status && task.status !== filters.status)
        return false;

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filters.sort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (filters.sort === "due") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50">
        <Navbar onAddClick={handleAddClick} />

        {/* FILTER UI */}
        <Filters filters={filters} setFilters={setFilters} />

        <div className="p-4 flex flex-col md:flex-row gap-4">
          <Board
            title="To-Do"
            tasks={filteredTasks}
            onEditTask={handleEditTask}
          />
          <Board
            title="In-Progress"
            tasks={filteredTasks}
            onEditTask={handleEditTask}
          />
          <Board
            title="Completed"
            tasks={filteredTasks}
            onEditTask={handleEditTask}
          />
        </div>

        {showModal && (
          <TaskModal
            task={selectedTask}
            onClose={() => setShowModal(false)}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
      </div>
    </DragDropContext>
  );
}

export default App;

