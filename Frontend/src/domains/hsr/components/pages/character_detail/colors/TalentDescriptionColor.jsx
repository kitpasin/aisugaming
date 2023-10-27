export function TalentDescriptionColor(
  characters,
  talent,
  talentLevel,
  elementColor
) {
  const talentLevelKey = `talent_description_level_${talentLevel}`;
  const levelValue = talent?.[talentLevelKey];

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
      const numbyPattern = /has\s*(\d+)\s*SPD/g;
      const additionalEnergy = /(\d+)\s*additional\s*Energy/g;
      const FightingWillPattern = /(\d+)\s*stack\s*of\s*Fighting\s*Will/g;
      const SPDincreasePattern = /SPD\s*increases\s*by\s+(\d+)/g;
      const maxOfPattern = /max\s*of\s*(\d+)/g;
      const extraEnergyPattern = /(\d+)\s*extra\s*Energy/g;
      const maxPointPattern = /max\s+(\d+)\s*points/g;
      const reducedByPattern = /reduced\s*by\s+(\d+)/g;
      const numberPattern = /(\d+(\.\d+)?)%/g;
      const plusPattern = /plus\s+(\d+)/g;
      const timesPattern = /(\d+)\s*time\(s\)/g;
      const extratimesPattern = /(\d+)\s*extra\s*times+/g;
      const extratimesPattern2 = /(\d+)\s*extra\s*time\(s\)/g;
      const turnsPattern = /(\d+)\s*turn\(s\)/g;
      const turnsPattern2 = /(\d+)\s*turns/g;
      const stacksPattern = /(\d+)\s*stacks+/g;
      const stacksPattern2 = /(\d+)\s*stack\(s\)/g;
      const buffPattern = /(\d+)\s*buff\(s\)/g;
      const lightningLordPattern = /Hits\s+Per\s+Action\s+by\s+(\d+)/g;
      const lightningLordPattern2 = /(\d+)\s*base\s*Hits\s*Per\s*Action/g;
      const jadeTilesPattern = /(\d+)\s*jade\s*tile\(s\)/g;

      const formattedDescription = levelValue
        .replace(
          numbyPattern,
          `<span>has${" "}</span><span style="color: ${elementColor}">$1${" "}</span><span>SPD</span>`
        )
        .replace(
          additionalEnergy,
          `<span style="color: ${elementColor}">$1${" "}<span>additional Energy</span>`
        )
        .replace(
          FightingWillPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>stack of Fighting Will</span>`
        )
        .replace(
          SPDincreasePattern,
          `<span>SPD increases by${" "}</span><span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          extraEnergyPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>extra Energy</span>`
        )
        .replace(
          maxPointPattern,
          `<span>max${" "}</span><span style="color: ${elementColor}">$1${" "}</span><span>points</span>`
        )
        .replace(
          reducedByPattern,
          `<span>reduced by${" "}</span><span style="color: ${elementColor}">$1</span>`
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
          extratimesPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>extra times</span>`
        )
        .replace(
          extratimesPattern2,
          `<span style="color: ${elementColor}">$1${" "}</span><span>extra time(s)</span>`
        )
        .replace(
          turnsPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>turn(s)</span>`
        )
        .replace(
          turnsPattern2,
          `<span style="color: ${elementColor}">$1${" "}</span><span>turns</span>`
        )
        .replace(
          stacksPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>stacks</span>`
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
          lightningLordPattern,
          `<span>Hits Per Action by${" "}</span><span style="color: ${elementColor}">$1</span>`
        )
        .replace(
          lightningLordPattern2,
          `<span style="color: ${elementColor}">$1${" "}</span><span>base Hits Per Action</span>`
        )
        .replace(
          jadeTilesPattern,
          `<span style="color: ${elementColor}">$1${" "}</span><span>jade tile(s)</span>`
        )
        .replace(
          maxOfPattern,
          `<span>max of${" "}</span><span style="color: ${elementColor}">$1</span>`
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
