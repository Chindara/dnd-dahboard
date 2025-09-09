import { useMemo } from 'react';
import ReactFlow, { Controls, Node, Edge, Position, ConnectionLineType, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Employee } from '@/types/DashboardWidget';
import OrgCard from './OrgCard';

// Layout configuration
const nodeWidth = 240;
const nodeHeight = 90;
const nodeSep = 20; // Increased gap between nodes
const rankSep = 40; // Increased gap between levels

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function getLayoutedElements(nodes: Node[], edges: Edge[]) {
	dagreGraph.setGraph({ rankdir: 'TB', nodesep: nodeSep, ranksep: rankSep });

	nodes.forEach((node) => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
	});

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target);
	});

	dagre.layout(dagreGraph);

	nodes.forEach((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		node.position = {
			x: nodeWithPosition.x - nodeWidth / 2,
			y: nodeWithPosition.y - nodeHeight / 2,
		};
	});

	return { nodes, edges };
}

// OrgChart Component
export default function OrgChart({ employees }: { employees: Employee[] }) {
	const nodeTypes = useMemo(
		() => ({
			orgNode: ({ data }: { data: Employee }) => <OrgCard data={data} />,
		}),
		[]
	);

	const { nodes, edges } = useMemo(() => {
		const nodes: Node[] = employees.map((emp) => ({
			id: emp.id,
			type: 'orgNode',
			data: emp,
			position: { x: 0, y: 0 },
			// Changed positions for horizontal layout
			sourcePosition: Position.Right, // Changed from Bottom to Right
			targetPosition: Position.Left, // Changed from Top to Left
			style: {
				width: nodeWidth,
				height: nodeHeight,
			},
		}));

		const edges: Edge[] = employees
			.filter((emp) => emp.managerId)
			.map((emp) => ({
				id: `e${emp.managerId}-${emp.id}`,
				source: emp.managerId!,
				target: emp.id,
				type: 'smoothstep', // You can also try 'default', 'straight', or 'step'
				animated: false,
				style: {
					stroke: '#99a1af', // Made slightly darker for better visibility
					strokeWidth: 1,
				},
				markerEnd: {
					type: MarkerType.ArrowClosed,
					width: 20,
					height: 20,
					color: '#99a1af',
				},
			}));

		return getLayoutedElements(nodes, edges);
	}, [employees]);

	// Default edge options to ensure edges are visible
	const defaultEdgeOptions = {
		style: {
			stroke: '#99a1af',
			strokeWidth: 1,
		},
		type: 'smoothstep',
		markerEnd: {
			type: MarkerType.ArrowClosed,
			width: 20,
			height: 20,
			color: '#99a1af',
		},
	};

	return (
		<div className='h-screen w-full'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				defaultEdgeOptions={defaultEdgeOptions}
				connectionLineType={ConnectionLineType.SmoothStep}
				fitView
				fitViewOptions={{
					padding: 0.2,
				}}
				defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
				minZoom={0.2}
				maxZoom={2}
				proOptions={{ hideAttribution: true }} // Optional: hides ReactFlow attribution
			>
				<Controls />
			</ReactFlow>
		</div>
	);
}
