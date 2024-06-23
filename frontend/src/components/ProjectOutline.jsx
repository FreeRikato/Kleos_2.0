import React from 'react';

const ProjectOutline = ({ project }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-2">Project Outline</h2>
    <h3 className="text-xl font-semibold mb-2">Project Title</h3>
    <p className="mb-4">{project.project_title}</p>
    <h3 className="text-xl font-semibold mb-2">Project Description</h3>
    <p className="mb-4">{project.project_description}</p>
    <h3 className="text-xl font-semibold mb-2">Technology Stack</h3>
    <ul className="list-disc pl-5">
      {project.technology_stack.map((tech, index) => (
        <li key={index}>{tech}</li>
      ))}
    </ul>
  </div>
);

export default ProjectOutline;
