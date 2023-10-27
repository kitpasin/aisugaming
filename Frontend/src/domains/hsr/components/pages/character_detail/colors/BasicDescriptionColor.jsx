export function BasicDescriptionColor(
  characters,
  basic,
  basicLevel,
  elementColor
) {
  const basicLevelKey = `basic_description_level_${basicLevel}`;
  const levelValue = basic?.[basicLevelKey];

  if (levelValue) {
    const elementMappings = {
      1: "Physical DMG",
      2: "Fire DMG",
      3: "Ice DMG",
      4: "Lightning DMG",
      5: "Wind DMG",
      6: "Quantum DMG",
      7: "Imaginary DMG",
    };
    const elementId = characters[0]?.element_id;
    const elementName = elementMappings[elementId];

    if (elementName) {
      const pattern = /(\d+(\.\d+)?)%/g;

      const formattedDescription = levelValue.replace(
        pattern,
        `<span style="color: ${elementColor}">$1%</span>`
      );
      const finalDescription = formattedDescription.replace(
        new RegExp(elementName, "g"),
        `<span style="color: ${elementColor}">${elementName}</span>`
      );
      return <p dangerouslySetInnerHTML={{ __html: finalDescription }} />;
    }
  }
  return <p>Error: Description or level value not found</p>;
}
