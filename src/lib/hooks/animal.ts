import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { PaginationRequest, PaginationResponse } from "../api/types";
import type { Animal } from "../types/animal";
import type { PostAnimalRequest, VoteAnimalRequest } from "../types/animal.dto";

export const useAnimals = (params: PaginationRequest) => {
  return useQuery<PaginationResponse<Animal[]>>({
    queryKey: ["animals"],
    queryFn: async () => {
      const response = await axios.get("/animals", { params });

      return response.data;
    },
  });
};

export const usePostAnimal = () => {
  return useMutation<Animal, Error, PostAnimalRequest>({
    mutationKey: ["voteAnimal"],
    mutationFn: async (data: PostAnimalRequest) => {
      const response = await axios.post(`/animal/`, data);

      return response.data;
    },
  });
};

export const useVoteAnimal = () => {
  return useMutation<Animal, Error, VoteAnimalRequest>({
    mutationKey: ["voteAnimal"],
    mutationFn: async ({ id, data }: VoteAnimalRequest) => {
      const response = await axios.post(`/animal/${id}/vote`, data);

      return response.data;
    },
  });
};

// @TODO: impl this
// export const useReportAnimal = () => {};
