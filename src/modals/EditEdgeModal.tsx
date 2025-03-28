import { useState } from "react";
import Modal from "../shared/Modal";
import { Edge, useReactFlow } from "@xyflow/react";

const EditEdgeModal = ({
  data,
  onClose,
}: {
  data: Edge;
  onClose: () => void;
}) => {
  const [label, setLabel] = useState<string | any>(data?.label || "");
  const { setEdges, fitView } = useReactFlow();

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);

    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === data.id ? { ...edge, label: newLabel } : edge
      )
    );

    setTimeout(() => fitView(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose(); // Close modal on Enter key
      setTimeout(() => fitView(), 0);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        onKeyDown={handleKeyDown}
      />
    </Modal>
  );
};

export default EditEdgeModal
