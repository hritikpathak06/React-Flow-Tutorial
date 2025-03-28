import { useCallback, useRef, useState } from "react";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomNode } from "./components/CustomNode";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { NodeEditor } from "./components/NodeEditor";
import ContextMenu from "./components/ContextMenu";
import EditEdgeModal from "./modals/EditEdgeModal";
// import DownloadButton from "./components/DownloadButton";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      label: "Users",
      nodeType: "table",
      fields: [
        { name: "id", type: "id", isPrimary: true, isRequired: true },
        { name: "email", type: "email", isRequired: true },
        { name: "username", type: "string", isRequired: true },
        { name: "created_at", type: "timestamp", isRequired: true },
      ],
    },
  },
];

const initialEdges: Edge[] = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [menu, setMenu] = useState<any | null>(null);
  const ref = useRef<any | null>(null);
  const [isEdgeModalOpen, setIsEdgeModalOpen] = useState<boolean>(false);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  // const onConnect = useCallback(

  //   (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        ...connection,
        id: `${Date.now()}`,
        animated: true,
        label: "1:1 connection",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      setEdges((prev) => addEdge(edge, prev));
    },
    [setEdges]
  );

  const handleAddNode = () => {
    setSelectedNode(null);
    setIsEditorOpen(true);
  };

  const handleEditNode = (node: Node) => {
    setSelectedNode(node);
    setIsEditorOpen(true);
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const handleSaveNode = (data: Node) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node: any) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
      );
    } else {
      const newNode: Node = {
        id: `${Date.now()}`,
        type: "custom",
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: data,
      };
      setNodes((nds: any) => [...nds, newNode]);
    }
  };

  const handleEdgeClick = (e: Event, edge: Edge) => {
    console.log("Edge==>> ", e);

    setSelectedEdge(edge);
    setIsEdgeModalOpen(true);
  };

  const onNodeContextMenu = useCallback(
    (event: any, node: Node) => {
      event.preventDefault();

      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <>
      <div className="w-screen h-screen bg-gray-50">
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <ReactFlow
              ref={ref}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onEdgeClick={handleEdgeClick as any}
              fitView
              onPaneClick={onPaneClick}
              onNodeContextMenu={onNodeContextMenu}
              className="bg-gray-50"
            >
              {/* <DownloadButton /> */}

              {isEdgeModalOpen && selectedEdge && (
                <EditEdgeModal
                  data={selectedEdge}
                  onClose={() => setIsEdgeModalOpen(false)}
                />
              )}

              {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
              <Background className="bg-gray-50" gap={16} />
              <Controls className="bg-white border border-gray-200 shadow-lg rounded-lg" />
              <MiniMap
                className="bg-white border border-gray-200 shadow-lg rounded-lg"
                nodeColor="#14b8a6"
                maskColor="rgb(243, 244, 246, 0.7)"
              />
              <Panel
                position="top-right"
                className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 flex gap-2"
              >
                <button
                  onClick={handleAddNode}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  title="Add new table"
                >
                  <Plus className="w-5 h-5 text-teal-600" />
                </button>
                {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Save schema">
                <Save className="w-5 h-5 text-teal-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Undo">
                <Undo className="w-5 h-5 text-teal-600" />
                </button> */}
              </Panel>
              <Panel position="top-center" className="m-2">
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Schema Designer
                  </h2>
                  <p className="text-sm text-gray-600">
                    Click + to add a new table. Drag between handles to create
                    relationships.
                  </p>
                </div>
              </Panel>
              {nodes.map((node) => (
                <Panel
                  key={node.id}
                  position="bottom-center"
                  className="pointer-events-none"
                  style={{
                    transform: `translate(${node.position.x}px, ${
                      node.position.y - 40
                    }px)`,
                  }}
                >
                  <div className="flex gap-1">
                    <button
                      className="p-1 bg-white rounded-md shadow-sm border border-gray-200 pointer-events-auto hover:bg-gray-50"
                      onClick={() => handleEditNode(node)}
                      title="Edit table"
                    >
                      <Edit2 className="w-4 h-4 text-teal-600" />
                    </button>
                    <button
                      className="p-1 bg-white rounded-md shadow-sm border border-gray-200 pointer-events-auto hover:bg-gray-50"
                      onClick={() => handleDeleteNode(node.id)}
                      title="Delete table"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </Panel>
              ))}
            </ReactFlow>
            <NodeEditor
              isOpen={isEditorOpen}
              onClose={() => setIsEditorOpen(false)}
              onSave={handleSaveNode}
              initialData={selectedNode?.data as any}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
