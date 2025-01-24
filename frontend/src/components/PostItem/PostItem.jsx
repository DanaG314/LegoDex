export default function PostItem({ post }) {
  return (
    <article>
      <h4>{post.createdAt}</h4>
      <p>{post.content}</p>
      <h4>{post.user.name}</h4>
    </article>
  );
}
