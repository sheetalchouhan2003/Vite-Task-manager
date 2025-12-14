import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Board({ title, tasks, onEditTask }) {
  const filteredTasks = tasks.filter(
    (task) => task.status === title
  );

  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex-1 bg-slate-800 rounded-xl p-4 min-h-[300px] border border-slate-700"
        >
          <h3 className="font-semibold mb-3 text-slate-200">
            {title}
          </h3>

          {filteredTasks.length === 0 ? (
            <p className="text-sm text-slate-500">
              No tasks
            </p>
          ) : (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
              />
            ))
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Board;
