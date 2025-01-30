import axios from "../../utils/axios";
export { removeMovie } from "../reducers/movieSlice";
import { loadMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const credits = await axios.get(`/movie/${id}/credits`);
    const externalID = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const trailer = await axios.get(`/movie/${id}/videos`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const images = await axios.get(`/movie/${id}/images`);

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
    dispatch(loadMovie(allData));
  } catch (error) {
    console.log("loadMovie Error : ", error);
  }
};
