import { Container, Flex } from '@chakra-ui/react';
import ModelTester from '../components/ModelTester';
import React from 'react';

const JobAssistantChatbot = () => {
  return (
    <Container maxW='container.xl' pt={1}>
      <Flex direction='column' alignItems='center' p={5}>
        <ModelTester />
      </Flex>
    </Container>
  );
};

export default JobAssistantChatbot;
