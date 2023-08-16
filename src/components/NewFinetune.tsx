import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { createFineTune, listFiles } from '~/utils/openapi';

type FileObject = {
  id: string;
  filename: string;
};

export default function NewFineTune() {
  const [modelName, setModelName] = useState('davinci');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);
  const fetchFiles = async () => {
    const response = await listFiles();
    if ('data' in response) {
      setFiles(response.data);
    } else {
      console.log('Failed to fetch files');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (selectedFileId !== null) {
        const response = await createFineTune(selectedFileId, modelName);
        console.log('respond of finetune', response);
        alert('Fine-tune created successfully');
        setSelectedFileId(null);
        setModelName('');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxWidth='500px' mx='auto'>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Model Name</FormLabel>
          <Input
            type='text'
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Select File</FormLabel>
          <Select
            placeholder='Select file'
            onChange={(e) => setSelectedFileId(e.target.value)}
          >
            {files.map((file) => (
              <option key={file.id} value={file.id}>
                {file.filename}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button width='full' mt={4} type='submit' isLoading={loading}>
          Create Fine Tune
        </Button>
      </form>
    </Box>
  );
}
