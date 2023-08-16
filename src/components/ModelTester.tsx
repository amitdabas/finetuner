import { useState, useEffect, ChangeEvent, FC } from 'react';
import {
  Flex,
  CheckboxGroup,
  Checkbox,
  Button,
  Textarea,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { openApiCall, listFineTunes } from '~/utils/openapi';

interface ModelTesterProps {}

interface ModelResult {
  modelName: string;
  result: string;
  timeTaken: number;
  tokensUsed: number;
}

const ModelTester: FC<ModelTesterProps> = () => {
  const defaultModels = ['gpt-4', 'gpt-3.5-turbo'];
  const [models, setModels] = useState<string[]>(defaultModels);
  const [selectedModels, setSelectedModels] = useState<string[]>(defaultModels);
  const [prompt, setPrompt] = useState<string>('');
  const [results, setResults] = useState<ModelResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchModels = async () => {
      const fineTunes = await listFineTunes();
      console.log('model details', fineTunes);

      if (Array.isArray(fineTunes)) {
        const modelNames = fineTunes
          .filter((fineTune) => fineTune.fine_tuned_model !== null)
          .map((fineTune) => fineTune.fine_tuned_model as string);
        setModels((prevModels) => [...prevModels, ...modelNames]);
      }
    };
    fetchModels();
  }, []);

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleModelChange = (values: string[]) => {
    setSelectedModels(values);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    const results: ModelResult[] = [];
    for (const model of selectedModels) {
      const startTime = Date.now();
      const res = await openApiCall(model, prompt);

      const timeTakenMillis = Date.now() - startTime; //
      const timeTaken = Number((timeTakenMillis / 1000).toFixed(2)); //

      results.push({
        modelName: model,
        result: res || '',
        timeTaken,
        tokensUsed: res?.length || 0,
      }); // assuming 1 token per character, adjust if not true
    }
    setResults(results);
    setIsLoading(false);
  };

  return (
    <Flex
      direction='column'
      p={5}
      border='1px'
      borderRadius='md'
      borderColor='gray.200'
      w='80vw' // Adjust this according to your needs
    >
      <VStack align='stretch' spacing={4}>
        <Textarea
          placeholder='Enter your prompt here...'
          onChange={handlePromptChange}
        />
        <CheckboxGroup
          colorScheme='green'
          defaultValue={[]}
          onChange={handleModelChange}
        >
          <HStack spacing={5}>
            {models.map((m, index) => (
              <Checkbox key={index} value={m}>
                {m}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
        <Button
          onClick={handleButtonClick}
          colorScheme='blue'
          isLoading={isLoading}
        >
          Generate
        </Button>

        {results.map((result, index) => {
          return (
            <Box key={index} bg='gray.50' p={5} mt={5} borderRadius='md'>
              <Box bg='gray.200' p={3} borderRadius='md'>
                <HStack justifyContent='space-between'>
                  <Text fontWeight='bold' color='black'>
                    Model: {result.modelName}
                  </Text>
                  <Text fontWeight='bold' color='black'>
                    Time Taken: {result.timeTaken} s
                  </Text>
                  <Text fontWeight='bold' color='black'>
                    Tokens Used: {result.tokensUsed}
                  </Text>
                </HStack>
              </Box>
              <Box bg='white' p={5} mt={3} borderRadius='md'>
                <Text color='black'>{result.result}</Text>
              </Box>
            </Box>
          );
        })}
      </VStack>
    </Flex>
  );
};

export default ModelTester;
