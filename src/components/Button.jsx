function Button({ className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-slate-400 p-2 rounded-md text-white transition-colors duration-200 ${className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
