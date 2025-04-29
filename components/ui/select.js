export function Select({ children, ...props }) { return <div {...props}>{children}</div>; }
export function SelectTrigger({ children }) { return <div className="border p-2 rounded-md bg-white">{children}</div>; }
export function SelectValue({ placeholder }) { return <span>{placeholder}</span>; }
export function SelectContent({ children }) { return <div className="mt-2 border rounded bg-white">{children}</div>; }
export function SelectItem({ children, value, onClick }) {
  return <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onClick(value)}>{children}</div>;
}
