import { FC, useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { listFineTunes } from '~/utils/openapi';

interface FineTuneModel {
  id: string;
  // Include other properties as needed
}

const Finetunes: FC = () => {
  const [fineTunes, setFineTunes] = useState<FineTuneModel[]>([]);

  useEffect(() => {
    const fetchFineTunes = async () => {
      const data = await listFineTunes();
      if (Array.isArray(data)) {
        setFineTunes(data);
      }
    };

    fetchFineTunes();
  }, []);

  return (
    <VStack spacing={4} align='start'>
      {fineTunes.map((fineTune) => (
        <Box key={fineTune.id} p={5} shadow='md' borderWidth='1px'>
          <Text fontWeight='bold'>Model: {fineTune.id}</Text>
          {/* Replace with the appropriate actions for updating/deleting the model */}
          <Button colorScheme='blue' size='sm' mt={2}>
            Update
          </Button>
          <Button colorScheme='red' size='sm' mt={2} ml={2}>
            Delete
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Finetunes;
