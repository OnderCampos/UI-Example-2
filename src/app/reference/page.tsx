"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUsers, getUsersGraphQL } from "@/lib/actions/users";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/protected-route";
import { ModeToggle } from "@/components/mode-toggle";
import { Braces, Database, Palette, Shield, Trash2, Upload } from "lucide-react";

export default function ReferencePage() {
  const router = useRouter();

  // Get the authenticated user
  const { user } = useAuth();

  // Query data with React Query + Server Actions (Drizzle)
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Query data with React Query + Server Actions (GraphQL)
  const {
    data: usersGraphQL,
    isLoading: isLoadingGraphQL,
    error: errorGraphQL,
  } = useQuery({
    queryKey: ["users-graphql"],
    queryFn: getUsersGraphQL,
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
      console.error(error);
    } else {
      toast.success("Logged out successfully");
      router.push("/auth/login");
    }
  };

  // Toast example
  const showToastExample = () => {
    toast.success("Success! This is a success toast", {
      description: "This is how you show notifications to users",
    });
  };

  // Storage: file upload & retrieval
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.id) return;
    setIsUploading(true);
    try {
      const path = `${user.id}/${selectedFile.name}`;
      const { error } = await supabase.storage
        .from("uploads")
        .upload(path, selectedFile, { upsert: false });

      if (error) throw error;
      setSelectedFile(null);
      toast.success("File uploaded successfully", {
        description: path,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "There was an error uploading the file";
      toast.error("Error uploading file", { description: message });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error loading users</div>;

  return (
    <ProtectedRoute>
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {user?.user_metadata?.name || user?.email?.split("@")[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Your authentication is working perfectly. This template is ready to use.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
            <ModeToggle />
          </div>
        </div>

        {/* Info Card */}
        <Card className="border-dashed border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Reference & Examples
            </CardTitle>
            <CardDescription>
              This page lives at <code className="bg-muted px-1 py-0.5 rounded">/reference</code> and shows
              working examples of the template. Build your app in <code className="bg-muted px-1 py-0.5 rounded">src/app/page.tsx</code>.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Authentication Example */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Authentication</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                ✅ Supabase Auth is configured
              </p>
              <p className="text-muted-foreground">
                ✅ Protected routes with <code className="bg-muted px-1 py-0.5 rounded">ProtectedRoute</code>
              </p>
              <p className="text-muted-foreground">
                ✅ User hook: <code className="bg-muted px-1 py-0.5 rounded">useAuth()</code>
              </p>
              <div className="pt-2 text-xs">
                <p className="font-mono bg-muted p-2 rounded">
                  const &#123; user &#125; = useAuth();
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Database Example */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Database & Queries</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                ✅ Drizzle ORM configured
              </p>
              <p className="text-muted-foreground">
                ✅ React Query for data fetching
              </p>
              <p className="text-muted-foreground">
                ✅ Server Actions ready
              </p>
              <div className="pt-2 text-xs">
                <p className="font-mono bg-muted p-2 rounded">
                  useQuery(&#123; queryKey, queryFn &#125;)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* UI Components Example */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-lg">UI Components</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p className="text-muted-foreground">
                ✅ shadcn/ui components
              </p>
              <p className="text-muted-foreground">
                ✅ Dark mode with <code className="bg-muted px-1 py-0.5 rounded">next-themes</code>
              </p>
              <p className="text-muted-foreground">
                ✅ Tailwind CSS v4
              </p>
              <p className="text-muted-foreground">
                ✅ Toast notifications ready
              </p>
              <div className="pt-2">
                <Button onClick={showToastExample} size="sm" variant="outline">
                  Try Toast Notification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Storage Example */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg">Storage</CardTitle>
              </div>
              <CardDescription>
                Upload files to Supabase Storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Select a file</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="cursor-pointer"
                />
              </div>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                size="sm"
                className="w-full sm:w-auto"
              >
                {isUploading ? "Uploading..." : "Upload file"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Data Query Example */}
        <Card>
          <CardHeader>
            <CardTitle>Example: Data Fetching with React Query</CardTitle>
            <CardDescription>
              This demonstrates how to query data from your database. The query automatically
              handles loading states, caching, and refetching.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-muted-foreground">Loading users...</div>
            )}

            {error && (
              <div className="text-destructive">Error loading users from database</div>
            )}

            {users && users.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Users in database ({users.length}):
                </p>
                <ul className="space-y-2">
                  {users.map((dbUser) => (
                    <li
                      key={dbUser.id}
                      className="flex items-center justify-between border-b pb-2 text-sm"
                    >
                      <span className="font-medium">{dbUser.name}</span>
                      <span className="text-muted-foreground">{dbUser.email}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {users && users.length === 0 && (
              <div className="text-muted-foreground text-sm">
                No users found in database. Add some to see them here!
              </div>
            )}
          </CardContent>
        </Card>

        {/* GraphQL Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Braces className="h-5 w-5 text-pink-500" />
              Example: Data Fetching with GraphQL
            </CardTitle>
            <CardDescription>
              Same data as above, fetched via Supabase GraphQL using{" "}
              <code className="bg-muted px-1 py-0.5 rounded">getUsersGraphQL()</code> and{" "}
              <code className="bg-muted px-1 py-0.5 rounded">graphql-request</code>. The pattern is identical — swap{" "}
              <code className="bg-muted px-1 py-0.5 rounded">queryFn</code> and everything else stays the same.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono bg-muted text-xs p-3 rounded mb-4 space-y-1">
              <p className="text-muted-foreground">{"// Server Action (src/lib/actions/users.ts)"}</p>
              <p><span className="text-pink-500">const</span> client = <span className="text-blue-500">await</span> getSupabaseGraphQLClient();</p>
              <p><span className="text-pink-500">const</span> data = <span className="text-blue-500">await</span> client.request&lt;GraphQLUsersResponse&gt;(GET_USERS);</p>
              <p className="pt-1 text-muted-foreground">{"// Component (useQuery)"}</p>
              <p>useQuery(&#123; queryKey: [<span className="text-green-600">&quot;users-graphql&quot;</span>], queryFn: getUsersGraphQL &#125;)</p>
            </div>

            {isLoadingGraphQL && (
              <div className="text-muted-foreground text-sm">Loading via GraphQL...</div>
            )}

            {errorGraphQL && (
              <div className="text-destructive text-sm">Error loading users from GraphQL</div>
            )}

            {usersGraphQL && usersGraphQL.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Users via GraphQL ({usersGraphQL.length}):
                </p>
                <ul className="space-y-2">
                  {usersGraphQL.map((u) => (
                    <li
                      key={u.id}
                      className="flex items-center justify-between border-b pb-2 text-sm"
                    >
                      <span className="font-medium">{u.name}</span>
                      <span className="text-muted-foreground">{u.email}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {usersGraphQL && usersGraphQL.length === 0 && (
              <div className="text-muted-foreground text-sm">
                No users found via GraphQL.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Ready to Build? 🚀</CardTitle>
            <CardDescription>
              Everything is set up and ready to go. Here&apos;s what you can do next:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">1.</span>
              <p>Override <code className="bg-background px-1 py-0.5 rounded">src/app/page.tsx</code> with your app&apos;s home page</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">2.</span>
              <p>Add your database schema in <code className="bg-background px-1 py-0.5 rounded">src/lib/db/schema.ts</code></p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">3.</span>
              <p>Create server actions in <code className="bg-background px-1 py-0.5 rounded">lib/actions/</code></p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">4.</span>
              <p>Build your UI with the pre-installed shadcn/ui components</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">5.</span>
              <p>Check the documentation for more details on each feature</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
