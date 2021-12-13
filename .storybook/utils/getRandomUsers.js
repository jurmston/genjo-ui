import getRandomColor from './getRandomColor'

import randomUsers from './randomUsers.json'

function getPersonFromResult(result) {

  return {
    id: result.id.value,
    fullName: `${result.name.first} ${result.name.last}`,
    avatar: Math.random() < 0.9 ? result.picture.medium : '',
    color: getRandomColor(),
    location: {
      latitude: Number.parseFloat(result.location.coordinates.latitude),
      longitude: Number.parseFloat(result.location.coordinates.longitude),
    },
  }
}


function getRandomUsers(count = 1) {
  const json = randomUsers.results.slice(0, count)

  if (count === 1) {
    return getPersonFromResult(json.results[0])
  }

  return json.map(getPersonFromResult)
}

export default getRandomUsers
