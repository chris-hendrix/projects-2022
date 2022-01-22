import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {loginUser} from '../reducers/userReducer'

export default function LoginForm() {
  const initialCredentials = {username: '', password: ''}
  const [credentials, setCredentials] = useState({...initialCredentials})

  const dispatch = useDispatch()
  const history = useHistory()

  const handleInputChange = ({name, value}) => {
    if (name === 'username') setCredentials({...credentials, username: value})
    if (name === 'password') setCredentials({...credentials, password: value})
  }

  const handleLogin = event => {
    event.preventDefault()
    dispatch(loginUser(credentials))
    history.push('/')
  }
  return (
    <Form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          id="username"
          type="text"
          value={credentials.username}
          name="username"
          onChange={({target}) => handleInputChange(target)}
        />
      </div>
      <div>
        password{' '}
        <input
          id="password"
          type="password"
          value={credentials.password}
          name="password"
          onChange={({target}) => handleInputChange(target)}
        />
      </div>
      <Button type="submit">login</Button>
    </Form>
  )
}
