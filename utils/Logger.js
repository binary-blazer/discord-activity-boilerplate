export default function Logger({ type = "info", message = "" }) {
  const types = ["info", "warn", "error"];
  const colors = {
    info: "\x1b[34m",
    warn: "\x1b[33m",
    error: "\x1b[31m",
    clear: "\x1b[0m",
  };

  if (!types.includes(type)) {
    return console.log(
      `${colors.error}[ERROR]${colors.clear} | ${colors.error}${new Date().toLocaleString()}${colors.clear} - Logger type invalid`,
    );
  }

  const longestTypeLength = Math.max(...types.map((t) => t.length));
  const typeUpper = type.toUpperCase();
  const spaces = " ".repeat(longestTypeLength - type.length);

  console.log(
    `${colors[type]}[${typeUpper}]${spaces}${colors.clear} | ${colors[type]}${new Date().toLocaleString()}${colors.clear} - ${message}`,
  );
}
