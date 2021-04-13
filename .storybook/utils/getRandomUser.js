import getRandomColor from './getRandomColor'


async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api/')
  const json = await response.json()

  if (json?.results?.[0]) {
    const person = json.results[0]

    return {
      fullName: `${person.name.first} ${person.name.last}`,
      avatar: person.picture.medium,
      color: getRandomColor(),
    }
  }
}

export default getRandomUser
