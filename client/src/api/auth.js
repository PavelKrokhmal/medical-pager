import serverApi from './serverApi'

const signup = async data => await serverApi.post('/auth/signup', data)
const login = async data => await serverApi.post('/auth/login', data)

export default {
  signup,
  login
}