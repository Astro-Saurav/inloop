
import { useState } from "react";
import { MessageSquare, Clock, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockSJSQuestions } from "@/utils/mockData";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";

export function SJSQuestionsList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sjsQuestions, setSjsQuestions] = useState(mockSJSQuestions);
  
  // Filter SJS questions based on search query
  const filteredSJSQuestions = sjsQuestions.filter((question) => {
    return question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           question.content.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // All users can participate in SJS chats
  const canCreateNewQuestion = user !== null;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Senior-Junior Space</CardTitle>
              <CardDescription>Connect with seniors and juniors for academic advice</CardDescription>
            </div>
            {canCreateNewQuestion && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredSJSQuestions.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">No questions found</p>
          ) : (
            <div className="space-y-4">
              {filteredSJSQuestions.map((question) => (
                <Card key={question.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{question.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{question.replies.length}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground my-2">{question.content}</p>
                    <div className="flex items-center justify-between mt-3 text-xs">
                      <div className="flex items-center text-muted-foreground">
                        <span>By {question.author.name} • Year {question.author.year}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Posted {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
              
          {/* Ask a question button at the bottom */}
          {canCreateNewQuestion && (
            <div className="mt-4">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
