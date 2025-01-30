import axios from "../../utils/axios";
export { removeTV } from "../reducers/tvSlice";
import { loadTV } from "../reducers/tvSlice";

export const asyncLoadTV = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const credits = await axios.get(`/tv/${id}/credits`);
    const externalID = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const trailer = await axios.get(`/tv/${id}/videos`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const images = await axios.get(`/tv/${id}/images`);

    const allData = {
      detail: detail.data,
      externalID: externalID.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      trailer: trailer.data.results.find((m) => m.type === "Trailer"),
      videos: videos.data.results,
      watchProviders: watchProviders.data.results.IN,
      credits: credits.data,
      images: images.data.backdrops,
    };
    // console.log(allData);
    dispatch(loadTV(allData));
  } catch (error) {
    console.log("loadTV Error : ", error);
  }
};
