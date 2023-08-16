import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
  CreateFineTuneRequest,
} from 'openai';

import fs from 'fs';

const openaiApiKey = '';

const configuration = new Configuration({
  apiKey: openaiApiKey,
});

const openai = new OpenAIApi(configuration);

// Define system message for chat models
const systemMessage = {
  role: ChatCompletionRequestMessageRoleEnum.System,
  content: 'You are a helpful assistant.',
};

export async function openApiCall(
  model: string,
  prompt: string,
): Promise<string> {
  try {
    let message: string | undefined;

    if (model === 'gpt-3.5-turbo' || model === 'gpt-4') {
      // Call the chat/completions endpoint for chat models
      const chatMessage = {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: prompt,
      };
      const chatResponse = await openai.createChatCompletion({
        model,
        messages: [systemMessage, chatMessage],
      });
      if (
        chatResponse.data.choices &&
        chatResponse.data.choices[0] &&
        chatResponse.data.choices[0].message
      ) {
        message = chatResponse.data.choices[0].message.content;
      }
    } else {
      // Call the completions endpoint for finetuned models
      const compResponse = await openai.createCompletion({
        model,
        prompt,
        max_tokens: 60, // Adjust this based on how long you want the responses to be
      });
      message = compResponse.data.choices[0]?.text;
    }

    return message?.trim() || 'No response from the model';
  } catch (err) {
    console.error(err);
    return 'An error occurred while generating a response.';
  }
}

export async function listFineTunes() {
  try {
    const response = await openai.listFineTunes();
    console.log('data: ', response.data.data);
    return response.data.data;
  } catch (err) {
    console.error(err);
    return 'An error occurred while listing the fine-tunes.';
  }
}

export async function deleteFineTune(modelId: string) {
  try {
    const response = await openai.deleteModel(modelId);
    console.log('response: ', response);
    return response;
  } catch (err) {
    console.log('err: ', err);
    return 'An error occurred while deleting the fine-tune.';
  }
}

export async function createFineTune(fileId: string, modelName: string) {
  const fineTuneRequest: CreateFineTuneRequest = {
    training_file: fileId,
    model: modelName,
  };

  try {
    const response = await openai.createFineTune(fineTuneRequest);
    console.log('response: ', response);
    return response;
  } catch (err) {
    console.log('error: ', err);
    return 'An error occurred while creating the fine-tune.';
  }
}

export async function listFiles() {
  try {
    const response = await openai.listFiles();
    console.log('response: ', response);
    return response.data;
  } catch (err) {
    console.log('error: ', err);
    return [];
  }
}

export async function deleteFile(fileid: string) {
  try {
    const response = await openai.deleteFile(fileid);
    console.log('response: ', response);
    return response.data;
  } catch (err) {
    console.log('error: ', err);
    return [];
  }
}
