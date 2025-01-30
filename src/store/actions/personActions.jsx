import axios from "../../utils/axios";
export { removePerson } from "../reducers/personSlice";
import { loadPerson } from "../reducers/personSlice";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const externalID = await axios.get(`/person/${id}/external_ids`);
    const images = await axios.get(`/person/${id}/images`);

    const allData = {
      detail: detail.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
      externalID: externalID.data,
      images: images.data.profiles,
    };
    // console.log(allData);
    dispatch(loadPerson(allData));
  } catch (error) {
    console.log("loadMovie Error : ", error);
  }
};
