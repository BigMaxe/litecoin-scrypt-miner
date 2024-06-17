let mining = false;
let hashrate = 0;

export const startMining = (address) => {
  mining = true;
  mine();
};

export const stopMining = () => {
  mining = false;
};

export const getHashrate = () => {
  return hashrate;
};

const mine = () => {
  if (!mining) return;
  // Simulate hashing work (Replace with actual mining logic)
  setTimeout(() => {
    hashrate += Math.floor(Math.random() * 10);
    managePower();
    mine();
  }, 1000);
};

const managePower = () => {
  // Add power management logic (throttling, etc.)
  console.log('Managing power...');
};
