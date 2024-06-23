from dotenv import load_dotenv
import os
from pprint import pprint
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.output_parsers import JsonOutputParser
import json
from langgraph.graph import END, StateGraph
from typing import List, Dict
from typing_extensions import TypedDict, Literal
import sys
import json

def main():
    # Load the environment variables from the .env file
    load_dotenv()

    # Get the API key
    api_key = os.getenv('GROQ_API_KEY')
    # GROQ_LLM = ChatGroq(
    #             model="llama3-70b-8192",
    #             model_kwargs={"response_format": {"type": "json_object"}}
    #         )

    GROQ_LLM = ChatGroq(
                model="llama3-70b-8192",
                model_kwargs={"response_format": {"type": "json_object"}}
            )

    def print_response(response):
        pretty_json = json.dumps(response, indent=2)
        print(pretty_json)

    def JSONtoString(response):
        pretty_json = json.dumps(response, indent=2)
        return pretty_json


    # Generate Project Outline

    prompt = PromptTemplate(
        template="""
        Generate project outline for the below input that is project title, project description and technology stack to be used in the project. Return as JSON with three keys -> Project Title, Project Description and Technology Stack. If the user doesn't provide any project input and provides job description or asks for project ideas then choose a suitable project idea yourself

        input = {User Input}
        """,
        input_variables=["User Input"],
    )

    project_outline_generator = prompt | GROQ_LLM | JsonOutputParser()

    ## Project to Task Breakdown
    task_breakdown = PromptTemplate(
        template="""
        Understand the Project Requirements - Review the project title and description to get a clear understanding of the project goals. Analyze the technology stack to understand the tools and technologies you'll be working with. Identify Major Components - Divide the project into major components or modules based on the project description. These could be features, functionalities, or phases of the project. Break Down Components into 5 to 7 Tasks - For each major component, list the specific tasks needed to complete that component. Ensure that each task is a manageable, concise unit of work. Prioritize and Sequence Tasks - Determine the order in which tasks should be completed, considering dependencies between tasks.

        Strictly make sure the number of tasks is 5 to 7


        Here are the project details:
        {project_title}
        {project_description}
        {technology_stack}
        
        Breakdown the Project into modular tasks returning in a JSON format of keys as index (0, 1, 2 ..) and value as task title, makes sure the task title is short and self explanatory. Avoid long jargon task titles. 
        """,
        input_variables=["project_title","project_description", "technology_stack"],
    )

    task_breakdown_bot = task_breakdown | GROQ_LLM | JsonOutputParser()

    task_breakdown = PromptTemplate(
        template="""
        You are an expert in providing detailed guidance for specific tasks based solely on the task title and project details provided. 

        Please follow these guidelines:

            - Use the provided task title to understand the specific requirement.
            - Refer to the project title and description for context and alignment.
            - Consider the technology stack to ensure that your task elaboration is technically accurate and feasible.
            - Ensure Proper JSON Format: The JSON output must adhere to the following rules:
                - Keys and string values must be enclosed in double quotes ("").
                - Special characters within string values must be escaped with a double backslash (\\\\).
                - All JSON elements (objects and arrays) must be correctly closed.
                - Every key must have a corresponding value, and there must be no trailing commas.

        Now, please provide the JSON output for the following input:
        Here is the task title:
        {task_title}

        Here are the project details:
        {project_title}
        {project_description}
        {technology_stack}

        Your task is to generate a JSON object with the following keys (Do not change the spelling of the key below strictly):
        - "TASK TITLE"
        - "OBJECTIVES"
        - "STEPS AND SUB-TASKS"
        - "EXPECTED CHALLENGES"

        Please ensure your response:
        - Uses clear and specific language to detail each section.
        - Provides context by linking the task to the overall project goals.
        - Includes a step-by-step breakdown of the process required to complete the task.
        - Lists the tools and technologies necessary to accomplish the task, ensuring they align with the specified technology stack.
        - Identifies any dependencies that might affect task completion.
        - Anticipates potential challenges and suggests ways to address them.
        - Clearly states the expected outcome, detailing what a successful completion of the task looks like.

        Here is an example format to follow strictly (used angular brackets instead of curly brackets):
        <
            "TASK TITLE": "*Task Title*",
            "OBJECTIVES": [
                "*Objective 1*",
                "*Objective 2*"
            ],
            "STEPS AND SUB-TASKS": [
                <
                    "STEP": "*Step 1*",
                    "SUB-TASKS": [
                        "*Sub-task 1*",
                        "*Sub-task 2*",
                        "*Sub-task 3*"
                    ]
                >,
                <
                    "STEP": "*Step 2*",
                    "SUB-TASKS": [
                        "*Sub-task 1*",
                        "*Sub-task 2*",
                        "*Sub-task 3*"
                    ]
                >
            ],
            "EXPECTED CHALLENGES": [
                "*Challenge 1*",
                "*Challenge 2*",
                "*Challenge 3*"
            ]
        >
        """,
        input_variables=["task_title","project_title","project_description", "technology_stack"],
    )

    task_elaboration_bot = task_breakdown | GROQ_LLM | JsonOutputParser()


    # Task Improvement router

    self_reflection_needed = PromptTemplate(
        template="""
        You are an expert in analysing tasks and decide if it needs any self reflection or improvement to be made. Give me a score out of 10 in the JSON format with key "Final Score" based on the task elaboration and Rubricks provided.

        1. Clarity of Objectives (1 point)

            0 points: Objectives are unclear or not defined.
            0.5 points: Objectives are partially defined, lacking detail.
            1 point: Objectives are clearly defined and detailed.

        2. Feasibility (1 point)

            0 points: The task is not feasible for a single person.
            0.5 points: The task is somewhat feasible but may require more resources or time than available.
            1 point: The task is completely feasible for a single person given the available resources and time.

        3. Scope and Complexity (1 point)

            0 points: The task is too broad or too complex for a single person to handle.
            0.5 points: The task has a moderate level of complexity and scope.
            1 point: The task has a well-defined scope and an appropriate level of complexity.

        4. Creativity and Innovation (1 point)

            0 points: The task lacks creativity or innovation.
            0.5 points: The task shows some creativity and innovation but is not particularly unique.
            1 point: The task is highly creative and innovative.

        5. Relevance and Impact (1 point)

            0 points: The task is not relevant or impactful.
            0.5 points: The task has moderate relevance and impact.
            1 point: The task is highly relevant and has a significant impact.

        6. Resource Allocation (1 point)

            0 points: Resources required for the task are not well-defined or are unrealistic.
            0.5 points: Some resources are well-defined, but there are gaps.
            1 point: All necessary resources are clearly defined and realistic.

        7. Timeline and Milestones (1 point)

            0 points: There is no clear timeline or milestones.
            0.5 points: The timeline and milestones are partially defined but lack detail.
            1 point: The timeline and milestones are clearly defined and detailed.

        8. Quality of Research and Planning (1 point)

            0 points: Research and planning are insufficient or non-existent.
            0.5 points: Some research and planning are evident, but they are incomplete or inadequate.
            1 point: Thorough research and planning are evident.

        9. Implementation Strategy (1 point)

            0 points: There is no clear implementation strategy.
            0.5 points: The implementation strategy is partially defined.
            1 point: The implementation strategy is clearly defined and realistic.

        10. Evaluation and Feedback Mechanisms (1 point)

            0 points: There are no evaluation or feedback mechanisms.
            0.5 points: Evaluation and feedback mechanisms are partially defined.
            1 point: Evaluation and feedback mechanisms are clearly defined and effective.

        Here is the task title:
        {task_title}

        Here are the project details:
        {project_title}
        {project_description}
        {technology_stack}

        Here is the task elaboration:
        {task_elaboration}
        """,
        input_variables=["task_title","project_title","project_description", "technology_stack", "task_elaboration"],
    )

    self_reflection_route = self_reflection_needed | GROQ_LLM | JsonOutputParser()

    class ProjectState(TypedDict):
        user_input: str
        project_title: str
        project_description: str
        technology_stack: List[str]
        task_breakdown: Dict[str, str]
        task_elaboration: List[Dict[str, str]]
        self_reflection_score: float
        # self_reflection_review: Dict[str, str] = Field(default_factory=dict, description="Self-reflection review as a dictionary that can be changed often")
        number_of_steps: int  # Non-negative integer
        number_of_tasks_finished: int  # Non-negative integer

    def outline_of_the_project(state):
        """Drafting outline of the project based on the user input"""
        USER_INPUT = state['user_input']
        number_of_steps = int(state['number_of_steps'])
        number_of_steps += 1

        project_outline = project_outline_generator.invoke({"User Input": USER_INPUT})


        project_description = project_outline['Project Description']
        project_title = project_outline['Project Title']
        technology_stack = project_outline['Technology Stack']


        state['project_title'] = project_title
        state['project_description'] = project_description
        state['technology_stack'] = technology_stack

        return {"project_title": project_title, "project_description": project_description,
        "technology_stack" : technology_stack, "number_of_steps":number_of_steps}

    def breakdown_project_into_tasks(state):
        """Breaking down the Project into tasks for better understanding and management"""
        project_description = state['project_description']
        project_title = state['project_title']
        technology_stack = state['technology_stack']
        number_of_steps = int(state['number_of_steps'])
        number_of_steps += 1

        broken_tasks = task_breakdown_bot.invoke({
        "project_title": project_title, 
        "project_description":project_description, 
        "technology_stack":technology_stack
        })

        state['task_breakdown'] = broken_tasks

        return {"project_title": project_title, "project_description": project_description,
        "technology_stack" : technology_stack, "number_of_steps":number_of_steps, "task_breakdown": broken_tasks}

    def task_elaborate_append(state):
        """Elaborating on the tasks to provide more detailed guidance"""
        project_description = state['project_description']
        project_title = state['project_title']
        technology_stack = state['technology_stack']
        number_of_steps = int(state['number_of_steps'])
        number_of_steps += 1
        number_of_tasks_finished = int(state['number_of_tasks_finished'])
        task_to_be_elaborated = state['task_breakdown'][str(number_of_tasks_finished)]
        number_of_tasks_finished += 1

        elaborated_task = task_elaboration_bot.invoke({
        "task_title": task_to_be_elaborated,
        "project_title": project_title, 
        "project_description":project_description, 
        "technology_stack":technology_stack
        })

        broken_tasks = state['task_breakdown']

        task_elaboration = state['task_elaboration']
        task_elaboration.append(elaborated_task)

        return {"project_title": project_title, "project_description": project_description,
        "technology_stack" : technology_stack, "number_of_steps":number_of_steps, "task_breakdown": broken_tasks, "task_elaboration": task_elaboration, "number_of_steps":number_of_steps, "number_of_tasks_finished": number_of_tasks_finished}

    def task_elaborate_route(state):
        
        number_of_tasks_finished = int(state['number_of_tasks_finished'])
        task_to_be_elaborated = state['task_breakdown']
        
        if number_of_tasks_finished == len(task_to_be_elaborated):
            return "END"
        else:
            state['number_of_tasks_finished'] = number_of_tasks_finished + 1
            return "task_elaborate_append"



    workflow = StateGraph(ProjectState)

    # Define the nodes
    workflow.add_node("outline_of_the_project", outline_of_the_project)
    workflow.add_node("breakdown_project_into_tasks", breakdown_project_into_tasks)
    workflow.add_node("task_elaborate_append", task_elaborate_append)
    # workflow.add_node("task_self_reflect_analyse", task_self_reflect_analyse)

    workflow.set_entry_point("outline_of_the_project")
    workflow.add_edge("outline_of_the_project", "breakdown_project_into_tasks")
    workflow.add_edge("breakdown_project_into_tasks", "task_elaborate_append")
    # workflow.add_edge("task_elaborate_append", "task_self_reflect_analyse")
    workflow.add_conditional_edges(
        "task_elaborate_append",
        task_elaborate_route,
        {
            "task_elaborate_append": "task_elaborate_append",
            "END": END
        }
    )
    workflow.add_edge("task_elaborate_append", END)
    app = workflow.compile()
