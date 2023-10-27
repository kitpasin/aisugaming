export function DetailColor(characters, elementColor, starColor, pathColor) {
  const detail = characters[0]?.detail;

  if (detail) {
    const elementMappings = {
      1: "Physical",
      2: "Fire",
      3: "Ice",
      4: "Lightning",
      5: "Wind",
      6: "Quantum",
      7: "Imaginary",
    };
    const pathMappings = {
      1: "Path of Abundance",
      2: "Path of Destruction",
      3: "Path of Erudition",
      4: "Path of Harmony",
      5: "Path of Hunt",
      6: "Path of Nihility",
      7: "Path of Preservation",
    };
    const namePattern = new RegExp(`\\b${characters[0]?.name}\\b`, "i"); // Match the character's name with word boundary and case-insensitive
    const starPattern = /(\d+\s*★)/g;
    const elementPattern = elementMappings[characters[0]?.element_id];
    const pathPattern = pathMappings[characters[0]?.path_id];

    const formattedDetail = detail
      .replace(
        namePattern,
        `<span style="color: ${elementColor}; text-transform: capitalize;">${characters[0]?.name}</span>`
      )
      .replace(
        starPattern,
        `<span style="color: ${starColor}">${
          characters[0]?.star_id === 1 ? "5★" : "4★"
        }</span>`
      )
      .replace(
        elementPattern,
        `<span style="color: ${elementColor}">${elementPattern}</span>`
      )
      .replace(
        pathPattern,
        `<span style="color: ${pathColor}">${pathPattern}</span>`
      );
    return <p dangerouslySetInnerHTML={{ __html: formattedDetail }} />;
  }
  return <p>Error: Description not found</p>;
}
