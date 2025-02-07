import { createWebComponent } from "@workleap/r2wc/helpers/react";
import type { MovieDetailsProps } from "../../MovieDetails.js";
import type { MoviePopupProps } from "../../MoviePopup.js";
import type { TicketProps } from "../../Ticket.js";

export type * from "../../types.js";

export const MovieDetails = createWebComponent<MovieDetailsProps>("wl-movie-details");
export const Ticket = createWebComponent<TicketProps>("wl-ticket");
export const SelectedMovie = createWebComponent("wl-selected-movie");
export const MovieFinder = createWebComponent("wl-movie-finder");
export const MoviePopup = createWebComponent<MoviePopupProps>("wl-movie-pop-up");
