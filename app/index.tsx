import { View, ScrollView, Alert, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import { useCreatePost } from '../hooks/useCreatePost';
import { useToggleLike } from '../hooks/useToggleLike';
import { useDeletePost } from '../hooks/useDeletePost';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Input, TextArea } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { Typography } from '../components/ui/Typography';
import { colors, spacing, borderRadius } from '../lib/design-system';

export default function Index() {
  const router = useRouter();
  const { user, signIn, signOut, loading: authLoading } = useAuth();
  const { data: posts, isLoading: postsLoading, error: postsError, refetch } = usePosts();
  const createPost = useCreatePost();
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();

  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('Test1234!');
  const [postContent, setPostContent] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;
    
    try {
      await createPost.mutateAsync(postContent);
      setPostContent('');
      setShowCreatePost(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeletePost = (postId: string) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deletePost.mutate(postId)
        }
      ]
    );
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <View style={{
        backgroundColor: colors.primary[500],
        paddingTop: 60,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Typography variant="h2" color={colors.text.inverse}>
              CampusBuzz
            </Typography>
            <Typography variant="bodySmall" color={colors.text.inverse} style={{ opacity: 0.9 }}>
              What's happening on campus? 🔥
            </Typography>
          </View>
          
          {user && (
            <Avatar 
              name={user.email || 'User'} 
              size="md"
              showBadge
              badgeColor={colors.success}
            />
          )}
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.lg }}
        refreshControl={
          <RefreshControl refreshing={postsLoading} onRefresh={() => refetch()} />
        }
      >
        {/* Dev Tools Button */}
        <Pressable 
          onPress={() => router.push('/design-system' as any)}
          style={{
            padding: spacing.sm,
            backgroundColor: colors.secondary[50],
            borderRadius: borderRadius.md,
            marginBottom: spacing.lg,
          }}
        >
          <Typography variant="bodySmall" align="center" color={colors.secondary[600]}>
            🎨 View Design System
          </Typography>
        </Pressable>

        {/* Login Card - ONLY when NOT logged in */}
        {!user && (
          <Card variant="elevated" style={{ marginBottom: spacing.lg }}>
            <CardHeader>
              <Typography variant="h3">Welcome Back! 👋</Typography>
              <Typography variant="bodySmall" style={{ marginTop: spacing.xs }}>
                Sign in to start posting
              </Typography>
            </CardHeader>
            <CardContent>
              <Input
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                leftIcon="✉️"
                autoCapitalize="none"
              />
              <View style={{ height: spacing.md }} />
              <Input
                label="Password"
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                leftIcon="🔒"
                secureTextEntry
              />
            </CardContent>
            <CardFooter>
              <Button
                title="Sign In"
                onPress={handleLogin}
                fullWidth
                loading={authLoading}
              />
            </CardFooter>
          </Card>
        )}

        {/* Logged In User Info - ONLY when logged in */}
        {user && (
          <Card variant="filled" style={{ marginBottom: spacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 }}>
                <Avatar name={user.email || 'User'} size="sm" />
                <Typography variant="bodySmall" color={colors.text.secondary}>
                  {user.email}
                </Typography>
              </View>
              <Button
                title="Sign Out"
                onPress={signOut}
                variant="ghost"
                size="sm"
              />
            </View>
          </Card>
        )}

        {/* Create Post Button - ONLY when logged in */}
        {user && !showCreatePost && (
          <Button
            title="✨ Create Post"
            onPress={() => setShowCreatePost(true)}
            fullWidth
            variant="secondary"
            style={{ marginBottom: spacing.lg }}
          />
        )}

        {/* Create Post Form - ONLY when logged in AND form is open */}
        {user && showCreatePost && (
          <Card variant="elevated" style={{ marginBottom: spacing.lg }}>
            <CardHeader>
              <Typography variant="h4">Create a Post</Typography>
            </CardHeader>
            <CardContent>
              <TextArea
                placeholder="What's on your mind? Share with your campus... 💭"
                value={postContent}
                onChangeText={setPostContent}
                helperText={`${postContent.length}/280 characters`}
              />
            </CardContent>
            <CardFooter>
              <Button
                title="Post"
                onPress={handleCreatePost}
                disabled={!postContent.trim() || postContent.length > 280}
                loading={createPost.isPending}
              />
              <Button
                title="Cancel"
                onPress={() => {
                  setShowCreatePost(false);
                  setPostContent('');
                }}
                variant="ghost"
              />
            </CardFooter>
          </Card>
        )}

        {/* FEED - ONLY FOR AUTHENTICATED USERS */}
        {user && (
          <>
            {/* Feed Header */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: spacing.md 
            }}>
              <Typography variant="h4">
                Feed {posts && `(${posts.length})`}
              </Typography>
            </View>

            {/* Posts */}
            {postsLoading ? (
              <View style={{ alignItems: 'center', padding: spacing.xl }}>
                <ActivityIndicator size="large" color={colors.primary[500]} />
                <Typography variant="bodySmall" color={colors.text.secondary} style={{ marginTop: spacing.md }}>
                  Loading posts...
                </Typography>
              </View>
            ) : postsError ? (
              <Card variant="outlined" style={{ borderColor: colors.error }}>
                <View style={{ alignItems: 'center', padding: spacing.xl }}>
                  <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                    Something went wrong 😕
                  </Typography>
                  <Typography variant="body" color={colors.text.secondary} align="center" style={{ marginBottom: spacing.lg }}>
                    {postsError.message || 'Failed to load posts. Please try again.'}
                  </Typography>
                  <Button title="Try Again" onPress={() => refetch()} variant="outline" />
                </View>
              </Card>
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card 
                  key={post.id} 
                  variant="elevated"
                  style={{ marginBottom: spacing.lg }}
                >
                  {/* Post Header */}
                  <CardHeader style={{ marginBottom: spacing.sm }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                      <Avatar 
                        name={post.user.username || 'User'} 
                        size="md"
                      />
                      <View style={{ flex: 1 }}>
                        <Typography variant="body" weight="semibold">
                          @{post.user.username}
                        </Typography>
                        <Typography variant="caption">
                          {formatTimeAgo(post.created_at)}
                        </Typography>
                      </View>
                    </View>
                  </CardHeader>

                  {/* Post Content */}
                  <CardContent>
                    <Typography variant="body" style={{ lineHeight: 24 }}>
                      {post.content}
                    </Typography>
                  </CardContent>

                  {/* Post Actions */}
                  <CardFooter>
                    <Button
                      title={`${post.user_has_liked ? '❤️' : '🤍'} ${post.like_count}`}
                      onPress={() => toggleLike.mutate(post.id)}
                      variant="ghost"
                      size="sm"
                    />
                    
                    {post.user.id === user.id && (
                      <Button
                        title="Delete"
                        onPress={() => handleDeletePost(post.id)}
                        variant="danger"
                        size="sm"
                      />
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card variant="outlined">
                <View style={{ alignItems: 'center', padding: spacing.xl }}>
                  <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                    No posts yet 📭
                  </Typography>
                  <Typography variant="body" color={colors.text.secondary} align="center" style={{ marginBottom: spacing.lg }}>
                    Be the first to share something on campus!
                  </Typography>
                  <Button
                    title="✨ Be the First to Post!"
                    onPress={() => setShowCreatePost(true)}
                    variant="secondary"
                  />
                </View>
              </Card>
            )}
          </>
        )}

        {/* Bottom Padding */}
        <View style={{ height: spacing['3xl'] }} />
      </ScrollView>
    </View>
  );
}