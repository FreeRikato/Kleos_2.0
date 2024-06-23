import React, { useState, useEffect } from 'react';
import ProjectOutline from './components/ProjectOutline';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import axios from 'axios';

const App = () => {
  const [sampleData, setSampleData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/run-python')
      .then(response => {
        const data = response.data;
        // Preprocess the data if needed
        setSampleData(data);
        // This will log the data to the console
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  }, []);

  const handleSelectTask = (taskIndex) => {
    setSelectedTask(taskIndex);
  };

  const handleShowProjectOutline = () => {
    setSelectedTask(null);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!sampleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <button 
          onClick={handleShowProjectOutline} 
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Show Project Outline
        </button>
        <TaskList tasks={sampleData.task_elaboration} onSelectTask={handleSelectTask} />
      </div>
      <div className="w-3/4 p-4">
        {selectedTask !== null ? (
          <TaskDetails task={sampleData.task_elaboration[selectedTask]} />
        ) : (
          <ProjectOutline project={sampleData} />
        )}
      </div>
    </div>
  );
};

export default App;
