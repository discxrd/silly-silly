import type { IdRequest } from "../api/types";
import type { Vote } from "./animal";

export type VoteAnimalRequest = IdRequest<{
  vote: Vote;
}>;

export type PostAnimalRequest = {
  name: string;
  image: File;
};

// export type ReportAnimalRequest = {
//     @TODO: impl this
// }
