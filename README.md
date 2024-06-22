#RouteGenie
RouteGenie is a JavaScript-based pathfinding visualization tool designed to help users find the shortest path between two points on a grid. It utilizes both Dijkstra's algorithm and the A* algorithm with heuristics, providing an interactive and educational experience in pathfinding.

#Features
Interactive Grid: Visual representation of a grid where users can set obstacles and define start and end points.
Pathfinding Algorithms: Implements both Dijkstra's algorithm and A* algorithm with Manhattan distance heuristic to find the shortest path from start to end points.
Step-by-Step Visualization: Visualizes the process of pathfinding step-by-step, highlighting cells as the algorithm explores them.
Customizable Grid Size: Users can define the size of the grid to test different scenarios.
Real-time Updates: Updates the UI in real-time to reflect changes in the pathfinding process.
#Installation
To run RouteGenie locally, follow these steps:

1.Clone the repository:
  git clone https://github.com/your-username/RouteGenie.git

2.Navigate to the project directory:
  cd RouteGenie    (in bash)

3.Open index.html in your web browser.

#Usage
Set Start and End Points: Click on any cell to set it as the starting point (green) and ending point (red).
Add Obstacles: Click and drag to draw obstacles (black cells) on the grid.
Run Pathfinding: Click the "Find Path" button to start the algorithm. The algorithm will visualize the pathfinding process step-by-step.
Clear Grid: Use the "Clear Grid" button to reset the grid and start over.
#Example
Here's a simple example of how to use RouteGenie:

Set the start point by clicking on a cell.
Set the end point by clicking on another cell.
Draw obstacles by clicking and dragging on the grid.
Click "Find Path" to visualize the shortest path from start to end.

#Acknowledgements:
Pathfinding Algorithms: Implements Dijkstra's algorithm and A* algorithm for optimal pathfinding.
JavaScript and HTML/CSS: Built using JavaScript, HTML, and CSS for simplicity and performance.
