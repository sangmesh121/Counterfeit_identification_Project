import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let email = identifier;

    if (!identifier.includes('@')) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .single();

      if (error || !profile) {
        Alert.alert('Login Failed', 'Username not found');
        return;
      }

      email = profile.email;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      Alert.alert('Login Failed', authError.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email or Username" style={styles.input} onChangeText={setIdentifier} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => router.push('/register')}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 8 },
  link: { color: 'blue', textAlign: 'center', marginTop: 10 },
});
