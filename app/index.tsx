import { View, Text, Button, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import { useCreatePost } from '../hooks/useCreatePost';
import { useToggleLike } from '../hooks/useToggleLike';
import { useDeletePost } from '../hooks/useDeletePost';

export default function Index() {
  const { user, signIn, signOut, loading: authLoading } = useAuth();
  const { data: posts, isLoading: postsLoading, refetch } = usePosts();
  const createPost = useCreatePost();
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();

  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('Test1234!');
  const [postContent, setPostContent] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      alert('Logged in!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCreatePost = async () => {
    try {
      await createPost.mutateAsync(postContent);
      setPostContent('');
      alert('Post created!');
    } catch (error: any) {
      alert(error.message);
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

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        CampusBuzz Test
      </Text>

      {/* Auth Section */}
      {!user ? (
        <View style={{ marginBottom: 30, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Login
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 4 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 4 }}
          />
          <Button title="Log In" onPress={handleLogin} />
        </View>
      ) : (
        <View style={{ marginBottom: 30, padding: 15, backgroundColor: '#e8f5e9', borderRadius: 8 }}>
          <Text style={{ marginBottom: 10 }}>✅ Logged in as: {user.email}</Text>
          <Button title="Log Out" onPress={signOut} color="#d32f2f" />
        </View>
      )}

      {/* Create Post Section */}
      {user && (
        <View style={{ marginBottom: 30, padding: 15, backgroundColor: '#e3f2fd', borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Create Post
          </Text>
          <TextInput
            placeholder="What's on your mind?"
            value={postContent}
            onChangeText={setPostContent}
            multiline
            style={{ 
              borderWidth: 1, 
              padding: 10, 
              marginBottom: 10, 
              height: 100,
              borderRadius: 4,
              textAlignVertical: 'top'
            }}
          />
          <Button
            title={createPost.isPending ? "Posting..." : "Post"}
            onPress={handleCreatePost}
            disabled={!postContent.trim() || createPost.isPending}
          />
        </View>
      )}

      {/* Posts Feed */}
      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Feed ({posts?.length || 0} posts)
          </Text>
          <Button title="Refresh" onPress={() => refetch()} />
        </View>

        {postsLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <View
              key={post.id}
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 15,
                marginBottom: 15,
                borderRadius: 8,
                backgroundColor: '#fafafa'
              }}
            >
              {/* Post Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  @{post.user.username}
                </Text>
                <Text style={{ color: '#666', fontSize: 12 }}>
                  {new Date(post.created_at).toLocaleDateString()}
                </Text>
              </View>

              {/* Post Content */}
              <Text style={{ marginBottom: 10, fontSize: 15 }}>
                {post.content}
              </Text>

              {/* Post Actions */}
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button
                  title={`${post.user_has_liked ? '❤️' : '🤍'} ${post.like_count}`}
                  onPress={() => toggleLike.mutate(post.id)}
                  disabled={!user}
                  color={post.user_has_liked ? '#e91e63' : '#666'}
                />
                {user && post.user.id === user.id && (
                  <Button
                    title="Delete"
                    onPress={() => handleDeletePost(post.id)}
                    color="#d32f2f"
                  />
                )}
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
            No posts yet. Create the first one!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}