import React from 'react';

const SimpleLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 600;
  const height = 250;
  const padding = 50;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const maxNote = 10;
  const points = data.map((item, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y = height - padding - (item.note / maxNote) * chartHeight;
    return { x, y, note: item.note, match: item.match };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg width="100%" height="250" viewBox={`0 0 ${width} ${height}`} style={{maxWidth: '100%'}}>
      {[0, 2.5, 5, 7.5, 10].map(val => {
        const y = height - padding - (val / maxNote) * chartHeight;
        return (
          <g key={val}>
            <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e5e7eb" strokeDasharray="3,3" />
            <text x={padding - 10} y={y + 5} textAnchor="end" fontSize="12" fill="#6b7280">{val}</text>
          </g>
        );
      })}

      <path d={pathData} fill="none" stroke="#ff8800" strokeWidth="3" />

      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#ff8800" />
          <title>{`${p.match}: ${p.note}/10`}</title>
        </g>
      ))}

      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#1f2937" strokeWidth="2" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#1f2937" strokeWidth="2" />
    </svg>
  );
};

export default SimpleLineChart;