export function getPathColor(characterDetail, setPathColor) {
  if (characterDetail[0]?.path_id === 1) {
    setPathColor("#61cf93");
  } else if (characterDetail[0]?.path_id === 2) {
    setPathColor("#e6d863");
  } else if (characterDetail[0]?.path_id === 3) {
    setPathColor("#8a5fcc");
  } else if (characterDetail[0]?.path_id === 4) {
    setPathColor("#2692d3");
  } else if (characterDetail[0]?.path_id === 5) {
    setPathColor("#6191f6");
  } else if (characterDetail[0]?.path_id === 6) {
    setPathColor("#6191f6");
  } else {
    setPathColor("#e2a43d");
  }
}
