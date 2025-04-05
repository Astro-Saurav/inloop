
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, BookOpen, Calendar, Edit, LogOut, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function ProfileView() {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    department: user?.department || "",
    year: user?.year || 1,
  });
  
  if (!user) return null;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    updateProfile({
      username: formData.username,
      bio: formData.bio,
      department: formData.department,
      year: Number(formData.year),
    });
    
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card className="mb-6">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.username}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="text-sm">
                  <span className="inline-block bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs mt-1">
                    {user.role === "student" 
                      ? "Student" 
                      : user.role === "club" 
                        ? "Club/Society" 
                        : "Administrator"}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Write a short bio about yourself"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Sciences">Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {user.role === "student" && (
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Select
                      value={formData.year.toString()}
                      onValueChange={(value) => handleSelectChange("year", value)}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Year</SelectItem>
                        <SelectItem value="2">Second Year</SelectItem>
                        <SelectItem value="3">Third Year</SelectItem>
                        <SelectItem value="4">Fourth Year</SelectItem>
                        <SelectItem value="5">Fifth Year</SelectItem>
                        <SelectItem value="0">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b border-border pb-3 mb-3">
                <h3 className="font-medium mb-1">Bio</h3>
                <p className="text-sm text-muted-foreground">
                  {user.bio || "No bio provided yet."}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm">Department</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.department || "Not specified"}
                  </p>
                </div>
                
                {user.role === "student" && user.year !== undefined && (
                  <div>
                    <h3 className="font-medium text-sm">Year of Study</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.year === 0 ? "Graduate" : `Year ${user.year}`}
                    </p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-sm">Email</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm">Account Type</h3>
                  <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="settings">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Event Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming events</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Forum Replies</p>
                    <p className="text-sm text-muted-foreground">Get notified when someone replies to your posts</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates for important activities</p>
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Academic Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about course and academic information</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of all activities</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-destructive hover:text-destructive" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent activity to display</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
