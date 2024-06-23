import React from 'react';

const TaskDetails = ({ task }) => {
  console.log(task);
  if (!task || !task["STEPS AND SUB-TASKS"]) {
    return <div>No task details available</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{task["TASK TITLE"]}</h2>
      {/* <h3 className="text-xl font-semibold mb-2">Task Context</h3>
      <p className="mb-4">{task["TASK CONTEXT"]}</p> */}
      <h3 className="text-xl font-semibold mb-2">Objectives</h3>
      <ul className="list-disc pl-5 mb-4">
        {task.OBJECTIVES.map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">Steps and Sub-tasks</h3>
      {task["STEPS AND SUB-TASKS"].map((step, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-lg font-semibold">{step.STEP}</h4>
          {step["SUB-TASKS"] ? (
            <ul className="list-disc pl-5">
              {step["SUB-TASKS"].map((sub, subIndex) => (
                <li key={subIndex}>{sub}</li>
              ))}
            </ul>
          ) : (
            <p>No sub-tasks available</p>
          )}
        </div>
      ))}
      {/* <h3 className="text-xl font-semibold mb-2">Tools and Technologies</h3>
      <ul className="list-disc pl-5 mb-4">
        {task['TOOLS AND TECHNOLOGIES'].map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul> */}
      {/* <h3 className="text-xl font-semibold mb-2">Dependencies</h3>
      <ul className="list-disc pl-5 mb-4">
        {task['DEPENDENCIES'].map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul> */}
      <h3 className="text-xl font-semibold mb-2">Expected Challenges</h3>
      <ul className="list-disc pl-5 mb-4">
        {task['EXPECTED CHALLENGES'].map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul>
      {/* <h3 className="text-xl font-semibold mb-2">Expected Outcome</h3>
      <ul className="list-disc pl-5 mb-4">
        {task['EXPECTED OUTCOMES'].map((obj, index) => (
          <li key={index}>{obj}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default TaskDetails;
