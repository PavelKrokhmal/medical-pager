import React, {useState} from 'react'
import {cookies} from '../utils'
import {auth} from '../api'

import signupImage from '../assets/signup.jpg'

const initialForm = {
  fullName: '',
  username: '',
  phoneNumber: '',
  avatarURL: '',
  password: '',
  confirmPassword: ''
}

const authSignupOrLogin = async (isSignup, data) => {
  const {fullName, username, phoneNumber, avatarURL, password, confirmPassword} = data
  if (isSignup) {
    return await auth.signup({
      fullName,
      username,
      phoneNumber,
      avatarURL,
      password
    })
  } else {
    return await auth.login({
      username,
      password
    })
  }
}

const Auth = () => {
  const [form, setForm] = useState(initialForm)
  const [isSignup, setIsSignup] = useState(false)

  const handleChange = event => {
    setForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const switchMode = () => {
    setIsSignup(prevState => !prevState)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const {username, phoneNumber, avatarURL, password, confirmPassword} = form

    if (isSignup && password !== confirmPassword) {
      alert('Please, confirm password!')
      return
    }

    try {
      const {data: {token, userId, hashedPassword, fullName}} = await authSignupOrLogin(isSignup, form)

      cookies.setCookies([
        {key: 'token', value: token},
        {key: 'username', value: username},
        {key: 'fullName', value: fullName},
        {key: 'userId', value: userId}
      ])

      if (isSignup) {
        cookies.setCookies([
          {key: 'phoneNumber', value: phoneNumber},
          {key: 'avatarURL', value: avatarURL},
          {key: 'hashedPassword', value: hashedPassword}
        ])
      }

      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Full name</label>
                <input name='fullName' type='text' placeholder='Full Name' onChange={handleChange} required/>
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>Username</label>
              <input name='username' type='text' placeholder='Username' onChange={handleChange} required/>
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='phoneNumber'>Phone number</label>
                <input name='phoneNumber' type='text' placeholder='Phone number' onChange={handleChange} required/>
              </div>
            )}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='avatarURL'>Avatar URL</label>
                <input name='avatarURL' type='text' placeholder='Avatar URL' onChange={handleChange} required/>
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input name='password' type='password' placeholder='Password' onChange={handleChange} required/>
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>Confirm password</label>
                <input name='confirmPassword' type='password' placeholder='Confirm password' onChange={handleChange}
                       required/>
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button type='submit'>{isSignup ? 'Sign Up' : 'Sign In'}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
            <p>{isSignup ? 'Already have an account?' : 'Don`t have an account?'}</p>
            <span onClick={switchMode}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </span>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={signupImage} alt={'sign in or up'}/>
      </div>
    </div>
  )
}

export default Auth