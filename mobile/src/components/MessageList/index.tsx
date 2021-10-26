import React from 'react';

import { ScrollView } from 'react-native';
import { Message } from '../Message/index';

import { styles } from './styles';

export function MessageList() {
  const message = {
    id: '1',
    text: 'Mensagem',
    user: {
      name: 'Jônathas',
      avatar_url: 'https://github.com/jonathas-bonfim.png',
    }
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message data={message} />
      <Message data={message} />
      <Message data={message} />
    </ScrollView>
  );
}