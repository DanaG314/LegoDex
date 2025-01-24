import { useState, useEffect } from 'react';
import * as postService from '../../services/postService';
import './PostListPage.css';
import PostItem from '../../components/PostItem/PostItem';

const PostListPage = () => {
  const [posts, setPosts] = useState([
    {
      content: 'Hello there from Kate!',
      createdAt: '2025-01-22T10:35:45',
      user: {
        name: 'Kate',
        email: 'kate@email.com',
        _id: 'v2c3m4123n',
      },
    },
    {
      content: 'Hello there from Justin',
      createdAt: '2025-01-21T08:35:45',
      user: {
        name: 'Justin',
        email: 'justin@email.com',
        _id: '21n3bh43',
      },
    },
  ]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  const postItems = posts.map((p) => <PostItem key={p._id} post={p} />);

  return (
    <>
      <h1>Post List Page</h1>
      <section className='post-item-container'>{postItems}</section>
    </>
  );
};

export default PostListPage;
