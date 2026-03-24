export interface Author {
  id: string; name: string; handle: string; avatarColor: string; avatar?: string
  verified: boolean; isPro: boolean; isAdmin?: boolean
  followers: number; following: number; bio?: string; region?: string
  website?: string; joinedAt?: string; postsCount?: number
  isFollowing?: boolean; isMuted?: boolean; isBlocked?: boolean
}
export interface PollOption { id: number; text: string; votes: number }
export interface Poll { question: string; options: PollOption[]; totalVotes: number; endsAt: string; voted?: number | null }
export interface FactCheck { status: 'verified'|'disputed'|'misleading'|'unverified'; source: string; url?: string }
export type PostType = 'regular'|'live'|'news'|'breaking'|'debate'|'prediction'
export interface Post {
  id: string; author: Author; content: string; timestamp: string; type: PostType
  likes: number; comments: number; reposts: number; views: number
  image?: string; poll?: Poll; factCheck?: FactCheck
  isLiked?: boolean; isReposted?: boolean; isBookmarked?: boolean; isAnonymous?: boolean
  region?: string; newsSource?: string; newsCategory?: string
  isPinned?: boolean; isBreaking?: boolean; tags?: string[]
  urgency?: 'low'|'medium'|'high'|'critical'; isFlagged?: boolean; flagReason?: string
  replyTo?: string; quotedPost?: Post; debateSide?: 'for'|'against'
}
export interface TrendingTopic { id: string; tag: string; category: string; postCount: number; change: number }
export interface LiveStream { id: string; title: string; host: Author; viewers: number; thumbnail: string; category: string; startedAt: string; isLive: boolean; isFeatured?: boolean; description?: string }
export interface BreakingAlert { id: string; headline: string; summary?: string; category: string; urgency: 'normal'|'urgent'|'critical'; timestamp: string; source: string }
export type NotifType = 'like'|'repost'|'reply'|'follow'|'mention'|'breaking'|'poll_ended'
export interface Notification { id: string; type: NotifType; actor: Author; post?: Post; message: string; timestamp: string; read: boolean }
export interface Message { id: string; from: Author; to: Author; content: string; timestamp: string; read: boolean; thread: string }
export interface Conversation { id: string; participant: Author; lastMessage: string; lastTimestamp: string; unread: number; messages: Message[] }
export interface Debate { id: string; topic: string; description: string; forCount: number; againstCount: number; totalPosts: number; endsAt: string; category: string; isFeatured: boolean; tags: string[] }
export interface Prediction { id: string; author: Author; question: string; description?: string; options: {id: number; text: string; votes: number; odds: string}[]; totalVotes: number; deadline: string; category: string; status: 'open'|'resolved'|'cancelled'; outcome?: string; voted?: number|null; timestamp: string; likes: number; comments: number; tags: string[] }
export interface Community { id: string; name: string; description: string; color: string; members: number; posts: number; category: string; isJoined: boolean; isFeatured?: boolean; rules?: string[] }
