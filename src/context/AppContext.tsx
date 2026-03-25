import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Post, TrendingTopic, LiveStream, BreakingAlert, Notification, Conversation, Community, Prediction } from '../types'
import { INITIAL_POSTS, TRENDING_TOPICS, LIVE_STREAMS, BREAKING_ALERTS, TICKER_ITEMS, NOTIFICATIONS, CONVERSATIONS, COMMUNITIES, PREDICTIONS } from '../data/mockData'

interface Toast { id: string; message: string; type: 'success'|'error'|'info'|'breaking' }

interface AppCtx {
  isDark: boolean; toggleTheme: () => void
  posts: Post[]; addPost: (p: Post) => void; toggleLike: (id: string) => void
  toggleRepost: (id: string) => void; toggleBookmark: (id: string) => void
  voteOnPoll: (postId: string, optId: number) => void; pinPost: (id: string) => void
  deletePost: (id: string) => void; approvePost: (id: string) => void; featurePost: (id: string) => void
  bookmarkedPosts: Post[]
  trending: TrendingTopic[]; addTrendingTopic: (t: TrendingTopic) => void; removeTrendingTopic: (id: string) => void
  streams: LiveStream[]; featureStream: (id: string) => void; endStream: (id: string) => void
  breakingAlerts: BreakingAlert[]; addBreakingAlert: (a: BreakingAlert) => void; dismissAlert: (id: string) => void
  tickerItems: string[]
  notifications: Notification[]; markAllRead: () => void; markRead: (id: string) => void; unreadCount: number
  conversations: Conversation[]; sendMessage: (threadId: string, text: string) => void
  communities: Community[]; joinCommunity: (id: string) => void
  predictions: Prediction[]; voteOnPrediction: (predId: string, optId: number) => void
  toasts: Toast[]; addToast: (msg: string, type?: Toast['type']) => void
  mutedUsers: string[]; toggleMute: (handle: string) => void
  blockedUsers: string[]; toggleBlock: (handle: string) => void
  followingUsers: string[]; toggleFollow: (handle: string) => void
}

