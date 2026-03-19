const peer = new SimplePeer({ initiator: true });

peer.on('signal', data => {
  // send this data to the other peer via signaling server
});

peer.on('connect', () => {
  peer.send(fileData); // fileData can be chunks of your file
});

peer.on('data', data => {
  console.log('Received file chunk:', data);
});