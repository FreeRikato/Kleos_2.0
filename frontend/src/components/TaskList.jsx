import React from 'react';

const TaskList = ({ tasks, onSelectTask }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Table of Tasks</h2>
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className="mb-2">
          <button
            className="bg-gray-200 p-2 rounded-lg w-full text-left"
            onClick={() => onSelectTask(index)}
          >
            Task {index + 1}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;
