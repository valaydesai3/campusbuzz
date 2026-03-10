import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('get-posts: Starting');

    const authHeader = req.headers.get('Authorization');
    console.log('get-posts: Auth header present:', !!authHeader);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader || '' } } }
    );

    // Get authenticated user (if any)
    const { data: { user } } = await supabaseClient.auth.getUser();
    console.log('get-posts: User ID:', user?.id || 'anonymous');

    // Fetch posts with profile info
    console.log('get-posts: Fetching posts...');
    const { data: posts, error } = await supabaseClient
      .from('posts')
      .select(`
    id,
    content,
    created_at,
    user_id,
    profiles (
      id,
      username,
      avatar_url
    )
  `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('get-posts: Database error:', error);
      throw error;
    }

    console.log('get-posts: Found', posts?.length || 0, 'posts');

    // For each post, get like count and check if current user liked it
    const postsWithLikes = await Promise.all(
      (posts || []).map(async (post) => {
        console.log('get-posts: Processing post', post.id);

        // Get like count
        const { count, error: countError } = await supabaseClient
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        if (countError) {
          console.error('get-posts: Like count error:', countError);
        }

        // Check if current user liked this post
        let userHasLiked = false;
        if (user) {
          const { data: like, error: likeError } = await supabaseClient
            .from('likes')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .maybeSingle();

          if (likeError) {
            console.error('get-posts: User like check error:', likeError);
          }

          userHasLiked = !!like;
        }

        // Get comment count
        const { count: commentCount, error: commentCountError } = await supabaseClient
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        if (commentCountError) {
          console.error('get-posts: Comment count error:', commentCountError);
        }

        return {
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          user: post.profiles,
          like_count: count || 0,
          user_has_liked: userHasLiked,
          comment_count: commentCount || 0,
        };
      })
    );

    console.log('get-posts: Returning', postsWithLikes.length, 'posts');

    return new Response(
      JSON.stringify(postsWithLikes),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('get-posts FATAL error:', error);
    console.error('get-posts error name:', error.name);
    console.error('get-posts error message:', error.message);
    console.error('get-posts error stack:', error.stack);

    return new Response(
      JSON.stringify({ error: error.message, details: error.toString() }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});