export const BASE_URL = "https://genai-stack-786977254826.europe-west1.run.app/api";
  

export async function createStackApi({ name, description }) {
  const response = await fetch(`${BASE_URL}/stacks/create-stack`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  if (!response.ok) {
    throw new Error("Failed to create stack");
  }
  return response.json();

}

export async function uploadKnowledgeBaseApi({ stackId, file, embeddingModel, apiKey }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("embedding_model", embeddingModel);
  formData.append("api_key", apiKey);

  const response = await fetch(`${BASE_URL}/stacks/${stackId}/kb/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to upload knowledge base");
  }
  return response.json();
}
export async function getAllStacksApi() {
  const response = await fetch(`${BASE_URL}/stacks/get-all-stacks`);
  if (!response.ok) {
    throw new Error("Failed to fetch stacks");
  }
  return response.json();
}
