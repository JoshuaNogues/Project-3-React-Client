import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const [ posts, setPosts ] = useState([])
    const [ post, setPost ] = useState(null)

    const setTimedMessage = (newMessage) => {
      setMessage(newMessage);
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }

  const getPosts = () => {
    get('/posts')
    .then((results) => {
      setPosts(results.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const getPost = (id) => {
    get(`/posts/post-detail/${id}`)
      .then((results) => {
        setPost(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

    return (
        <LoadingContext.Provider value={{ posts, post, isLoading, message, setUser, user, setPost, setPosts, setIsLoading, setMessage, setTimedMessage, getPosts, getPost }}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }