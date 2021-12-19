const crypto = require('crypto')
const {connect} = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET
const apiId = process.env.STREAM_API_ID

const login = async (req, res) => {
  try {
    const {username, password} = req.body
    const serverClient = connect(apiKey, apiSecret, apiId)
    const client = StreamChat.getInstance(apiKey, apiSecret)

    const {users} = await client.queryUsers({name: username})

    if (!users.length) {
      return res.status(400).json({message: 'User not found!'})
    }

    const success = await bcrypt.compare(password, users[0].hashedPassword)

    if (success) {
      const token = serverClient.createUserToken(users[0].id)
      res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id})
    } else {
      res.status(500).json({message: 'Incorrect password!'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error})
  }

}

const signup = async (req, res) => {
  try {
    const {fullName, username, phoneNumber, password} = req.body
    const userId = crypto.randomBytes(16).toString('hex')
    const serverClient = connect(apiKey, apiSecret, apiId)
    const hashedPassword = await bcrypt.hash(password, 4)
    const token = serverClient.createUserToken(userId)

    res.status(200).json({token, fullName, username, phoneNumber, userId, hashedPassword})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error})
  }
}

module.exports = {
  signup,
  login
}