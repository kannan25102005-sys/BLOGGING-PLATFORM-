import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // For future API integration
import "./BlogDetails.css"; // Add this import for the CSS

// Sample full blog details for demo (remove when API is ready)
const sampleBlogDetails = {
  1: {
    _id: "1",
    title: "Getting Started with React",
    author: { username: "John Doe" },
    date: "2023-10-15",
    content: `
      <h2>Introduction to React</h2>
      <p>React is a powerful JavaScript library for building user interfaces, developed by Facebook. It allows you to create reusable UI components that update efficiently when data changes.</p>
      
      <h3>Why Use React?</h3>
      <ul>
        <li><strong>Component-Based:</strong> Break your UI into independent, reusable pieces.</li>
        <li><strong>Virtual DOM:</strong> React uses a virtual DOM to minimize direct manipulation of the real DOM, making apps faster.</li>
        <li><strong>JSX:</strong> Write HTML-like syntax in JavaScript for easier component definition.</li>
      </ul>
      
      <h3>Setting Up Your First React App</h3>
      <p>To get started, install Node.js and run:</p>
      <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
      
      <p>Inside <code>src/App.js</code>, you can start building components. For example:</p>
      <pre><code>function App() {
  return (
    &lt;div className="App"&gt;
      &lt;h1&gt;Hello, React!&lt;/h1&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h3>Key Concepts: Hooks</h3>
      <p>React Hooks like <code>useState</code> and <code>useEffect</code> let you add state and lifecycle methods to functional components without classes.</p>
      
      <p>Example with <code>useState</code>:</p>
      <pre><code>import { useState } from 'react';
      
      function Counter() {
        const [count, setCount] = useState(0);
        return (
          &lt;div&gt;
            &lt;p&gt;Count: {count}&lt;/p&gt;
            &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Increment&lt;/button&gt;
          &lt;/div&gt;
        );
      }</code></pre>
      
      <h3>Next Steps</h3>
      <p>Explore React Router for navigation, Axios for API calls, and state management with Redux or Context API. Happy coding!</p>
    `,
  },
  2: {
    _id: "2",
    title: "Building a Blogging Platform",
    author: { username: "Jane Smith" },
    date: "2023-10-20",
    content: `
      <h2>Overview</h2>
      <p>Creating a full-stack blogging platform involves frontend (React), backend (Node.js/Express), and a database (MongoDB). This tutorial covers the essentials.</p>
      
      <h3>Frontend Setup with React</h3>
      <p>Use Create React App to bootstrap your project. Add routing with React Router:</p>
      <pre><code>npm install react-router-dom</code></pre>
      
      <p>Define routes in <code>App.js</code> for Home, Login, Signup, and Blog Details.</p>
      
      <h3>Backend with Node.js and Express</h3>
      <p>Install dependencies:</p>
      <pre><code>npm init -y
npm install express mongoose cors dotenv</code></pre>
      
      <p>Create a server in <code>server.js</code>:</p>
      <pre><code>const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogdb');

// Routes
app.get('/api/blogs', (req, res) =&gt; {
  // Fetch blogs from DB
  res.json([{ title: 'Sample Blog', author: 'Admin' }]);
});

app.listen(5000, () =&gt; console.log('Server running on port 5000'));</code></pre>
      
      <h3>Database Schema</h3>
      <p>Define a Blog model in Mongoose:</p>
      <pre><code>const blogSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  content: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);</code></pre>
      
      <h3>Connecting Frontend and Backend</h3>
      <p>Use Axios in React to fetch data:</p>
      <pre><code>import axios from 'axios';
      
      useEffect(() =&gt; {
        axios.get('/api/blogs').then(res =&gt; setBlogs(res.data));
      }, []);</code></pre>
      
      <p>Handle authentication with JWT for user sessions. Deploy to Vercel (frontend) and Heroku (backend).</p>
      
      <h3>Challenges and Tips</h3>
      <ul>
        <li><strong>Security:</strong> Sanitize inputs to prevent XSS.</li>
        <li><strong>Performance:</strong> Paginate blog lists for large datasets.</li>
        <li><strong>UI/UX:</strong> Add responsive CSS with media queries.</li>
      </ul>
      
      <p>This platform can evolve into a full CMS. Start small and iterate!</p>
    `,
  },
};

export default function BlogDetail() {
  const { id } = useParams(); // Get the blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch with hardcoded data (replace with real axios.get(`/api/blogs/${id}`))
    setTimeout(() => { // Fake delay for realism
      const foundBlog = sampleBlogDetails[id];
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        setError("Blog not found.");
      }
      setLoading(false);
    }, 500);

    // TODO: Real API integration
    // axios.get(`/api/blogs/${id}`)
    //   .then((r) => setBlog(r.data))
    //   .catch((err) => {
    //     console.error("Error fetching blog:", err);
    //     setError("Failed to load blog.");
    //   })
    //   .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="loading-container"><h2 className="loading-title">Loading blog...</h2></div>;
  }

  if (error || !blog) {
    return (
      <div className="blog-detail-container">
        <h2 className="error-title">{error || "Blog not found"}</h2>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <article className="blog-article">
        <header className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-meta">
            By {blog.author.username} | {new Date(blog.date).toLocaleDateString()}
          </p>
        </header>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }} // Renders HTML content (use a sanitizer in production)
        />
      </article>
      <Link to="/" className="back-link">← Back to Blogs</Link>
    </div>
  );
}
