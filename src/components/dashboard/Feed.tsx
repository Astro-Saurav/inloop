
import { useState } from "react";
import { Image, Smile } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PostCard } from "@/components/dashboard/PostCard";
import { mockPosts } from "@/utils/mockData";

export function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [postContent, setPostContent] = useState("");
  
  // Only admins and clubs can create posts
  const canCreatePost = user && (user.role === "admin" || user.role === "club");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim() || !user) return;
    
    const newPost = {
      id: Date.now().toString(),
      author: {
        id: user.id,
        name: user.username,
        avatar: user.avatar || '/placeholder.svg',
        role: user.role,
      },
      content: postContent,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    
    setPosts([newPost, ...posts]);
    setPostContent("");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4">
      {canCreatePost && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.username} />
                <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="font-medium">Share an update or announcement</div>
            </div>
          </CardHeader>
          <form onSubmit={handleCreatePost}>
            <CardContent className="pb-2">
              <textarea
                className="w-full border-none bg-transparent focus:outline-none resize-none"
                placeholder="What's on your mind?"
                rows={3}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-3">
              <div className="flex space-x-2">
                <Button type="button" variant="ghost" size="sm">
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  <Smile className="h-4 w-4 mr-2" />
                  Feeling
                </Button>
              </div>
              <Button 
                type="submit" 
                size="sm"
                disabled={!postContent.trim()}
              >
                Post
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
