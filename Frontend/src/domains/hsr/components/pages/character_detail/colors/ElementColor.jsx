export function getElementColor(characterDetail, setElementColor, setElementBackground) {
  if (characterDetail[0]?.element_id === 1) {
    setElementColor("#979797");
    setElementBackground("linear-gradient(125deg, transparent 50%, #979797)");
  } else if (characterDetail[0]?.element_id === 2) {
    setElementColor("#ee473d");
    setElementBackground("linear-gradient(125deg, transparent 50%, #ee473d)");
  } else if (characterDetail[0]?.element_id === 3) {
    setElementColor("#2692d3");
    setElementBackground("linear-gradient(125deg, transparent 50%, #2692d3)");
  } else if (characterDetail[0]?.element_id === 4) {
    setElementColor("#c65ade");
    setElementBackground("linear-gradient(125deg, transparent 50%, #c65ade)");
  } else if (characterDetail[0]?.element_id === 5) {
    setElementColor("#61cf93");
    setElementBackground("linear-gradient(125deg, transparent 50%, #61cf93)");
  } else if (characterDetail[0]?.element_id === 6) {
    setElementColor("#7e74eb");
    setElementBackground("linear-gradient(125deg, transparent 50%, #7e74eb)");
  } else {
    setElementColor("#e6d863");
    setElementBackground("linear-gradient(125deg, transparent 50%, #e6d863)");
  }
}
