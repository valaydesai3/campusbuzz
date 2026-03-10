import { View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { useAddComment } from '../hooks/useAddComment';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { TextArea } from './ui/Input';
import { Typography } from './ui/Typography';
import { colors, spacing, borderRadius } from '../lib/design-system';

interface PostCommentsProps {
  postId: string;
  commentCount: number;
  currentUserId: string;
}

function formatTimeAgo(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function PostComments({ postId, commentCount, currentUserId }: PostCommentsProps) {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { data: comments, isLoading } = useComments(postId, expanded);
  const addComment = useAddComment(postId);

  const handleSubmit = async () => {
    if (!commentText.trim() || commentText.length > 500) return;
    await addComment.mutateAsync(commentText);
    setCommentText('');
  };

  const charCount = commentText.length;
  const isOverLimit = charCount > 500;

  return (
    <View style={{ borderTopWidth: 1, borderTopColor: colors.neutral[200], paddingTop: spacing.sm }}>
      {/* Toggle button */}
      <Button
        title={
          expanded
            ? 'Hide comments'
            : commentCount > 0
            ? `💬 ${commentCount} comment${commentCount === 1 ? '' : 's'}`
            : '💬 Add a comment'
        }
        onPress={() => setExpanded((v) => !v)}
        variant="ghost"
        size="sm"
      />

      {expanded && (
        <View style={{ marginTop: spacing.sm }}>
          {/* Comment list */}
          {isLoading ? (
            <View style={{ alignItems: 'center', paddingVertical: spacing.md }}>
              <ActivityIndicator size="small" color={colors.primary[500]} />
            </View>
          ) : comments && comments.length > 0 ? (
            <View style={{ gap: spacing.md, marginBottom: spacing.md }}>
              {comments.map((comment) => (
                <View
                  key={comment.id}
                  style={{
                    flexDirection: 'row',
                    gap: spacing.sm,
                    backgroundColor: colors.background.tertiary,
                    borderRadius: borderRadius.md,
                    padding: spacing.sm,
                  }}
                >
                  <Avatar name={comment.user?.username || 'User'} size="xs" />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: 2 }}>
                      <Typography variant="caption" weight="semibold">
                        @{comment.user?.username}
                      </Typography>
                      <Typography variant="caption" color={colors.text.tertiary}>
                        · {formatTimeAgo(comment.created_at)}
                      </Typography>
                    </View>
                    <Typography variant="bodySmall" style={{ lineHeight: 20 }}>
                      {comment.content}
                    </Typography>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={{ alignItems: 'center', paddingVertical: spacing.md, marginBottom: spacing.sm }}>
              <Typography variant="bodySmall" color={colors.text.tertiary} align="center">
                No comments yet — be the first to comment!
              </Typography>
            </View>
          )}

          {/* Comment input */}
          <TextArea
            placeholder="Add a comment... (max 500 chars)"
            value={commentText}
            onChangeText={setCommentText}
            helperText={`${charCount}/500`}
            error={isOverLimit ? 'Comment exceeds 500 characters' : undefined}
          />
          <View style={{ alignItems: 'flex-end', marginTop: spacing.sm }}>
            <Button
              title="Post Comment"
              onPress={handleSubmit}
              disabled={!commentText.trim() || isOverLimit}
              loading={addComment.isPending}
              size="sm"
            />
          </View>
        </View>
      )}
    </View>
  );
}
