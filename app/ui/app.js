import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ProgressBarAndroid } from 'react-native';
import { startMining, stopMining, getHashrate } from '../../miner/mining';

const App = () => {
  const [status, setStatus] = useState('Idle');
  const [address, setAddress] = useState('');
  const [hashrate, setHashrate] = useState(0);

  const handleStartMining = () => {
    if (address) {
      startMining(address);
      setStatus('Mining');
    } else {
      setStatus('Enter a valid address');
    }
  };

  const handleStopMining = () => {
    stopMining();
    setStatus('Stopped');
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHashrate(getHashrate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{`Status: ${status}`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mining address"
        placeholderTextColor="#aaa"
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.progressBar}>
        <View style={[styles.progressBarInner, { width: `${hashrate / 10}%` }]} />
      </View>
      <Button
        title="Start Mining"
        onPress={handleStartMining}
        color="#6c63ff"
      />
      <Button
        title="Stop Mining"
        onPress={handleStopMining}
        color="#6c63ff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  status: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
  },
  input: {
    height: 40,
    borderColor: '#6c63ff',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#1e1e2f',
    color: '#fff',
    padding: 0 10px,
    margin: 10px 0,
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#2c2c3e',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)',
    marginBottom: 20,
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#6c63ff',
    background: 'linear-gradient(to right, #6c63ff, #3b3b80)',
    transition: 'width 0.5s ease',
  },
  button: {
    backgroundColor: '#1e1e2f',
    color: '#fff',
    fontSize: 18,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    boxShadow: '0 5px #6c63ff',
    transition: 'all 0.3s ease',
  },
  glowButton: {
    animation: 'glow 1.5s infinite alternate',
  },
});

export default App;
