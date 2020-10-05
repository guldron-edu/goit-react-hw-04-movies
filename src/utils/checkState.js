export default function checkState(location) {
  if (location.state && location.state.from) {
    return location.state.from;
  }
  return null;
}
