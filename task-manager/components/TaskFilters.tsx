import { TaskStatus } from '@/types/task';

interface TaskFiltersProps {
  statusFilter: TaskStatus | 'all';
  setStatusFilter: (status: TaskStatus | 'all') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export default function TaskFilters({
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-50">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Status
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
        >
          <option value="all">All Tasks</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="flex-1 min-w-50">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
          Sort by Due Date
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
        >
          <option value="asc">Earliest First</option>
          <option value="desc">Latest First</option>
        </select>
      </div>
    </div>
  );
}