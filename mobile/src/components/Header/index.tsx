import React from 'react';

import { useAuth } from '../../hooks/auth';
import { View, Text, TouchableOpacity } from 'react-native';


import { UserPhoto } from '../UserPhoto';
import LogoSvg from '../../assets/logo.svg';

import { styles } from './styles';

export function Header() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        {
          user &&
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>
              Sair
            </Text>
          </TouchableOpacity>
        }

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}