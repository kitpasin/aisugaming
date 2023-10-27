import axios from "axios";

const baseUrl = "http://localhost:3000";

export async function svCharacter(characterName) {
  const response = await axios.get(`${baseUrl}/character/read/${characterName}`);
  return response.data;
}

export async function svBasic(characterName) {
  const response = await axios.get(`${baseUrl}/basic/read/${characterName}`);
  return response.data;
}

export async function svSkill(characterName) {
  const response = await axios.get(`${baseUrl}/skill/read/${characterName}`);
  return response.data;
}

export async function svUltimate(characterName) {
  const response = await axios.get(`${baseUrl}/ultimate/read/${characterName}`);
  return response.data;
}

export async function svTalent(characterName) {
  const response = await axios.get(`${baseUrl}/talent/read/${characterName}`);
  return response.data;
}

export async function svTechnique(characterName) {
  const response = await axios.get(`${baseUrl}/technique/read/${characterName}`);
  return response.data;
}
