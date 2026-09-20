const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "public", "styles.css");
let css = fs.readFileSync(file, "utf8");

const header = "@media (max-width: ";
const blocks = [];

let index = 0;
while (true) {
  const start = css.indexOf(header, index);
  if (start === -1) break;

  const widthMatch = /^@media \(max-width: (\d+)px\) \{/.exec(css.slice(start));
  if (!widthMatch) {
    index = start + header.length;
    continue;
  }

  const braceStart = css.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (let i = braceStart; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  blocks.push({
    width: parseInt(widthMatch[1], 10),
    start,
    text: css.slice(start, end),
  });
  index = end;
}

if (blocks.length > 1) {
  const ordered = [...blocks].sort((a, b) => b.width - a.width);
  const first = Math.min(...blocks.map((b) => b.start));

  let stripped = css;
  for (const block of [...blocks].sort((a, b) => b.start - a.start)) {
    stripped = stripped.slice(0, block.start) + stripped.slice(block.start + block.text.length);
  }

  const reordered = ordered.map((b) => b.text).join("");
  css = stripped.slice(0, first) + reordered + stripped.slice(first);
  fs.writeFileSync(file, css, "utf8");
  console.log(
    "sorted screens: " + ordered.map((b) => b.width + "px").join(" > ")
  );
} else {
  console.log("sorted screens: nothing to do");
}
