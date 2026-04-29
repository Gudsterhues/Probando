export interface Persona {
  id: string;
  name: string;
  age: string;
}

export interface Ciudad {
  id: string;
  name: string;
}

export type GraphNode = Persona | Ciudad;

class Graph {
  public nodes: GraphNode[];
  public adjList: Record<string, string[]>;

  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node: GraphNode): void {
    const exists = this.searchNode(node.id);

    if (!exists) {
      this.nodes.push(node);
      this.adjList[node.id] = [];
    }
  }

  addEdge(node1Id: string, node2Id: string): void {
    if (!this.adjList[node1Id]) {
      this.adjList[node1Id] = [];
    }

    if (!this.adjList[node2Id]) {
      this.adjList[node2Id] = [];
    }

    if (!this.adjList[node1Id].includes(node2Id)) {
      this.adjList[node1Id].push(node2Id);
    }

    if (!this.adjList[node2Id].includes(node1Id)) {
      this.adjList[node2Id].push(node1Id);
    }
  }

  searchNode(id: string): GraphNode | undefined {
    return this.nodes.find((node) => node.id === id);
  }

  printAdjacency(id: string): string[] {
    return this.adjList[id] || [];
  }

  printGraph(): Record<string, string[]> {
    return this.adjList;
  }

  addCity(name: string): void {
    const newCity: Ciudad = {
      id: crypto.randomUUID(),
      name,
    };

    this.addNode(newCity);
  }

  addPerson(name: string, age: string, cityId: string): void {
    const newPerson: Persona = {
      id: crypto.randomUUID(),
      name,
      age,
    };

    this.addNode(newPerson);
    this.addEdge(newPerson.id, cityId);
  }

  getCities(): Ciudad[] {
    return this.nodes.filter((node): node is Ciudad => {
      return !("age" in node);
    });
  }

  getPeople(): Persona[] {
    return this.nodes.filter((node): node is Persona => {
      return "age" in node;
    });
  }

  getPeopleByCity(cityId: string): Persona[] {
    const adjacency = this.adjList[cityId] || [];

    return adjacency
      .map((nodeId) => this.searchNode(nodeId))
      .filter((node): node is Persona => {
        return node !== undefined && "age" in node;
      });
  }

  toGraphView() {
    const nodes = this.nodes.map((node) => {
      const isPerson = "age" in node;

      return {
        id: node.id,
        label: isPerson ? `${node.name} (${node.age})` : node.name,
        color: isPerson ? "#4caf50" : "#2196f3",
      };
    });

    const links: { source: string; target: string }[] = [];
    const visitedEdges = new Set<string>();

    Object.entries(this.adjList).forEach(([source, targets]) => {
      targets.forEach((target) => {
        const edgeKey = [source, target].sort().join("-");

        if (!visitedEdges.has(edgeKey)) {
          links.push({
            source,
            target,
          });

          visitedEdges.add(edgeKey);
        }
      });
    });

    return {
      nodes,
      links,
    };
  }

  clone(): Graph {
    const newGraph = new Graph();

    newGraph.nodes = [...this.nodes];
    newGraph.adjList = JSON.parse(JSON.stringify(this.adjList));

    return newGraph;
  }
}

export default Graph;