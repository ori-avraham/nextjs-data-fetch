// app/posts/[id]/page.tsx
import Link from "next/link";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

async function getPost(id: string) {
  const res = await fetch(`https://localhost:5000/posts/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json() as Promise<Post>;
}

async function getComments(id: string) {
  const res = await fetch(`https://localhost:5000/posts/${id}/comments`, {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json() as Promise<Comment[]>;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  const comments = await getComments(id);

  return (
    <>
      <div className="mb-8">
        <Link href="/posts" className="hover:underline">
          ← Back to Posts
        </Link>
      </div>

      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>
        <p className="text-gray-700 text-base mb-4">{post.body}</p>
        <div className="text-xs text-gray-500">
          <span>Post ID: {post.id}</span> &middot;{" "}
          <span>User ID: {post.userId}</span>
        </div>
      </header>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="grid gap-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 p-4 rounded hover:shadow transition"
            >
              <p className="text-sm text-gray-800 mb-2">{comment.body}</p>
              <div className="text-xs text-gray-500">
                <span className="font-semibold">{comment.name}</span> (
                {comment.email})
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const res = await fetch("https://localhost:5000/posts");
  const posts = await res.json();

  // Limit to first 10 or all posts if needed
  return posts.slice(0, 10).map((post: Post) => ({
    id: String(post.id),
  }));
}
