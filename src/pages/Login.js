import { ThemeContext } from '../context/theme.context';
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { post } from "../services/authService"
import { Link } from 'react-router-dom';
import textLogo from "../images/text.png"

function HomePage() {

  const { authenticateUser } = useContext(AuthContext)

  const [ thisUser, setThisUser ] = useState(
      {
          email: "",
          password: ""
      }
  )

  const navigate = useNavigate()

  const handleChange = (e) => {
      setThisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
      console.log("Changing user", thisUser)
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      post('/auth/login', thisUser)
          .then((results) => {
              console.log("Created User", results.data)
              navigate('/home')
              localStorage.setItem('authToken', results.data.token )
              
          })
          .catch((err) => {
              console.log(err)
          })
          .finally(() => {
              authenticateUser()
          })
  } 

  const { mode } = useContext(ThemeContext)

  return (
    <div className={"Login " + mode}>
      <img src={textLogo} alt="Logo" />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default HomePage;
