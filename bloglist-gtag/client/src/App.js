import React, {useEffect} from 'react'
import {Switch, Route, useRouteMatch, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Notification from './components/Notification'
import Users from './components/Users'
import UserView from './components/UserView'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'

import {getBlogs, getUserBlogMap} from './reducers/blogReducer'
import {getUsers, setUser} from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog.blogs)
  const userBlogMap = useSelector(state => state.blog.userBlogMap)

  useEffect(() => dispatch(getBlogs()), [dispatch])
  useEffect(() => dispatch(getUserBlogMap()), [dispatch])
  useEffect(() => dispatch(getUsers()), [dispatch])
  useEffect(() => dispatch(setUser()), [dispatch])

  const user = useSelector(state => state.user.user)
  const location = useLocation()
  useEffect(() => {
    const username = !user ? 'anon' : user.username
    window.gtag('config', process.env.REACT_APP_MEASUREMENT_ID, {
      page_title: location.pathname,
      page_path: location.pathname
    })
    window.gtag('config', process.env.REACT_APP_MEASUREMENT_ID, {
      user_id: username
    })
    window.gtag('config', process.env.REACT_APP_MEASUREMENT_ID, {username})
  })

  const userRoute = useRouteMatch('/users/:id')
  const matchedUserMap = userRoute ? userBlogMap[userRoute.params.id] : null
  const blogRoute = useRouteMatch('/blogs/:id')
  const matchedBlog = blogRoute ? blogs.find(blog => blog._id === blogRoute.params.id) : null

  return (
    <div className="container">
      <Notification />
      <Navigation />
      <Switch>
        <Route path="/users/:id">
          {matchedUserMap && <UserView user={matchedUserMap.user} blogs={matchedUserMap.blogs} />}
        </Route>
        <Route path="/blogs/:id">{matchedBlog && <BlogView blog={matchedBlog} />}</Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App
