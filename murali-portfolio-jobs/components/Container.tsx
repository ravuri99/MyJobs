export default function Container({ children, className = "" }: any) {
  return <div className={`rounded-xl border bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}
