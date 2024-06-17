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
        value={address}
        onChangeText={setAddress}
      />
      <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={hashrate / 1000} />
      <Button title="Start Mining" onPress={handleStartMining} />
      <Button title="Stop Mining" onPress={handleStopMining} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  status: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default App;
