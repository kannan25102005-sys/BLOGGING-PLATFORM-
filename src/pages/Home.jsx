import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css"; // Assuming you have this from earlier

// Sample blogs for demo (remove when API is ready)
const sampleBlogs = [
  {
    _id: "1",
    title: "Getting Started with React",
    author: { username: "John Doe" },
    excerpt: "A beginner's guide to building dynamic UIs with React hooks and components.",
  },
  {
    _id: "2",
    title: "Building a Blogging Platform",
    author: { username: "Jane Smith" },
    excerpt: "Step-by-step tutorial on creating a full-stack blog app with React and Node.js.",
  },
];

export default function Home() {
  const [blogs, setBlogs] = useState(sampleBlogs); // Initialize with samples
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((r) => {
        console.log("API Response:", r.data); // 🪶 For debugging

        // Handle both array and object formats safely
        const data = r.data;
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          console.error("Unexpected response format:", data);
          // Fallback to samples if API fails or returns invalid data
          setBlogs(sampleBlogs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        // Fallback to samples on error
        setBlogs(sampleBlogs);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-container"><h2 className="loading-title">Loading blogs...</h2></div>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Blogs</h1>

      {blogs.length === 0 ? (
        <p className="no-blogs-message">No blogs available.</p>
      ) : (
        blogs.map((b) => (
          <div
            key={b._id}
            className="blog-card"
          >
            <h3 className="blog-title">{b.title}</h3>
            <p className="blog-author">by {b.author?.username || "Unknown"}</p>
            {/* Optional: Add excerpt if available for preview */}
            {b.excerpt && <p className="blog-excerpt">{b.excerpt}</p>}
            <Link
              to={`/blogs/${b._id}`}
              className="read-link"
            >
              Read →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
