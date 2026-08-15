import "./Loading.css";

function Loading({
  message = "Loading...",
  size = "medium",
  fullScreen = false,
}) {
  return (
    <div
      className={`loading loading--${size}${
        fullScreen ? " loading--fullscreen" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="loading__indicator" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {message && <p className="loading__message">{message}</p>}
    </div>
  );
}

export default Loading;
