import api from "../commons/api";

export const getAllRecipes = async () => {
  const result = api.get("/api/recipes");
  return result;
};

export const getUserRecipes = async (userId) => {
  const result = await api.get(`/api/recipes/user-recipes/${userId}`);
  return result.data.userRecipes;
};

export const getRecipeById = async (recipeId) => {
  const result = await api.get(`/api/recipes/${recipeId}`);
  return result;
};

export const addRecipe = async ({
  name,
  description,
  imgFile,
  ingredients,
  instructions,
  ownerId,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("file", imgFile);
  formData.append("ingredients", ingredients);
  formData.append("instructions", instructions);
  formData.append("ownerId", ownerId);

  const result = await api.post("/api/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};

export const editRecipe = async ({
  name,
  description,
  imgFile,
  ingredients,
  instructions,
  // ownerId,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);

  formData.append("ingredients", ingredients);
  formData.append("instructions", instructions);
  // formData.append("ownerId", ownerId);

  if (typeof imgFile === "string") {
    formData.append("imgUrl", imgFile);
  } else {
    formData.append("file", imgFile);
  }

  const result = await api.put("/api/recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};

export const deleteRecipe = async (id) => {
  const result = await api.delete(`/api/recipes/${id}`);
  return result;
};

export const saveFavoriteRecipe = async (recipeId, userId) => {
  const result = await api.put(`/api/recipes/favorites`, { recipeId, userId });
  return result;
};

export const getFavoriteRecipes = async (userId) => {
  const result = await api.put(`/api/recipes/favorites/${userId}`);
  return result;
};

export const deleteFavoriteRecipe = async (recipeId, userId) => {
  const result = await api.put(`/api/recipes/favorites/${userId}`, {
    recipeId,
  });
  return result;
};

export const addRecipeReview = async (recipeId, data) => {
  const result = await api.post(`/api/recipes/${recipeId}/reviews`, data);
  return result;
};

export const getRecipeReviews = async (recipeId) => {
  const result = await api.get(`/api/recipes/${recipeId}/reviews`);
  return result;
};

export const editRecipeReview = async (recipeId, reviewId, data) => {
  const result = await api.put(
    `/api/recipes/${recipeId}/reviews/${reviewId}`,
    data
  );
  return result;
};

export const deleteRecipeReview = async (recipeId, reviewId) => {
  const result = await api.delete(
    `/api/recipes/${recipeId}/reviews/${reviewId}`
  );
  return result;
};
