/**
 * Implementation of Tarjans Algorithm for finding strongly connected components
 * of a graph.
 *
 * See:
 * https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 *
 * Note: this algorithm with not consider if a node has a self-edge (e.g. it's
 * its own dependency). Checking for those must happen before being passed in.
 */
export class TarjanGraph {
  constructor(tasks) {
    this.errors = []
    this.graph = this.mapTasksToGraph(tasks)
    console.log({ graph: this.graph })
    this.trackingIndex = 0
    this.stack = []
    this.topologicallySortedNodes = []
    this.cycleDetected = false
    this.isSorted = false
  }

  createNode(id) {
    return {
      id,
      index: null,
      lowLink: null,
      onStack: false,
      edges: new Set(),
      start: null,
      end: null,
      duration: 0,
    }
  }

  mapTasksToGraph(tasks) {
    const graph = {}

    tasks.forEach(task => {
      if (!graph[task.id]) {
        graph[task.id] = this.createNode(task.id)
      }

      task?.dependencies?.forEach(depId => {
        if (!graph[depId]) {
          graph[depId] = this.createNode(depId)
        }

        graph[depId].edges.add(task.id)
      })
    })

    return graph
  }

  getStrongComponents() {
    if (this.errors.length) {
      console.log(this.errors)
      return
    }

    for (let node of Object.values(this.graph)) {
      if (node.index === null) {
        this.strongConnect(node.id)
      }
    }

    console.log(this.cycleDetected)
    console.log(this.topologicallySortedNodes)
  }

  strongConnect(currentNodeId) {
    // Set the depth index for v to the smallest unused index.
    this.graph[currentNodeId].index = this.trackingIndex
    this.graph[currentNodeId].lowLink = this.trackingIndex
    this.trackingIndex += 1
    this.stack.push(currentNodeId)
    this.graph[currentNodeId].onStack = true

    // Consider each of the edges of the current node.
    for (let adjacentNodeId of this.graph[currentNodeId].edges) {
      if (this.graph[adjacentNodeId].index === null) {
        this.strongConnect(adjacentNodeId)
        this.graph[currentNodeId].lowLink = Math.min(
          this.graph[currentNodeId].lowLink,
          this.graph[adjacentNodeId].lowLink
        )
      } else if (this.graph[adjacentNodeId].onStack) {
        this.graph[currentNodeId].lowLink = Math.min(
          this.graph[currentNodeId].lowLink,
          this.graph[adjacentNodeId].index
        )
      }
    }

    // Check if this is the root node of the component.
    if (this.graph[currentNodeId].lowLink === this.graph[currentNodeId].index) {
      // Since we are only happy when our graph is a DAG, if there is more
      // than one node in the component we know we have a cycle. If we detect
      // a cycle we can stop.
      const componentId = this.stack.pop()
      if (componentId !== currentNodeId) {
        this.cycleDetected = true
        this.topologicallySortedNodes = []
        return
      }

      this.graph[currentNodeId].onStack = false
      this.topologicallySortedNodes.unshift(currentNodeId)
    }
  }
}
