function Filters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 px-6 py-4 bg-blue-900 border-b border-blue-800">
      
      {/* Priority Filter */}
      <select
        className="bg-blue-950 text-white border border-blue-700 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.priority}
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Status Filter */}
      <select
        className="bg-blue-950 text-white border border-blue-700 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="To-Do">To-Do</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Sort */}
      <select
        className="bg-blue-950 text-white border border-blue-700 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.sort}
        onChange={(e) =>
          setFilters({ ...filters, sort: e.target.value })
        }
      >
        <option value="">No Sorting</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="due">Closest Due Date</option>
      </select>
    </div>
  );
}

export default Filters;

