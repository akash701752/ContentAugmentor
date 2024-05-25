import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    // console.log("in this emedding");
    // console.log("inside  getEmbeddings beforecreating embedding " );
    // console.log("inside embedDocument before getEmbeddings + : string ", text );
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      // model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    // console.log("inside  getEmbeddings after creating embedding " );
    const result = await response.json();
    // console.log("in this emedding",result);
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
