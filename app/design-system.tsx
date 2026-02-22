import { View, Text, ScrollView } from 'react-native';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Avatar, AvatarGroup } from '../components/ui/Avatar';
import { Typography } from '../components/ui/Typography';
import { colors, spacing } from '../lib/design-system';

export default function DesignSystemPage() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }}>
            {/* Header */}
            <View style={{
                padding: spacing.xl,
                backgroundColor: colors.primary[500],
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: colors.text.inverse,
                    marginBottom: spacing.sm,
                }}>
                    Design System
                </Text>
                <Text style={{
                    fontSize: 16,
                    color: colors.text.inverse,
                    opacity: 0.9,
                }}>
                    Component Library Showcase
                </Text>
            </View>

            <View style={{ padding: spacing.lg }}>

                {/* Buttons Section */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.lg,
                }}>
                    Buttons
                </Text>

                {/* Primary */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Primary
                    </Text>
                    <Button title="Primary Button" onPress={() => alert('Primary clicked!')} />
                </View>

                {/* Secondary */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Secondary
                    </Text>
                    <Button
                        title="Secondary Button"
                        onPress={() => alert('Secondary!')}
                        variant="secondary"
                    />
                </View>

                {/* Outline */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Outline
                    </Text>
                    <Button
                        title="Outline Button"
                        onPress={() => alert('Outline!')}
                        variant="outline"
                    />
                </View>

                {/* Ghost */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Ghost
                    </Text>
                    <Button
                        title="Ghost Button"
                        onPress={() => alert('Ghost!')}
                        variant="ghost"
                    />
                </View>

                {/* Danger */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Danger
                    </Text>
                    <Button
                        title="Delete Account"
                        onPress={() => alert('Danger!')}
                        variant="danger"
                    />
                </View>

                {/* With Icon */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        With Icon
                    </Text>
                    <Button
                        title="Like Post"
                        onPress={() => alert('Liked!')}
                        icon="❤️"
                    />
                </View>

                {/* Sizes */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Sizes
                    </Text>
                    <View style={{ gap: spacing.sm }}>
                        <Button title="Small Button" onPress={() => { }} size="sm" />
                        <Button title="Medium Button" onPress={() => { }} size="md" />
                        <Button title="Large Button" onPress={() => { }} size="lg" />
                    </View>
                </View>

                {/* States */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        States
                    </Text>
                    <View style={{ gap: spacing.sm }}>
                        <Button title="Loading..." onPress={() => { }} loading />
                        <Button title="Disabled" onPress={() => { }} disabled />
                    </View>
                </View>

                {/* Full Width */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Full Width
                    </Text>
                    <Button
                        title="Full Width Button"
                        onPress={() => { }}
                        fullWidth
                    />
                </View>

                {/* Color Palette */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.xl,
                }}>
                    Color Palette
                </Text>

                {/* Primary Colors */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Primary (Red)
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap' }}>
                        <View style={{ width: 60, height: 60, backgroundColor: colors.primary[300], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.primary[400], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.primary[500], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.primary[600], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.primary[700], borderRadius: 8 }} />
                    </View>
                </View>

                {/* Secondary Colors */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Secondary (Purple)
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap' }}>
                        <View style={{ width: 60, height: 60, backgroundColor: colors.secondary[300], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.secondary[400], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.secondary[500], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.secondary[600], borderRadius: 8 }} />
                        <View style={{ width: 60, height: 60, backgroundColor: colors.secondary[700], borderRadius: 8 }} />
                    </View>
                </View>

                {/* Spacing */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.xl,
                }}>
                    Spacing Scale
                </Text>

                <View style={{ marginBottom: spacing['2xl'] }}>
                    {Object.entries(spacing).map(([key, value]) => (
                        <View key={key} style={{ marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: 60, color: colors.text.secondary }}>{key}</Text>
                            <View style={{
                                height: 20,
                                width: value,
                                backgroundColor: colors.primary[400],
                                borderRadius: 4,
                            }} />
                            <Text style={{ marginLeft: spacing.sm, color: colors.text.tertiary }}>
                                {value}px
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Cards Section */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.xl,
                }}>
                    Cards
                </Text>

                {/* Elevated Card */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Elevated (with shadow)
                    </Text>
                    <Card variant="elevated">
                        <CardHeader>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Card Title</Text>
                            <Text style={{ fontSize: 14, color: colors.text.secondary }}>Subtitle</Text>
                        </CardHeader>
                        <CardContent>
                            <Text style={{ color: colors.text.secondary }}>
                                This is a card with elevation and shadow. Perfect for standing out on the page.
                            </Text>
                        </CardContent>
                        <CardFooter>
                            <Button title="Action" onPress={() => { }} size="sm" />
                            <Button title="Cancel" onPress={() => { }} variant="ghost" size="sm" />
                        </CardFooter>
                    </Card>
                </View>

                {/* Outlined Card */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Outlined (with border)
                    </Text>
                    <Card variant="outlined">
                        <CardHeader>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Outlined Card</Text>
                        </CardHeader>
                        <CardContent>
                            <Text style={{ color: colors.text.secondary }}>
                                This card has a subtle border instead of shadow.
                            </Text>
                        </CardContent>
                    </Card>
                </View>

                {/* Filled Card */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Filled (with background)
                    </Text>
                    <Card variant="filled">
                        <CardHeader>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Filled Card</Text>
                        </CardHeader>
                        <CardContent>
                            <Text style={{ color: colors.text.secondary }}>
                                This card has a light gray background.
                            </Text>
                        </CardContent>
                    </Card>
                </View>

                {/* Pressable Card */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Pressable (interactive)
                    </Text>
                    <Card
                        variant="elevated"
                        onPress={() => alert('Card clicked!')}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>👆 Tap me!</Text>
                        <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: spacing.xs }}>
                            This card responds to press with scale animation
                        </Text>
                    </Card>
                </View>

                {/* Post Card Example */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Example: Social Post
                    </Text>
                    <Card variant="elevated">
                        <CardHeader style={{ marginBottom: spacing.sm }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: colors.secondary[400]
                                }} />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>@username</Text>
                                    <Text style={{ fontSize: 12, color: colors.text.tertiary }}>2h ago</Text>
                                </View>
                            </View>
                        </CardHeader>
                        <CardContent>
                            <Text style={{ fontSize: 15, lineHeight: 22 }}>
                                Just deployed my first Edge Function! 🚀 This Gen Z UI is looking fire 🔥
                            </Text>
                        </CardContent>
                        <CardFooter>
                            <Button title="❤️ 42" onPress={() => { }} variant="ghost" size="sm" />
                            <Button title="💬 12" onPress={() => { }} variant="ghost" size="sm" />
                            <Button title="🔗 Share" onPress={() => { }} variant="ghost" size="sm" />
                        </CardFooter>
                    </Card>
                </View>

                {/* Inputs Section */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.xl,
                }}>
                    Inputs
                </Text>

                {/* Basic Input */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Basic Input
                    </Text>
                    <Input
                        placeholder="Enter your name"
                    />
                </View>

                {/* With Label */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        With Label
                    </Text>
                    <Input
                        label="Email"
                        placeholder="you@example.com"
                    />
                </View>

                {/* With Icons */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        With Icons
                    </Text>
                    <Input
                        label="Search"
                        placeholder="Search posts..."
                        leftIcon="🔍"
                    />
                    <View style={{ height: spacing.md }} />
                    <Input
                        label="Email"
                        placeholder="you@example.com"
                        leftIcon="✉️"
                        rightIcon="✅"
                    />
                </View>

                {/* Error State */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Error State
                    </Text>
                    <Input
                        label="Password"
                        placeholder="Enter password"
                        error="Password must be at least 8 characters"
                        secureTextEntry
                    />
                </View>

                {/* Helper Text */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        With Helper Text
                    </Text>
                    <Input
                        label="Username"
                        placeholder="johndoe"
                        helperText="Choose a unique username"
                    />
                </View>

                {/* Filled Variant */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Filled Variant
                    </Text>
                    <Input
                        label="Message"
                        placeholder="Type your message"
                        variant="filled"
                    />
                </View>

                {/* Sizes */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Sizes
                    </Text>
                    <Input
                        placeholder="Small"
                        size="sm"
                    />
                    <View style={{ height: spacing.sm }} />
                    <Input
                        placeholder="Medium (default)"
                        size="md"
                    />
                    <View style={{ height: spacing.sm }} />
                    <Input
                        placeholder="Large"
                        size="lg"
                    />
                </View>

                {/* TextArea */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        TextArea (Multiline)
                    </Text>
                    <TextArea
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        helperText="Maximum 150 characters"
                    />
                </View>

                {/* Disabled */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Disabled
                    </Text>
                    <Input
                        placeholder="This is disabled"
                        editable={false}
                        value="Cannot edit this"
                    />
                </View>

                {/* Avatars Section */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.xl,
                }}>
                    Avatars
                </Text>

                {/* Sizes */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Sizes
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
                        <Avatar name="John Doe" size="xs" />
                        <Avatar name="Jane Smith" size="sm" />
                        <Avatar name="Bob Wilson" size="md" />
                        <Avatar name="Alice Johnson" size="lg" />
                        <Avatar name="Charlie Brown" size="xl" />
                    </View>
                </View>

                {/* With Images */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        With Images
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
                        <Avatar
                            imageUrl="https://i.pravatar.cc/150?img=1"
                            name="User 1"
                            size="md"
                        />
                        <Avatar
                            imageUrl="https://i.pravatar.cc/150?img=2"
                            name="User 2"
                            size="md"
                        />
                        <Avatar
                            imageUrl="https://i.pravatar.cc/150?img=3"
                            name="User 3"
                            size="md"
                        />
                    </View>
                </View>

                {/* Initials (no image) */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Initials (auto-generated colors)
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' }}>
                        <Avatar name="Alex Turner" size="md" />
                        <Avatar name="Sarah Connor" size="md" />
                        <Avatar name="Mike Ross" size="md" />
                        <Avatar name="Emma Stone" size="md" />
                        <Avatar name="David Miller" size="md" />
                    </View>
                </View>

                {/* With Online Badge */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        With Status Badge
                    </Text>
                    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
                        <Avatar
                            name="Online User"
                            size="lg"
                            showBadge
                            badgeColor={colors.success}
                        />
                        <Avatar
                            name="Busy User"
                            size="lg"
                            showBadge
                            badgeColor={colors.warning}
                        />
                        <Avatar
                            name="Away User"
                            size="lg"
                            showBadge
                            badgeColor={colors.error}
                        />
                    </View>
                </View>

                {/* Avatar Group */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Avatar Group (stacked)
                    </Text>
                    <AvatarGroup
                        avatars={[
                            { name: "User 1", imageUrl: "https://i.pravatar.cc/150?img=5" },
                            { name: "User 2", imageUrl: "https://i.pravatar.cc/150?img=6" },
                            { name: "User 3", imageUrl: "https://i.pravatar.cc/150?img=7" },
                            { name: "User 4" },
                            { name: "User 5" },
                        ]}
                        max={3}
                        size="md"
                    />
                    <View style={{ height: spacing.sm }} />
                    <AvatarGroup
                        avatars={[
                            { name: "Alice" },
                            { name: "Bob" },
                            { name: "Charlie" },
                            { name: "David" },
                            { name: "Emma" },
                            { name: "Frank" },
                            { name: "Grace" },
                        ]}
                        max={4}
                        size="sm"
                    />
                </View>

                {/* In Card Example */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        In Context (Post Header)
                    </Text>
                    <Card variant="elevated">
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                            <Avatar
                                name="Sarah Wilson"
                                imageUrl="https://i.pravatar.cc/150?img=10"
                                size="md"
                                showBadge
                            />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Sarah Wilson</Text>
                                <Text style={{ fontSize: 14, color: colors.text.tertiary }}>@swilson • 5m ago</Text>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Typography Section */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: spacing.md,
                    marginTop: spacing.xl,
                }}>
                    Typography
                </Text>

                {/* Headings */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Headings
                    </Text>
                    <Typography variant="h1">Heading 1</Typography>
                    <Typography variant="h2">Heading 2</Typography>
                    <Typography variant="h3">Heading 3</Typography>
                    <Typography variant="h4">Heading 4</Typography>
                </View>

                {/* Body Text */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Body Text
                    </Text>
                    <Typography variant="bodyLarge">
                        Large body text for emphasis. Perfect for introductions and important content.
                    </Typography>
                    <View style={{ height: spacing.sm }} />
                    <Typography variant="body">
                        Regular body text for main content. This is the default size for paragraphs and general reading.
                    </Typography>
                    <View style={{ height: spacing.sm }} />
                    <Typography variant="bodySmall">
                        Small body text for secondary information. Good for metadata and less important details.
                    </Typography>
                </View>

                {/* Caption & Overline */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Caption & Overline
                    </Text>
                    <Typography variant="caption">
                        Caption text for tiny details like timestamps and footnotes
                    </Typography>
                    <View style={{ height: spacing.sm }} />
                    <Typography variant="overline">
                        Overline Text
                    </Typography>
                </View>

                {/* Weights */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Font Weights
                    </Text>
                    <Typography variant="body" weight="normal">Normal weight</Typography>
                    <Typography variant="body" weight="medium">Medium weight</Typography>
                    <Typography variant="body" weight="semibold">Semibold weight</Typography>
                    <Typography variant="body" weight="bold">Bold weight</Typography>
                    <Typography variant="body" weight="extrabold">Extrabold weight</Typography>
                </View>

                {/* Colors */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Custom Colors
                    </Text>
                    <Typography variant="body" color={colors.primary[500]}>Primary color text</Typography>
                    <Typography variant="body" color={colors.secondary[500]}>Secondary color text</Typography>
                    <Typography variant="body" color={colors.success}>Success color text</Typography>
                    <Typography variant="body" color={colors.error}>Error color text</Typography>
                </View>

                {/* Alignment */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Text Alignment
                    </Text>
                    <Typography variant="body" align="left">Left aligned</Typography>
                    <Typography variant="body" align="center">Center aligned</Typography>
                    <Typography variant="body" align="right">Right aligned</Typography>
                </View>

                {/* Real Example */}
                <View style={{ marginBottom: spacing.lg }}>
                    <Text style={{ marginBottom: spacing.sm, color: colors.text.secondary, fontSize: 14 }}>
                        Real Example (Article Card)
                    </Text>
                    <Card variant="elevated">
                        <Typography variant="overline" color={colors.primary[500]}>
                            Featured
                        </Typography>
                        <Typography variant="h3" style={{ marginTop: spacing.xs, marginBottom: spacing.sm }}>
                            Building a Gen Z App
                        </Typography>
                        <Typography variant="body" style={{ marginBottom: spacing.md }}>
                            Learn how to create modern, vibrant user interfaces that resonate with Gen Z users using bold colors, smooth animations, and engaging interactions.
                        </Typography>
                        <Typography variant="caption">
                            Published 2 hours ago • 5 min read
                        </Typography>
                    </Card>
                </View>

            </View>
        </ScrollView>
    );
}