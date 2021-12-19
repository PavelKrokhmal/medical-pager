import Cookies from 'universal-cookie'

const cookies = new Cookies()

const getCookie = (key) => cookies.get(key)
const setCookies = (items) => {
  items.forEach(({key, value}) => {
    cookies.set(key, value)
  })
}

const removeCookies = (keys) => {
  keys.forEach(key => {
    cookies.remove(key)
  })
}

export default {
  getCookie,
  setCookies,
  removeCookies
}