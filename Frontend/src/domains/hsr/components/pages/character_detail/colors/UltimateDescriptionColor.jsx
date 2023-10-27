export function UltimateDescriptionColor(
  characters,
  ultimate,
  ultimateLevel,
  elementColor
) {
  const ultimateLevelKey = `ultimate_description_level_${ultimateLevel}`;
  const levelValue = ultimate?.[ultimateLevelKey];

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
    const elementName = elementMappings[characters[0]?.element_id];

    if (elementName) {
      const spdPattern = /SPD\s*of\s*all\s*allies\s*by\s+(\d+)/g;
      const numberPattern = /(\d+(\.\d+)?)%/g;
      const plusPattern = /plus\s+(\d+)/g;
      const timesPattern = /(\d+)\s*time\(s\)/g;
      const extraEnergyPattern = /(\d+)\s*extra\s*Energy/g;
      const extratimesPattern = /(\d+\s*extra\s*times+)/g;
      const extratimesPattern2 = /(\d+\s*extra\s*time\(s\))/g;
      const turnsPattern = /(\d+)\s*turn\(s\)/g;
      const stacksPattern = /(\d+\s*stacks+)/g;
      const stacksPattern2 = /(\d+)\s*stack\(s\)/g;
      const buffPattern = /(\d+)\s*buff\(s\)/g;
      const debuffPattern = /(\d+)\s*debuff\(s\)/g;
      const EnergyPattern = /(\d+)\s*Energy/g;
      const lightningLordPattern = /Hits\s+Per\s+Action\s+by\s+(\d+)/g;
      const jadeTilesPattern = /(\d+)\s*jade\s*tiles/g;
      const jadeTilesPattern2 = /(\d+\s*jade\s*tile\(s\))/g;
      const SquamaSacrosanctaPattern = /(\d+)\s*Squama\s*Sacrosancta/g;

      const formattedDescription = levelValue
        .replace(
          EnergyPattern,
          `</span><span style="color: ${elementColor}">$1${" "}</span><span>Energy</span>`
        )
        .replace(
          spdPattern,
          `<span>SPD of all allies by${" "}</span><span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          numberPattern,
          `<span style="color: ${elementColor}">$1%</span>`
        )
        .replace(
          plusPattern,
          `<span>plus${" "}</span><span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          timesPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>time(s)</span>`
        )
        .replace(
          extraEnergyPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>extra Energy</span>`
        )
        .replace(
          extratimesPattern,
          `<span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          extratimesPattern2,
          `<span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          turnsPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>turn(s)</span>`
        )
        .replace(
          stacksPattern,
          `<span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          stacksPattern2,
          `<span style="color: ${elementColor}">$1${" "}</span><span>stack(s)</span>`
        )
        .replace(
          buffPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>buff(s)</span>`
        )
        .replace(
          debuffPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>debuff(s)</span>`
        )
        .replace(
          lightningLordPattern,
          `<span>Hits Per Action by${" "}</span><span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          jadeTilesPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>jade tiles</span>`
        )
        .replace(
          jadeTilesPattern2,
          `<span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          SquamaSacrosanctaPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>Squama Sacrosancta</span>`
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
