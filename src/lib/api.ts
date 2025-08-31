const API_URL = "http://localhost:8080";

export interface Cat {
  id: string;
  name: string;
  image: string;
  likes: number;
  dislikes: number;
}

export const getCats = async (
  limit: number,
  offset: number
): Promise<{ data: Cat[]; total: number }> => {
  const response = await fetch(
    `${API_URL}/animals?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cats");
  }
  return response.json();
};

export const postCat = async (name: string, image: File): Promise<void> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const response = await fetch(`${API_URL}/animal`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to post cat");
  }
};

export const likeCat = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/animal/${id}/like`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to like cat");
  }
};

export const dislikeCat = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/animal/${id}/dislike`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to dislike cat");
  }
};
