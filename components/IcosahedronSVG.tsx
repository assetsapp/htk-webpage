interface Props {
  className?: string;
  size?: number;
  opacity?: number;
}

export default function IcosahedronSVG({ className = '', size = 420, opacity = 1 }: Props) {
  const nodes = [
    { x: 210, y: 28, orange: true },
    { x: 348, y: 95, orange: false },
    { x: 388, y: 220, orange: true },
    { x: 328, y: 342, orange: false },
    { x: 210, y: 385, orange: false },
    { x: 92, y: 342, orange: true },
    { x: 32, y: 220, orange: false },
    { x: 72, y: 95, orange: false },
    { x: 210, y: 108, orange: false },
    { x: 308, y: 162, orange: true },
    { x: 326, y: 278, orange: false },
    { x: 210, y: 315, orange: false },
    { x: 94, y: 278, orange: false },
    { x: 112, y: 162, orange: true },
    { x: 210, y: 210, orange: false },
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    [0, 8], [1, 8], [1, 9], [2, 9], [2, 10], [3, 10], [3, 11],
    [4, 11], [4, 12], [5, 12], [5, 13], [6, 13], [7, 13], [7, 8],
    [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 8],
    [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14],
  ];

  return (
    <svg
      viewBox="0 0 420 420"
      width={size}
      height={size}
      className={`${className}`}
      style={{ opacity }}
      fill="none"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#0B0B0C"
          strokeWidth="1.5"
          strokeOpacity="0.15"
        />
      ))}
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.orange ? 7 : 5}
          fill={node.orange ? '#F79A3F' : '#0B0B0C'}
          fillOpacity={node.orange ? 0.9 : 0.25}
        />
      ))}
    </svg>
  );
}
