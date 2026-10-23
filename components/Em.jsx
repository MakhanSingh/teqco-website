// Renders "text with *highlighted* words" as text with <em> around the starred part.
export default function Em({ text = '' }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p));
}