const Ctx = createContext<AppCtx>({} as AppCtx)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const s = localStorage.getItem('ppptv-theme')
    return s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [trending, setTrending] = useState<TrendingTopic[]>(TRENDING_TOPICS)
  const [streams, setStreams] = useState<LiveStream[]>(LIVE_STREAMS)
  const [breakingAlerts, setBreakingAlerts] = useState<BreakingAlert[]>(BREAKING_ALERTS)
  const [tickerItems, setTickerItems] = useState<string[]>(TICKER_ITEMS)
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS)
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS)
  const [communities, setCommunities] = useState<Community[]>(COMMUNITIES)
  const [predictions, setPredictions] = useState<Prediction[]>(PREDICTIONS)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mutedUsers, setMutedUsers] = useState<string[]>([])
  const [blockedUsers, setBlockedUsers] = useState<string[]>([])
  const [followingUsers, setFollowingUsers] = useState<string[]>(['ppptv','aminahassan'])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('ppptv-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString()
    setToasts(p => [...p.slice(-3), { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])

  const toggleTheme = () => setIsDark(p => !p)

  const addPost = useCallback((post: Post) => {
    setPosts(p => [post, ...p])
    addToast('Post published ✓', 'success')
  }, [addToast])

  const toggleLike = useCallback((id: string) => {
    setPosts(p => p.map(post => post.id !== id ? post : { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }))
  }, [])

  const toggleRepost = useCallback((id: string) => {
    setPosts(p => p.map(post => post.id !== id ? post : { ...post, isReposted: !post.isReposted, reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1 }))
  }, [])

  const toggleBookmark = useCallback((id: string) => {
    setPosts(p => p.map(post => post.id !== id ? post : { ...post, isBookmarked: !post.isBookmarked }))
    const post = posts.find(p => p.id === id)
    addToast(post?.isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', 'info')
  }, [posts, addToast])

  const voteOnPoll = useCallback((postId: string, optId: number) => {
    setPosts(p => p.map(post => {
      if (post.id !== postId || !post.poll || post.poll.voted != null) return post
      return { ...post, poll: { ...post.poll, voted: optId, totalVotes: post.poll.totalVotes + 1, options: post.poll.options.map(o => o.id === optId ? { ...o, votes: o.votes + 1 } : o) } }
    }))
  }, [])

  const pinPost = useCallback((id: string) => {
    setPosts(p => p.map(post => post.id !== id ? post : { ...post, isPinned: !post.isPinned }))
    addToast('Pin status updated', 'success')
  }, [addToast])

  const deletePost = useCallback((id: string) => {
    setPosts(p => p.filter(post => post.id !== id))
    addToast('Post removed', 'info')
  }, [addToast])

  const approvePost = useCallback((id: string) => {
    setPosts(p => p.map(post => post.id !== id ? post : { ...post, isFlagged: false }))
    addToast('Post approved and cleared', 'success')
  }, [addToast])

  const featurePost = useCallback((id: string) => {
    setPosts(p => p.map(post => post.id !== id ? post : { ...post, isPinned: true }))
    addToast('Post featured on homepage', 'success')
  }, [addToast])

  const bookmarkedPosts = posts.filter(p => p.isBookmarked)

  const addTrendingTopic = useCallback((topic: TrendingTopic) => {
    setTrending(p => [topic, ...p])
    addToast(`${topic.tag} added to trending`, 'success')
  }, [addToast])

  const removeTrendingTopic = useCallback((id: string) => {
    setTrending(p => p.filter(t => t.id !== id))
    addToast('Topic removed from trending', 'info')
  }, [addToast])

  const featureStream = useCallback((id: string) => {
    setStreams(p => p.map(s => s.id !== id ? s : { ...s, isFeatured: !s.isFeatured }))
    addToast('Stream feature status updated', 'success')
  }, [addToast])

  const endStream = useCallback((id: string) => {
    setStreams(p => p.map(s => s.id !== id ? s : { ...s, isLive: false }))
    addToast('Stream ended', 'info')
  }, [addToast])

  const addBreakingAlert = useCallback((alert: BreakingAlert) => {
    setBreakingAlerts(p => [alert, ...p])
    setTickerItems(p => [`🔴 BREAKING: ${alert.headline}`, ...p])
    addToast('Breaking news published!', 'breaking')
  }, [addToast])

  const dismissAlert = useCallback((id: string) => setBreakingAlerts(p => p.filter(a => a.id !== id)), [])

  const unreadCount = notifications.filter(n => !n.read).length
  const markAllRead = useCallback(() => setNotifications(p => p.map(n => ({ ...n, read: true }))), [])
  const markRead = useCallback((id: string) => setNotifications(p => p.map(n => n.id !== id ? n : { ...n, read: true })), [])

  const sendMessage = useCallback((threadId: string, text: string) => {
    const YOU = { id:'me', name:'You', handle:'youhandle', avatarColor:'linear-gradient(135deg,#7c3aed,#a855f7)', verified:false, isPro:false, followers:142, following:89 }
    setConversations(p => p.map(c => c.id !== threadId ? c : {
      ...c, lastMessage: text, lastTimestamp: 'just now',
      messages: [...c.messages, { id: `m${Date.now()}`, from: YOU, to: c.participant, content: text, timestamp: 'just now', read: true, thread: threadId }]
    }))
  }, [])

  const joinCommunity = useCallback((id: string) => {
    setCommunities(p => p.map(c => c.id !== id ? c : { ...c, isJoined: !c.isJoined, members: c.isJoined ? c.members - 1 : c.members + 1 }))
    const comm = communities.find(c => c.id === id)
    addToast(comm?.isJoined ? `Left ${comm.name}` : `Joined ${comm?.name}`, 'success')
  }, [communities, addToast])

  const voteOnPrediction = useCallback((predId: string, optId: number) => {
    setPredictions(p => p.map(pred => {
      if (pred.id !== predId || pred.voted != null) return pred
      return { ...pred, voted: optId, totalVotes: pred.totalVotes + 1, options: pred.options.map(o => o.id === optId ? { ...o, votes: o.votes + 1 } : o) }
    }))
    addToast('Vote recorded!', 'success')
  }, [addToast])

  const toggleMute = useCallback((handle: string) => {
    setMutedUsers(p => p.includes(handle) ? p.filter(h => h !== handle) : [...p, handle])
    addToast(mutedUsers.includes(handle) ? `Unmuted @${handle}` : `Muted @${handle}`, 'info')
  }, [mutedUsers, addToast])

  const toggleBlock = useCallback((handle: string) => {
    setBlockedUsers(p => p.includes(handle) ? p.filter(h => h !== handle) : [...p, handle])
    addToast(blockedUsers.includes(handle) ? `Unblocked @${handle}` : `Blocked @${handle}`, 'info')
  }, [blockedUsers, addToast])

  const toggleFollow = useCallback((handle: string) => {
    setFollowingUsers(p => p.includes(handle) ? p.filter(h => h !== handle) : [...p, handle])
  }, [])

  return (
    <Ctx.Provider value={{
      isDark, toggleTheme, posts, addPost, toggleLike, toggleRepost, toggleBookmark,
      voteOnPoll, pinPost, deletePost, approvePost, featurePost, bookmarkedPosts,
      trending, addTrendingTopic, removeTrendingTopic, streams, featureStream, endStream,
      breakingAlerts, addBreakingAlert, dismissAlert, tickerItems,
      notifications, markAllRead, markRead, unreadCount,
      conversations, sendMessage, communities, joinCommunity,
      predictions, voteOnPrediction, toasts, addToast,
      mutedUsers, toggleMute, blockedUsers, toggleBlock, followingUsers, toggleFollow,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useApp = () => useContext(Ctx)
