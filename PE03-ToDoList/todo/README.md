# PE04 - ToDo App
### James Iden Busia

## Input
User input consists of text entry into the text area and of pressing either the "Add Task" button or any of the "Delete" buttons which appears next to the tasks in the list.

## Process
Clicking "Add Task" will append a new task object to the list using setTasks. The new task will have an id calculated when the app is rendered which will one greater than the current maximum id of all tasks or 0 if there are no tasks. When a user clicks "Delete" on any task, that task is removed from the list of tasks using setTasks, an update callback function, and filter.

## Output
The task entry textarea is rendered with the "Add Task" button, followed by the tasks in a column-oriented list. When "Add Task" is clicked and the textarea contains valid text, the task appears at the end of the task list. If a task is deleted, the list is immediately updated. If the textarea does not contain valid text, an error paragraph is displayed until the user enters text in the textarea.
