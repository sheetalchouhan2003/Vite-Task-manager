import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index, onEdit }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(task)}
          className="border border-slate-700 rounded-lg p-3 mb-3 bg-slate-900 cursor-pointer hover:bg-slate-800 transition"
        >
          <h4 className="font-medium text-slate-100">
            {task.title}
          </h4>

          <p className="text-sm text-slate-400 mt-1">
            {task.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs px-2 py-1 border border-slate-600 rounded text-slate-300">
              {task.priority}
            </span>

            <span className="text-xs text-slate-500">
              Due: {task.dueDate}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;

