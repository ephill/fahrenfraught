export const Footer = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <p className="font-mono text-xs">
        Made by{" "}
        <a
          className="text-purple-400 underline hover:text-purple-600"
          href="https://github.com/ephill"
          target="_blank"
          rel="noopener"
        >
          @ephill
        </a>
        . For my future wife.
      </p>
    </div>
  );
};
