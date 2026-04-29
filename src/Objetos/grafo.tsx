export interface IGraphNode {
  id: string;
  label: string;
  color?: string;
}

export interface IGraphLink {
  source: string;
  target: string;
}

export interface IGraphView {
  nodes: IGraphNode[];
  links: IGraphLink[];
}