#     inp = """
#     Here is a job overview that i had applied:
#     In this role you will be involved in the full software development lifecycle. You will be involved in both the frontend and backend, supporting their day to day C# development, debugging, researching and testing.

# The ideal Software Developer will have experience in C# .NET and have knowledge of both the frontend and backend.

# The Role

#     C# .NET development background
#     Full software development lifecycle
#     Frontend and Backend

# The Person

#     Background in software development
#     Experience with C# .NET
#     Hybrid setup, commutable 2 days a week to Weedon Bec


#     Keywords: Software Engineer, Software Developer, JavaScript Software Engineer, C#, .NET, Software, JavaScript, Go, MySQL, SQL, Full-Stack, Full Stack, FullStack, Software House, Golang, Weedon Bec, Northampton

#     For the above overview, I want to do a project to get proficient on the listed requisites above
#     """
    inp = """
        I am studying React frontend library, I feel doing projects will help me learn faster. Give me a toy project so that i can practice and learn all the React fundamentals
        """

    inputs = {"user_input": inp, "number_of_steps": 0, "number_of_tasks_finished": 0, "task_elaboration": [], "self_reflection_score": 0}


    with open('output.md', 'w') as f:
        for output in app.stream(inputs):
            for key, value in output.items():
                pass
    print(json.dumps(output['task_elaborate_append']))

if __name__ == "__main__":
    main()
