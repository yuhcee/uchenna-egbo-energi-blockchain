export const timeStampToSeconds = timestamp => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)
  return currentTimestamp - timestamp
}
