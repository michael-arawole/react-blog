import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateBlog from './CreateBlog';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
            <Route path={`${process.env.PUBLIC_URL}`} element={<Home />} />
            <Route path={`${process.env.PUBLIC_URL}/create`} element={<CreateBlog />} />
            <Route path={`${process.env.PUBLIC_URL}/blogs/:id`} element={<BlogDetails />} />
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
