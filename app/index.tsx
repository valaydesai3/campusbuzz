import { View, Text, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import { useCreatePost } from '../hooks/useCreatePost';
import { useToggleLike } from '../hooks/useToggleLike';
import { useDeletePost } from '../hooks/useDeletePost';
import { supabase } from '../lib/supabase';

export default function Index() {
  const { user, signIn, signOut, loading: authLoading } = useAuth();
  const { data: posts, isLoading: postsLoading } = usePosts();
  const createPost = useCreatePost();
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [postContent, setPostContent] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      alert('Logged in!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCreatePost = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('Session exists:', !!session);
      console.log('Access token exists:', !!session?.access_token);
      console.log('Token preview:', session?.access_token?.substring(0, 20));

      if (sessionError || !session) {
        alert('No valid session. Try logging out and back in.');
        return;
      }

      // Call function directly to see full error
      const { data, error } = await supabase.functions.invoke('create-post', {
        body: { content: postContent },
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Full error object:', JSON.stringify(error, null, 2));
        alert(`Error: ${error.message}`);
        return;
      }

      setPostContent('');
      alert('Post created!');
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Full error:', error);
    }
  };

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Day 3 Test Screen
      </Text>

      {/* Auth Section */}
      {!user ? (
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Login
          </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          />
          <Button title="Log In" onPress={handleLogin} />
        </View>
      ) : (
        <View style={{ marginBottom: 30 }}>
          <Text>Logged in as: {user.email}</Text>
          <Button title="Log Out" onPress={signOut} />
        </View>
      )}

      {/* Create Post Section */}
      {user && (
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Create Post
          </Text>
          <TextInput
            placeholder="What's on your mind?"
            value={postContent}
            onChangeText={setPostContent}
            multiline
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, height: 100 }}
          />
          <Button
            title="Post"
            onPress={handleCreatePost}
            disabled={!postContent.trim() || createPost.isPending}
          />
        </View>
      )}

      {/* Posts List */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Feed
      </Text>

      {postsLoading ? (
        <ActivityIndicator />
      ) : (
        posts?.map((post) => (
          <View
            key={post.id}
            style={{
              borderWidth: 1,
              padding: 15,
              marginBottom: 15,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>@{post.user.username}</Text>
            <Text style={{ marginTop: 5 }}>{post.content}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
              <Button
                title={`❤️ ${post.like_count} ${post.user_has_liked ? '(liked)' : ''}`}
                onPress={() => toggleLike.mutate(post.id)}
                disabled={!user}
              />
              {user && post.user.id === user.id && (
                <Button
                  title="Delete"
                  onPress={() => deletePost.mutate(post.id)}
                  color="red"
                />
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}