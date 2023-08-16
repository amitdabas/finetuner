// Files.tsx
import React, { useState, useEffect } from 'react';
import { listFiles, deleteFile } from '~/utils/openapi';
import {
  Box,
  Heading,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';

type FileObject = {
  id: string;
  object: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
};

const Files: React.FC = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  // Fetch the list of files on component mount
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

  const handleFileDeletion = async (fileId: string) => {
    await deleteFile(fileId);
    // Refresh the file list after a successful deletion
    fetchFiles();
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Files</Heading>
      <VStack spacing={4} align='stretch'>
        {files.map((file) => (
          <HStack key={file.id} w='100%' justifyContent='space-between'>
            <Text>
              {file.filename} - {file.bytes} bytes - {file.id}
            </Text>
            <Button
              colorScheme='red'
              onClick={() => handleFileDeletion(file.id)}
            >
              Delete
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Files;
