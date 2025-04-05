
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import type { Post } from "@/utils/mockData";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    // In a real app, we would submit this to an API
    setComment("");
  };

  // Only admins and clubs can post and comment
  const canComment = user && (user.role === "admin" || user.role === "club");
  // Students and all other roles can only react (like)
  const canReact = user !== null;

  return (
    <Card className="mb-4 overflow-hidden animate-fade-in">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save Post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-3">{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 my-3 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Post image ${i+1}`}
                className="rounded-md w-full h-auto object-cover aspect-square"
              />
            ))}
          </div>
        )}
        
        {post.eventLink && (
          <div className="mt-3 p-3 bg-muted rounded-md flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <div className="font-medium">{post.eventLink.title}</div>
              <div className="text-sm text-muted-foreground">{post.eventLink.date}</div>
              <Link 
                to={post.eventLink.url} 
                className="text-sm text-primary hover:underline"
              >
                View event details
              </Link>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-3 pt-0 space-y-3">
        <div className="flex items-center justify-between">
          {canReact && (
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${liked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
        
        {showComments && (
          <div className="space-y-3 pt-2 border-t border-border">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="font-medium text-xs">{comment.author.name}</div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
            
            {canComment && (
              <form className="flex space-x-2" onSubmit={handleComment}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex">
                  <input
                    className="flex-1 bg-muted rounded-l-md px-3 py-2 text-sm"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="rounded-l-none"
                  >
                    Post
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
