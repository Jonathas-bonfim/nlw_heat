import React from 'react';
import { View } from 'react-native';
import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SingInBox } from '../../components/SingInBox';
import { SendMessages } from '../../components/SendMessages';

import { styles } from './styles';
import { useAuth } from '../../hooks/auth';

export function Home() {
  const user = useAuth;
  return (
    <View style={styles.container}>
      <Header />
      <MessageList />
      {user ? <SendMessages /> : <SingInBox />}
    </View>
  )
}


