import getRandomColor from './getRandomColor'

import randomUsers from './randomUsers.json'

function getPersonFromResult(result) {
  return {
    fullName: `${result.name.first} ${result.name.last}`,
    avatar: Math.random() < 0.9 ? result.picture.medium : '',
    color: getRandomColor(),
  }
}


function getRandomUser(count = 1) {
  const json = randomUsers.results.slice(0, count)

  if (count === 1) {
    return getPersonFromResult(json.results[0])
  }

  return json.map(getPersonFromResult)
}

export default getRandomUser
