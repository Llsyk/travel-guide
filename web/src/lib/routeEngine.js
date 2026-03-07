// Function to calculate distance between two coordinates
const getDistance = (c1, c2) => {
  const R = 6371; // km
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLon = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

export const getOptimizedPath = (temples, startId) => {
  let unvisited = [...temples];
  let path = [];
  
  let current = unvisited.find(t => t.id === startId) || unvisited[0];
  path.push(current);
  unvisited = unvisited.filter(t => t.id !== current.id);

  while (unvisited.length > 0) {
    let closest = unvisited.reduce((prev, curr) => {
      return getDistance(current.coordinates, curr.coordinates) < 
             getDistance(current.coordinates, prev.coordinates) ? curr : prev;
    });
    current = closest;
    path.push(current);
    unvisited = unvisited.filter(t => t.id !== current.id);
  }
  return path;
};