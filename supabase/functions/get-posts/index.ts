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
    const authHeader = req.headers.get('Authorization');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader || '' } } }
    );

    // Get authenticated user (if any)
    const { data: { user } } = await supabaseClient.auth.getUser();

    // Fetch posts with profile info and like counts
    const { data: posts, error } = await supabaseClient
      .from('posts')
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles:user_id (
          id,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // For each post, get like count and check if current user liked it
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        // Get like count
        const { count } = await supabaseClient
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        // Check if current user liked this post
        let userHasLiked = false;
        if (user) {
          const { data: like } = await supabaseClient
            .from('likes')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .maybeSingle();
          
          userHasLiked = !!like;
        }

        return {
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          user: post.profiles,
          like_count: count || 0,
          user_has_liked: userHasLiked,
        };
      })
    );

    return new Response(
      JSON.stringify(postsWithLikes),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});