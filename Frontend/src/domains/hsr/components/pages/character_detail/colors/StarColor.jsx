export function getStarColor(characterDetail, setStarColor) {
  if (characterDetail[0]?.star_id === 1) {
    setStarColor("#c9a36a");
  } else {
    setStarColor("#8a5fcc");
  }
}
