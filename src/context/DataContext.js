import {createContext, useState, useEffect} from 'react';
import { format } from 'date-fns';
import api from  '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from '../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({})

export const DataProvider = ({children}) => {

  const [posts, setPosts] = useState([])
	const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
	const navigate = useNavigate('/')
	const {width} = useWindowSize();

  // GET through Custom hooks using axios
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
  
  useEffect(() => {
    setPosts(data);
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter((post) => 
      ((post.body).toLowerCase()).includes(search.toLowerCase()) 
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? (Number(posts[posts.length-1].id)+1).toString() : "1";
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');

    const newPost = {id: id, title: postTitle, datetime: datetime, body: postBody};

    try{
      const response = await api.post('/posts', newPost);

      const allPosts = [...posts, newPost];

      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    }
    catch(err){
      if(err.response){
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`Error: ${err.message}`);
      }
    }
  }

  const handleDelete = async (id) => {
    try{
      await api.delete(`/posts/${id}`);
      const listPosts = posts.filter((i) => i.id !== id)
      setPosts(listPosts)
      navigate('/')
    }
    catch(err){
      if(err.response){
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`Error: ${err.message}`);
      }
    }
  }

  const handleEdit = async (id) => {

    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id: id, title: editTitle, datetime: datetime, body: editBody};

    try{
      const response = await api.put(`/posts/${id}`, updatedPost);
      
      const listPosts = posts.map(i => i.id === id ? {...response.data} : i)
      setPosts(listPosts);

      setEditTitle('');
      setEditBody('');
      navigate('/');
    }
    catch(err){
      console.log(`Error: ${err.message}`);
    }
  }
  
	return (
	<DataContext.Provider 
    value={{
      width, 
      search, 
      setSearch, 
      posts, 
      fetchError, 
      isLoading, 
      searchResults,
      handleSubmit, 
      postTitle, 
      setPostTitle, 
      postBody, 
      setPostBody, 
      handleDelete, 
      handleEdit, 
      editTitle, 
      setEditTitle, 
      editBody, 
      setEditBody
    }}
  >
			{children}
	</DataContext.Provider>
)
}

export default DataContext;