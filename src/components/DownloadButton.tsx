// import React from "react";
// import {
//   Panel,
//   useReactFlow,
//   getNodesBounds,
//   getViewportForBounds,
// } from "@xyflow/react";
// import { toPng } from "html-to-image";

// function downloadImage(dataUrl: string) {
//   const a = document.createElement("a");
//   a.setAttribute("download", "reactflow.png");
//   a.setAttribute("href", dataUrl);
//   a.click();
// }

// const imageWidth = 1024;
// const imageHeight = 768;

// const DownloadButton: React.FC = () => {
//   const { getNodes } = useReactFlow();

//   const onClick = () => {
//     const nodes = getNodes();
//     if (nodes.length === 0) return;

//     const nodesBounds = getNodesBounds(nodes);
//     const viewport = getViewportForBounds(
//         nodesBounds,
//         imageWidth,
//         imageHeight,
//         0.5,
//         2
//       ) as { x:any; y: any; zoom: any };

//     const viewportElement = document.querySelector(".react-flow__viewport") as HTMLElement | null;

//     if (!viewportElement) {
//       console.error("Viewport element not found");
//       return;
//     }

//     toPng(viewportElement, {
//       backgroundColor: "#1a365d",
//       width: imageWidth,
//       height: imageHeight,
//       style: {
//         width: `${imageWidth}px`,
//         height: `${imageHeight}px`,
//         transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
//       },
//     }).then(downloadImage).catch((error:TypeError) => console.error("Error generating image:", error));
//   };

//   return (
//     <Panel position="top-left">
//       <button
//         className="p-2 bg-red-400 rounded-md cursor-pointer text-white"
//         onClick={onClick}
//       >
//         Download Image
//       </button>
//     </Panel>
//   );
// };

// export default DownloadButton;
