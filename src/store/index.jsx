import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  movies: [],
  movie: null,
  singleMovie: null,
  slotsForDay: [],
  slotsForMovie: [],
  ticketHolders: [],
  movieToTicketHolderStatus: null,
  connectedAccount: "",
  contract: null,
  messages: [],
  deployer: null,
  updateMovieModal: "scale-0",
  deleteMovieModal: "scale-0",
  addSlotModal: "scale-0",
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export { setGlobalState, useGlobalState, getGlobalState, truncate };