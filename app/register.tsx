import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (key: string, value: string) =>
    setFormData({ ...formData, [key]: value });

  const handleRegister = async () => {
    const { firstname, lastname, username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Signup Failed', error.message);
      return;
    }

    const user = data.user;
    if (!user) return;

    // OPTIONAL: update profile details now that the profile row exists
    await supabase.from('profiles').update({
      firstname,
      lastname,
      username,
    }).eq('id', user.id);

    Alert.alert('Success', 'Account created successfully!');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="First Name" style={styles.input} onChangeText={v => handleChange('firstname', v)} />
      <TextInput placeholder="Last Name" style={styles.input} onChangeText={v => handleChange('lastname', v)} />
      <TextInput placeholder="Username" style={styles.input} onChangeText={v => handleChange('username', v)} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={v => handleChange('email', v)} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={v => handleChange('password', v)} />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry onChangeText={v => handleChange('confirmPassword', v)} />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => router.push('/login')}>Already have an account? Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 8 },
  link: { color: 'blue', textAlign: 'center', marginTop: 10 },
});
