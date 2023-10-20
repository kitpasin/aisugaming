import axios from "axios";
import { useEffect, useState } from "react";

function CharacterDetailPage({ selectedCharacter }) {
  const [characterDetail, setCharacterDetail] = useState([]);

  async function getCharacterDetail() {
    const response = await axios.get(
      `http://localhost:3000/character/read/${selectedCharacter}`
    );
    const data = response.data;
    setCharacterDetail(data);
  }

  useEffect(() => {
    getCharacterDetail();
  }, []);

  console.log(characterDetail);
  return (
    <div>
      <p>test</p>
    </div>
  );
}

export default CharacterDetailPage;
