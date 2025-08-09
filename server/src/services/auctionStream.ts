export async function getStreamKey(auctionId: string): Promise<string> {
  // Placeholder: call Twilio/AWS IVS to provision a key; return fake for now
  return `STREAM_KEY_${auctionId}`;
}

export async function startStream(_auctionId: string): Promise<void> {
  // Placeholder to start IVS/Twilio stream
}

export async function stopStream(_auctionId: string): Promise<void> {
  // Placeholder to stop IVS/Twilio stream
}