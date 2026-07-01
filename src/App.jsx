import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CircuitBoard,
  Clock3,
  Code2,
  Cpu,
  Crown,
  Disc3,
  ExternalLink,
  Gamepad2,
  Globe2,
  HardDrive,
  Headphones,
  Keyboard,
  MemoryStick,
  Monitor,
  Mouse,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Smartphone,
  Ticket,
  Upload,
  Volume2,
  X,
} from 'lucide-react'
import heroImage from './assets/hero.png'
import crewPhoto from './assets/michbanner.png'
import profileImage from './assets/profile.jpg'
import './App.css'
import DOMPurify from 'dompurify'

const SPEC_SECTIONS = [
  {
    label: 'PC',
    items: [
      { category: 'CPU',   icon: Cpu,         name: 'Intel Core i5-12600K',              href: 'https://ark.intel.com/content/www/us/en/ark/products/134589/intel-core-i5-12600k-processor-20m-cache-up-to-4-90-ghz.html' },
      { category: 'GPU',   icon: Gamepad2,    name: 'NVIDIA GeForce RTX 5060 Ti',        href: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-ti/' },
      { category: 'RAM',   icon: MemoryStick, name: '16GB DDR4 2667MHz',                 href: 'https://www.crucial.com/memory/ddr4' },
      { category: 'MOBO',  icon: CircuitBoard,name: 'Gigabyte B760M Gaming X AX DDR4',   href: 'https://www.gigabyte.com/Motherboard/B760M-GAMING-X-AX-DDR4' },
      { category: 'Drive', icon: HardDrive,   name: 'KLEVV CRAS C910G NVMe 1TB',         href: 'https://www.essencore.com/product/klevv-cras-c910g-m2-nvme-ssd/' },
    ],
  },
  {
    label: 'Peripherals',
    items: [
      { category: 'Mouse', icon: Mouse,    name: 'Logitech G Pro X Superlight',       href: 'https://www.logitechg.com/en-us/products/gaming-mice/pro-x-superlight-wireless-mouse.html' },
      { category: 'KB',    icon: Keyboard, name: 'Keychron Q1 Max',                   href: 'https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard' },
    ],
  },
]

const DISCORD_ID = '380366681794543617'
const HOME_TIMEZONE = 'America/Chicago'
const BIRTHDAY = new Date('2001-11-12T00:00:00-06:00')
const LASTFM_USERNAME = 'ihymich'
const DEFAULT_ACCENT = [160, 0, 64]

const fallbackProfile = {
  username: 'J4ke',
  handle: 'ihymich',
  avatarUrl: profileImage,
  bannerUrl: crewPhoto,
  status: 'offline',
  customStatus: '.gg/gogurt',
  devices: [],
}

function SteamIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.498 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function SpotifyGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.8 15.6c3.3-1.1 6.6-.9 9.6.7M6.2 12.1c3.8-1.3 7.9-1.1 11.5.8M6 8.5c4.2-1.4 8.9-1.2 12.9.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function DiscordIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.54 5.23A16.9 16.9 0 0 0 15.36 4c-.18.32-.39.75-.53 1.1a15.7 15.7 0 0 0-4.66 0c-.14-.35-.35-.78-.53-1.1-1.46.25-2.86.66-4.18 1.23C2.82 9.18 2.44 13.04 2.73 16.84A16.8 16.8 0 0 0 7.85 19.4c.41-.55.78-1.14 1.09-1.75-.6-.22-1.17-.49-1.7-.81.14-.1.28-.21.41-.32a12.1 12.1 0 0 0 10.7 0c.14.11.27.22.41.32-.54.32-1.1.59-1.71.81.31.61.68 1.2 1.09 1.75a16.7 16.7 0 0 0 5.13-2.56c.34-4.4-.58-8.22-3.73-11.61ZM8.84 14.49c-1 0-1.82-.91-1.82-2.03s.8-2.03 1.82-2.03c1.01 0 1.84.92 1.82 2.03 0 1.12-.81 2.03-1.82 2.03Zm6.32 0c-1 0-1.82-.91-1.82-2.03s.8-2.03 1.82-2.03c1.02 0 1.84.92 1.82 2.03 0 1.12-.8 2.03-1.82 2.03Z" />
    </svg>
  )
}

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function RobloxIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.24 1.11L1.11 18.76 18.76 22.89 22.89 5.24 5.24 1.11zm9.42 12.43l-5.27-1.25 1.25-5.27 5.27 1.25-1.25 5.27z" />
    </svg>
  )
}

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/bishhhhop/', icon: InstagramIcon, cls: 'social-badge--instagram' },
  { label: 'Discord', href: 'https://discord.gg/gogurt', icon: DiscordIcon, cls: 'social-badge--discord' },
  { label: 'GitHub', href: 'https://github.com/ihymich', icon: GitHubIcon, cls: 'social-badge--github' },
  { label: 'Roblox', href: 'https://www.roblox.com/users/ihymich/profile', icon: RobloxIcon, cls: 'social-badge--roblox' },
]

const recentTracks = [
  {
    title: 'Cristal & Mud',
    artist: 'Destroy Lonely',
    album: 'NO STYLIST',
    minutesAgo: 8,
    plays: 42,
    vibe: 'opium',
  },
  {
    title: 'NOSTYLIST',
    artist: 'Destroy Lonely',
    album: 'NO STYLIST',
    minutesAgo: 25,
    plays: 38,
    vibe: 'repeat',
  },
  {
    title: 'Long Time (feat. Destroy Lonely)',
    artist: 'Ken Carson',
    album: 'A Great Chaos',
    minutesAgo: 49,
    plays: 31,
    vibe: 'dark',
  },
  {
    title: 'MOLLY',
    artist: 'Destroy Lonely',
    album: 'NO STYLIST',
    minutesAgo: 73,
    plays: 27,
    vibe: 'drift',
  },
  {
    title: 'I WANT IT',
    artist: 'Ken Carson',
    album: 'A Great Chaos',
    minutesAgo: 96,
    plays: 22,
    vibe: 'haunt',
  },
  {
    title: 'In Love',
    artist: 'Destroy Lonely',
    album: 'if looks could kill',
    minutesAgo: 118,
    plays: 19,
    vibe: 'void',
  },
]

function pad(value) {
  return String(value).padStart(2, '0')
}

function formatMs(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${pad(seconds)}`
}

function fileIcon(ext) {
  if (ext === 'lua') return '📜'
  if (['txt', 'md'].includes(ext)) return '📄'
  if (ext === 'json') return '{}'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return '🖼'
  if (['mp3', 'wav', 'ogg'].includes(ext)) return '🎵'
  return '📁'
}

function formatBytes(n) {
  if (n < 1024) return `${n}B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`
  return `${(n / (1024 * 1024)).toFixed(1)}MB`
}

function formatUploadDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function previewType(ext) {
  if (['lua', 'txt', 'md', 'json', 'js', 'ts', 'css', 'html', 'xml', 'yaml', 'yml', 'sh', 'py', 'rb', 'go', 'rs', 'c', 'cpp', 'h', 'java'].includes(ext)) return 'text'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image'
  if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext)) return 'audio'
  return 'none'
}

function decodeDataUrl(dataUrl) {
  try {
    const comma = dataUrl.indexOf(',')
    if (comma === -1) return dataUrl
    const header = dataUrl.slice(0, comma)
    const payload = dataUrl.slice(comma + 1)
    if (header.includes('base64')) {
      const binary = atob(payload)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
      return new TextDecoder().decode(bytes)
    }
    return decodeURIComponent(payload)
  } catch { return '' }
}

function formatRelativeTime(value) {
  if (!value) return ''
  const diffMs = Date.now() - new Date(value).getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diffMs < minute) return 'now'
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`
  return `${Math.floor(diffMs / day)}d ago`
}

function formatElapsed(startMs, nowMs) {
  const totalSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)} elapsed`
  return `${pad(minutes)}:${pad(seconds)} elapsed`
}

function getLastfmImage(images) {
  if (!Array.isArray(images)) return null
  for (const size of ['extralarge', 'large', 'medium']) {
    const url = images.find((i) => i.size === size)?.['#text']
    if (url) return url
  }
  return null
}

function normalizeLastfmRecentTrack(track, index) {
  const isNow = Boolean(track['@attr']?.nowplaying)
  return {
    title: track.name || 'Unknown track',
    artist: track.artist?.['#text'] || 'Unknown artist',
    album: track.album?.['#text'] || '',
    image: getLastfmImage(track.image) || heroImage,
    spotifyId: null,
    previewUrl: null,
    endTime: isNow ? Date.now() : track.date?.uts ? Number(track.date.uts) * 1000 : null,
    rank: index + 1,
    plays: null,
    vibe: isNow ? 'now' : 'scrobble',
    repeatCount: 1,
    isNowPlaying: isNow,
  }
}

function normalizeLastfmTopTrack(track, index) {
  return {
    title: track.name || 'Unknown track',
    artist: track.artist?.name || 'Unknown artist',
    album: '',
    image: getLastfmImage(track.image) || heroImage,
    spotifyId: null,
    previewUrl: null,
    endTime: null,
    rank: Number(track['@attr']?.rank) || index + 1,
    plays: Number(track.playcount) || null,
    vibe: 'scrobble',
    repeatCount: 1,
    isNowPlaying: false,
  }
}

function getTrackKey(song) {
  if (song.spotifyId) return `spotify:${song.spotifyId}`
  return `${song.title}|${song.artist}|${song.album}`.toLowerCase()
}

function collapseRepeatedSongs(songs) {
  const merged = new Map()

  songs.forEach((song) => {
    const key = getTrackKey(song)
    const existing = merged.get(key)

    if (!existing) {
      merged.set(key, { ...song, repeatCount: song.repeatCount || 1 })
      return
    }

    merged.set(key, {
      ...existing,
      repeatCount: (existing.repeatCount || 1) + (song.repeatCount || 1),
      plays:
        existing.plays || song.plays
          ? Number(existing.plays || 0) + Number(song.plays || 0)
          : undefined,
    })
  })

  return Array.from(merged.values())
}

function getExactAge(now) {
  const diff = Math.max(0, now.getTime() - BIRTHDAY.getTime())
  return (diff / (365.2425 * 24 * 60 * 60 * 1000)).toFixed(9)
}

function getStaticAge(now) {
  let age = now.getFullYear() - BIRTHDAY.getFullYear()
  const hadBirthday =
    now.getMonth() > BIRTHDAY.getMonth() ||
    (now.getMonth() === BIRTHDAY.getMonth() && now.getDate() >= BIRTHDAY.getDate())
  return hadBirthday ? age : age - 1
}

function getStatusText(status) {
  return {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Do Not Disturb',
    offline: 'Offline',
  }[status] ?? 'Offline'
}

const SCRAMBLE_CHARS = '¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ"\'«åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?`~'

function ScrambleText({ text, duration = 700 }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    let frame
    const start = performance.now()
    const length = text.length

    function tick(now) {
      const elapsed = now - start
      if (elapsed >= duration) {
        setDisplay(text)
        return
      }

      const revealCount = Math.floor((elapsed / duration) * length)
      let next = ''
      for (let i = 0; i < length; i += 1) {
        next +=
          i < revealCount || text[i] === ' ' || text[i] === ','
            ? text[i]
            : SCRAMBLE_CHARS.charAt(Math.floor(Math.random() * SCRAMBLE_CHARS.length))
      }
      setDisplay(next)
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [text, duration])

  return <span className="scramble-text">{display}</span>
}

function HoverScramble({ text }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)

  function trigger() {
    if (frameRef.current) return
    const start = performance.now()
    const duration = 580
    const length = text.length

    function tick(now) {
      const elapsed = now - start
      if (elapsed >= duration) {
        setDisplay(text)
        frameRef.current = null
        return
      }
      const revealCount = Math.floor((elapsed / duration) * length)
      let next = ''
      for (let i = 0; i < length; i += 1) {
        next +=
          i < revealCount || text[i] === ' ' || text[i] === ','
            ? text[i]
            : SCRAMBLE_CHARS.charAt(Math.floor(Math.random() * SCRAMBLE_CHARS.length))
      }
      setDisplay(next)
      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)
  }

  useEffect(() => () => { if (frameRef.current) window.cancelAnimationFrame(frameRef.current) }, [])

  return <span className="scramble-text" onMouseEnter={trigger}>{display}</span>
}

function getDeviceIcon(device) {
  if (device === 'mobile') return Smartphone
  if (device === 'desktop') return Monitor
  return Globe2
}

function getActivityImageUrl(activity) {
  const img = activity.assets?.large_image
  if (!img) return null
  if (img.startsWith('mp:external/')) {
    return `https://media.discordapp.net/external/${img.slice('mp:external/'.length)}`
  }
  if (img.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${img.slice('spotify:'.length)}`
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`
  }
  return null
}

function ActivityIcon({ activity }) {
  const [imgFailed, setImgFailed] = useState(false)
  const isSpotify = activity.type === 2 || activity.name === 'Spotify'

  if (isSpotify) {
    return (
      <span className="activity-icon-wrap activity-icon-spotify">
        <SpotifyGlyph size={16} />
      </span>
    )
  }

  const imgUrl = getActivityImageUrl(activity)
  if (imgUrl && !imgFailed) {
    return (
      <img
        className="activity-game-art"
        src={imgUrl}
        alt=""
        draggable="false"
        onError={() => setImgFailed(true)}
      />
    )
  }

  return (
    <span className="activity-icon-wrap">
      {activity.type === 0 || activity.type === 'game' ? <Gamepad2 size={16} /> : <Activity size={16} />}
    </span>
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return now
}

function useDiscordPresence() {
  const [profile, setProfile] = useState(fallbackProfile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    function applyActivity(activityData) {
      if (cancelled) return
      const activity = activityData?.activities?.[DISCORD_ID] ?? null
      setProfile((prev) => ({
        ...prev,
        status: activity?.status || 'offline',
        customStatus: activity?.customStatus || fallbackProfile.customStatus,
        spotify: activity?.spotify || null,
        activities: activity?.activities || [],
        devices: activity?.devices || [],
      }))
    }

    async function fetchFull() {
      try {
        const [profileRes, activityRes] = await Promise.allSettled([
          fetch(`/api/discord-profile?id=${DISCORD_ID}&v=bio`),
          fetch(`/api/discord-activity?id=${DISCORD_ID}&name_${DISCORD_ID}=ihymich`),
        ])

        const profileData =
          profileRes.status === 'fulfilled' && profileRes.value.ok
            ? await profileRes.value.json()
            : null
        const activityData =
          activityRes.status === 'fulfilled' && activityRes.value.ok
            ? await activityRes.value.json()
            : null
        const activity = activityData?.activities?.[DISCORD_ID] ?? null

        if (!cancelled) {
          setProfile({
            username: profileData?.username || fallbackProfile.username,
            handle: profileData?.handle || fallbackProfile.handle,
            avatarUrl: profileData?.avatarUrl || fallbackProfile.avatarUrl,
            bannerUrl: profileData?.bannerUrl || fallbackProfile.bannerUrl,
            status: activity?.status || 'offline',
            customStatus: activity?.customStatus || fallbackProfile.customStatus,
            spotify: activity?.spotify || null,
            activities: activity?.activities || [],
            devices: activity?.devices || [],
          })
        }
      } catch {
        if (!cancelled) setProfile(fallbackProfile)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    async function fetchActivity() {
      if (document.hidden) return
      try {
        const res = await fetch(`/api/discord-activity?id=${DISCORD_ID}&name_${DISCORD_ID}=ihymich`)
        if (!res.ok) return
        applyActivity(await res.json())
      } catch {}
    }

    fetchFull()
    const activityId = window.setInterval(fetchActivity, 5000)
    const fullId = window.setInterval(() => {
      if (!document.hidden) fetchFull()
    }, 60000)

    return () => {
      cancelled = true
      window.clearInterval(activityId)
      window.clearInterval(fullId)
    }
  }, [])

  return { profile, loading }
}

function boostColor([r, g, b]) {
  const nr = r / 255, ng = g / 255, nb = b / 255
  const max = Math.max(nr, ng, nb), min = Math.min(nr, ng, nb)
  const l = (max + min) / 2
  const d = max - min
  let h = 0, s = 0
  if (d > 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === nr) h = ((ng - nb) / d + 6) % 6
    else if (max === ng) h = (nb - nr) / d + 2
    else h = (nr - ng) / d + 4
    h *= 60
  }
  const ns = Math.min(1, s * 1.4 + 0.3)
  const nl = 0.54
  const c = (1 - Math.abs(2 * nl - 1)) * ns
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = nl - c / 2
  let rr = 0, gg = 0, bb = 0
  if (h < 60) { rr = c; gg = x }
  else if (h < 120) { rr = x; gg = c }
  else if (h < 180) { gg = c; bb = x }
  else if (h < 240) { gg = x; bb = c }
  else if (h < 300) { rr = x; bb = c }
  else { rr = c; bb = x }
  return [Math.round((rr + m) * 255), Math.round((gg + m) * 255), Math.round((bb + m) * 255)]
}

function extractDominantColor(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const size = 24
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, size, size)
        const { data } = ctx.getImageData(0, 0, size, size)
        let best = null
        let bestScore = -1
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
          if (a < 128) continue
          const max = Math.max(r, g, b)
          const min = Math.min(r, g, b)
          const sat = max === 0 ? 0 : (max - min) / max
          const bri = max / 255
          if (bri < 0.12 || bri > 0.95 || sat < 0.15) continue
          const score = sat * 3 + bri * 0.3
          if (score > bestScore) { bestScore = score; best = [r, g, b] }
        }
        resolve(best ? boostColor(best) : null)
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = url
  })
}

function animateAccent(from, to, duration = 900) {
  const start = performance.now()
  function tick(now) {
    const raw = Math.min(1, (now - start) / duration)
    const t = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw
    const [r, g, b] = from.map((c, i) => Math.round(c + (to[i] - c) * t))
    document.documentElement.style.setProperty('--accent-r', r)
    document.documentElement.style.setProperty('--accent-g', g)
    document.documentElement.style.setProperty('--accent-b', b)
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`)
    if (raw < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function useAccentColor(albumArtUrl) {
  const currentRef = useRef(DEFAULT_ACCENT)

  useEffect(() => {
    async function apply() {
      const color = albumArtUrl ? await extractDominantColor(albumArtUrl) : null
      const resolved = color ?? DEFAULT_ACCENT
      animateAccent(currentRef.current, resolved)
      currentRef.current = resolved
    }
    apply()
  }, [albumArtUrl])
}

function useTilt(maxDeg = 2.5) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let enabled = false
    const timer = setTimeout(() => { enabled = true }, 1400)

    function onMove(e) {
      if (!enabled) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${(x * maxDeg * 2).toFixed(2)}deg) rotateX(${(-y * maxDeg * 2).toFixed(2)}deg)`
    }

    function onLeave() {
      if (!enabled) return
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      clearTimeout(timer)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [maxDeg])

  return ref
}

function useServerStats() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/discord-server')
        if (!res.ok || cancelled) return
        setStats(await res.json())
      } catch {}
    }

    load()
    const id = window.setInterval(load, 5 * 60 * 1000)
    return () => { cancelled = true; window.clearInterval(id) }
  }, [])

  return stats
}

const audioGraphCache = new WeakMap()

function connectAnalyser(audioElement) {
  if (!audioElement) return null

  let entry = audioGraphCache.get(audioElement)
  if (!entry) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContextClass()
      const source = ctx.createMediaElementSource(audioElement)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.6
      source.connect(analyser)
      analyser.connect(ctx.destination)
      entry = { ctx, analyser }
      audioGraphCache.set(audioElement, entry)
    } catch {
      return null
    }
  }

  if (entry.ctx.state === 'suspended') entry.ctx.resume().catch(() => {})
  return entry.analyser
}

function useVisualizer(active, level, analyserRef) {
  const canvasRef = useRef(null)
  const sizeRef = useRef({ w: 1, h: 1, ratio: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function sync() {
      const ratio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      sizeRef.current = { w, h, ratio }
      canvas.width = Math.floor(w * ratio)
      canvas.height = Math.floor(h * ratio)
    }

    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(canvas)
    window.addEventListener('resize', sync, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    let frame = 0
    let animationId
    let freqData = null

    function draw() {
      const { w, h, ratio } = sizeRef.current
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, w, h)

      const analyser = active ? analyserRef?.current : null
      if (analyser) {
        if (!freqData || freqData.length !== analyser.frequencyBinCount) {
          freqData = new Uint8Array(analyser.frequencyBinCount)
        }
        analyser.getByteFrequencyData(freqData)
      }

      const bars = 40
      const gap = 3
      const barWidth = w / bars - gap
      for (let index = 0; index < bars; index += 1) {
        let height
        if (freqData) {
          // Most musical energy lives in the lower ~70% of the spectrum, so
          // restrict sampling to that range or the upper bars read near-silence.
          const usableBins = Math.max(1, Math.floor(freqData.length * 0.7))
          const t = index / (bars - 1)
          const bin = Math.min(usableBins - 1, Math.floor(t * usableBins))
          const raw = freqData[bin] / 255
          const boosted = Math.pow(raw, 0.6) * (0.85 + t * 0.5)
          height = Math.max(0.07, Math.min(1, boosted)) * h * level
        } else {
          const wave = Math.sin(frame * 0.035 + index * 0.65)
          const jitter = Math.cos(frame * 0.02 + index * 0.21)
          height = (0.16 + Math.abs(wave) * 0.7 + jitter * 0.08) * h * level
        }
        const x = index * (barWidth + gap)
        const y = h - height
        context.fillStyle = `rgba(${180 + index * 0.4}, ${index * 0.2}, ${80 + index}, ${active ? 0.32 : 0.1})`
        context.fillRect(x, y, barWidth, height)
      }

      frame += active ? 1 : 0.18
      animationId = window.requestAnimationFrame(draw)
    }

    draw()
    return () => window.cancelAnimationFrame(animationId)
  }, [active, level, analyserRef])

  return canvasRef
}

function UploadsPage() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewingId, setViewingId] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const { profile: discordProfile } = useDiscordPresence()
  useAccentColor(discordProfile?.spotify?.album_art_url)

  useEffect(() => {
    fetch('/api/files').then(r => r.json()).then(setFiles).catch(() => setFiles([])).finally(() => setLoading(false))
  }, [])

  function download(file) {
    const a = document.createElement('a')
    a.href = file.data
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function rawUrl(file) {
    return `${window.location.origin}/api/raw/${encodeURIComponent(file.name)}`
  }

  function copyRaw(file) {
    const url = file.ext === 'lua'
      ? `loadstring(game:HttpGet("${rawUrl(file)}"))()`
      : rawUrl(file)
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(file.id)
      setTimeout(() => setCopiedId(null), 1800)
    })
  }

  return (
    <main className="bio-shell uploads-page-shell">
      <div className="top-rainbow-bar" aria-hidden="true" />
      <div className="page-backdrop" />
      <button onClick={() => navigate('/')} className="uploads-back">← back</button>
      <div className="uploads-page-content">
        <h1 className="uploads-page-title">uploads</h1>
        <p className="uploads-page-sub">files, scripts &amp; stuff</p>
        <div className="uploads-page-list">
          {loading && <p className="uploads-empty">loading…</p>}
          {!loading && files.length === 0 && <p className="uploads-empty">nothing here yet</p>}
          {files.map(f => {
            const pt = previewType(f.ext)
            const isOpen = viewingId === f.id
            const isCopied = copiedId === f.id
            return (
              <div key={f.id} className="upload-item-wrap">
                <div
                  className={`upload-item${pt !== 'none' ? ' upload-item--previewable' : ''}${isOpen ? ' upload-item--open' : ''}`}
                  onClick={pt !== 'none' ? () => setViewingId(isOpen ? null : f.id) : undefined}
                >
                  <span className="upload-item-icon">{fileIcon(f.ext)}</span>
                  <div className="upload-item-meta">
                    <span className="upload-item-name">{f.name}</span>
                    {f.description ? <span className="upload-item-desc">{f.description}</span> : null}
                    <span className="upload-item-detail">{formatBytes(f.size)} · {formatUploadDate(f.created_at)}</span>
                  </div>
                  <div className="upload-item-actions">
                    <button
                      type="button"
                      className={`upload-item-copy${isCopied ? ' upload-item-copy--done' : ''}`}
                      onClick={e => { e.stopPropagation(); copyRaw(f) }}
                      title={f.ext === 'lua' ? 'Copy loadstring' : 'Copy link'}
                    >{isCopied ? '✓' : '⎘'}</button>
                    {pt !== 'none' && <span className="upload-item-chevron" aria-hidden="true">{isOpen ? '▴' : '▾'}</span>}
                    <button type="button" className="upload-item-dl" onClick={e => { e.stopPropagation(); download(f) }} title="Download">↓</button>
                  </div>
                </div>
                {isOpen && (
                  <div className="upload-preview">
                    {pt === 'text' && <pre className="upload-preview-code"><code>{decodeDataUrl(f.data)}</code></pre>}
                    {pt === 'image' && <img className="upload-preview-img" src={f.data} alt={f.name} />}
                    {pt === 'audio' && <audio className="upload-preview-audio" controls src={f.data} />}
                    <div className="upload-preview-rawbar">
                      <span className="uprb-label">{f.ext === 'lua' ? 'exec' : 'raw'}</span>
                      <code className="uprb-url">{f.ext === 'lua' ? `loadstring(game:HttpGet("${rawUrl(f)}"))()`  : rawUrl(f)}</code>
                      <button type="button" className={`uprb-copy${isCopied ? ' uprb-copy--done' : ''}`} onClick={() => copyRaw(f)}>{isCopied ? '✓' : '⎘'}</button>
                    </div>
                    <button type="button" className="upload-preview-dl" onClick={() => download(f)}>↓ download {f.name}</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <span className="dev-tag">made by landan</span>
    </main>
  )
}

function ProfileCard({ profile, loading, now, location = 'KC, MO', nameStyle = 'melt', customName, customHandle }) {
  const tiltRef = useTilt(2)
  const turbRef = useRef(null)
  const inkRef = useRef(null)
  useEffect(() => {
    const turb = turbRef.current
    const el = inkRef.current
    if (!turb || !el) return

    let t = 0
    let curX = 0, curY = 0
    let tarX = 0, tarY = 0
    let curScale = 13, tarScale = 13
    let id

    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const radius = Math.max(rect.width, rect.height) * 1.8
      const proximity = Math.max(0, 1 - dist / radius)
      tarX = (dx / radius) * 4 * proximity
      tarY = (dy / radius) * 3 * proximity
      tarScale = 13 + proximity * 7
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    function tick() {
      t += 0.0018
      const b1 = (0.036 + Math.sin(t) * 0.013).toFixed(4)
      const b2 = (0.047 + Math.cos(t * 0.68) * 0.009).toFixed(4)
      turb.setAttribute('baseFrequency', `${b1} ${b2}`)

      curX += (tarX - curX) * 0.07
      curY += (tarY - curY) * 0.07
      curScale += (tarScale - curScale) * 0.07

      const disp = turb.nextElementSibling
      if (disp) disp.setAttribute('scale', curScale.toFixed(2))
      el.style.transform = `translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px)`

      id = window.requestAnimationFrame(tick)
    }

    id = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(id)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const timeText = new Intl.DateTimeFormat('en-US', {
    timeZone: HOME_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)

  return (
    <div className="profile-panel" ref={tiltRef}>
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.036 0.047" numOctaves="4" seed="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="13" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="profile-meta-row">
        <div className="meta-badge">
          <Clock3 size={16} />
          <span>{timeText}</span>
        </div>
      </div>
      <section className="profile-card">
        <img className="profile-banner" src={profile.bannerUrl || crewPhoto} alt="" draggable="false" />
        {loading ? <div className="loading-overlay">Loading..</div> : null}
        <div className="profile-main">
          <div className="avatar-wrap">
            <img className="avatar" src={profile.avatarUrl} alt="Profile" draggable="false" />
          </div>
          <div className="name-block">
            <h1>
              <span className={`name-style-${nameStyle}`} ref={inkRef}>{customName || 'j4ke'}</span>
            </h1>
            <div className="username-line">
              <span>@{customHandle || profile.handle}</span>
              <a
                className="add-profile-button"
                href={`https://discord.com/users/${DISCORD_ID}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Add J4ke on Discord"
              >
                <Plus size={14} />
                <span>Add</span>
              </a>
              <div className="devices">
                {profile.devices.map((device) => {
                  const Icon = getDeviceIcon(device)
                  return <Icon key={device} size={15} />
                })}
              </div>
            </div>
          </div>
        </div>
        {profile.customStatus ? (
          <p className="custom-status">
            <span>{profile.customStatus}</span>
            <span className="profile-badge status-owner-badge">
              <Crown size={12} />
              <span className="badge-label">Owner</span>
            </span>
          </p>
        ) : null}
        <div className="profile-facts">
          <span className="status-fact">
            <i className={`status-dot ${profile.status}`} aria-hidden="true" />
            {getStatusText(profile.status)}
          </span>
          <span className="tooltip-trigger">
            {getStaticAge(now)} years old
            <span className="tooltip-box">{getExactAge(now)}</span>
          </span>
          <span className="location-fact">
            <Globe2 size={13} />
            <HoverScramble text={location} />
          </span>
        </div>
        <div className="profile-badges">
          <div className="profile-badge">
            <Ticket size={12} />
            <span className="badge-label">Invited</span>
          </div>
          <a href="https://gogurt.pages.dev" target="_blank" rel="noreferrer" className="site-link-pill">
            <ExternalLink size={9} />
            gogurt.pages.dev
          </a>
          <a href="https://vanillabrice.pages.dev" target="_blank" rel="noreferrer" className="site-link-pill">
            <ExternalLink size={9} />
            vanillabrice.pages.dev
          </a>
        </div>
      </section>
    </div>
  )
}

function SpotifyCard({ spotify, now }) {
  const tiltRef = useTilt()
  const isListening = Boolean(spotify)
  const nowMs = now instanceof Date ? now.getTime() : now
  const started = spotify?.timestamps?.start || nowMs
  const ended = spotify?.timestamps?.end || nowMs + 182000
  const progress = Math.min(100, Math.max(0, ((nowMs - started) / (ended - started)) * 100))

  return (
    <section className={`spotify-card ${isListening ? '' : 'inactive'}`} ref={tiltRef}>
      <Disc3 className="spotify-bg-icon" />
      <div className="section-title-row">
        <h2>What i'm playing now.</h2>
        <div className="icon-actions">
          <a
            href={spotify?.track_id ? `https://open.spotify.com/track/${spotify.track_id}` : 'https://open.spotify.com'}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in Spotify"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
      <div className="spotify-body">
        <img
          className="album-art"
          src={spotify?.album_art_url || heroImage}
          alt="Album art"
          draggable="false"
        />
        <div className="spotify-info">
          <strong>{spotify?.song || 'Not Listening'}</strong>
          <span>{spotify?.artist || 'No song currently playing.'}</span>
          <small>{spotify?.album || 'dead air.'}</small>
          <div className="progress-row">
            <span>{isListening ? formatMs(nowMs - started) : '0:00'}</span>
            <div className="progress-bar">
              <i style={{ width: `${isListening ? progress : 0}%` }} />
            </div>
            <span>{isListening ? `-${formatMs(ended - nowMs)}` : '0:00'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecsModal({ onClose }) {
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, 210)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closing])

  return (
    <div
      className={`specs-overlay${closing ? ' specs-overlay--out' : ''}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className={`specs-modal${closing ? ' specs-modal--out' : ''}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="specs-modal-header">
          <h2>My Setup</h2>
        </div>
        <div className="specs-sections">
          {SPEC_SECTIONS.map((section) => (
            <div key={section.label} className="specs-section">
              <div className="specs-section-label">{section.label}</div>
              <div className="specs-grid">
                {section.items.map((spec) => {
                  const Icon = spec.icon
                  return (
                    <a
                      key={spec.category + spec.name}
                      href={spec.href}
                      target="_blank"
                      rel="noreferrer"
                      className="spec-item"
                    >
                      <span className="spec-icon-box">
                        <Icon size={20} />
                      </span>
                      <span className="spec-info">
                        <span className="spec-category">{spec.category}</span>
                        <span className="spec-name">{spec.name}</span>
                      </span>
                      <ExternalLink size={12} className="spec-link-icon" />
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AboutCard({ onOpenSpecs, aboutBio }) {
  const tiltRef = useTilt()
  const hasText = aboutBio && aboutBio.replace(/<[^>]*>/g, '').trim().length > 0
  const bioHtml = hasText ? aboutBio : DEFAULT_BIO
  return (
    <section className="section-card about-card" ref={tiltRef}>
      <div className="section-title-row">
        <h2>About Me</h2>
        <div className="social-badges">
          {socials.map(({ label, href, icon: Icon, cls }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={`profile-badge ${cls}`}>
              <Icon size={12} />
              <span className="badge-label">{label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="about-copy">
        <div className="about-bio-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bioHtml, { ALLOWED_TAGS: ['h2','h3','p','span','b','i','u','s','strong','em','ul','ol','li','blockquote','br','div'], ALLOWED_ATTR: ['class','style'] }) }} />
        <div>
          <button className="specs-btn" onClick={onOpenSpecs}>
            My Setup
          </button>
        </div>
      </div>
    </section>
  )
}

function SongsCard({ onSelectTrack }) {
  const tiltRef = useTilt()
  const [query, setQuery] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [statsSongs, setStatsSongs] = useState([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    setStatsLoading(true)
    setStatsError(false)
    setStatsSongs([])

    fetch('/api/lastfm?mode=recent', { cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error('Last.fm request failed')
        return response.json()
      })
      .then((payload) => {
        if (cancelled) return
        if (payload.error) throw new Error(payload.error)
        const tracks = (payload.recenttracks?.track || []).slice(0, 50)
        setStatsSongs(tracks.map(normalizeLastfmRecentTrack))
      })
      .catch(() => {
        if (!cancelled) {
          setStatsError(true)
          setStatsSongs([])
        }
      })
      .finally(() => {
        if (!cancelled) setStatsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  const songs = useMemo(() => {
    const source =
      statsSongs.length > 0
        ? statsSongs
        : recentTracks.map((song, index) => ({
            ...song,
            image: heroImage,
            rank: index + 1,
            endTime: Date.now() - song.minutesAgo * 60 * 1000,
          }))
    return collapseRepeatedSongs(source).filter((song) =>
      `${song.title} ${song.artist} ${song.album}`.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query, statsSongs])

  function refresh() {
    setRefreshing(true)
    setRefreshKey((value) => value + 1)
    window.setTimeout(() => setRefreshing(false), 650)
  }

  return (
    <section className="section-card songs-card" ref={tiltRef}>
      <div className="section-title-row">
        <h2><span className="accent-word">Recent</span> Streams</h2>
        <div className="song-controls">
          <label className="search-box">
            <Search size={14} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search.." />
            {query ? (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={13} />
              </button>
            ) : null}
          </label>
          <button type="button" onClick={refresh} className={refreshing ? 'spinning' : ''} aria-label="Refresh songs">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      <div className="song-list">
        {statsLoading ? <div className="song-empty">Loading streams..</div> : null}
        {statsError && !statsLoading ? <div className="song-empty">last.fm unavailable — check LASTFM_API_KEY secret.</div> : null}
        {songs.map((song, index) => (
          <article key={`${song.title}-${song.endTime || song.rank || index}`} className="song-row">
            <div className="song-index">{pad(index + 1)}</div>
            <div className="song-art-wrap">
              <img className="song-art" src={song.image || heroImage} alt="" draggable="false" />
              <button
                type="button"
                className="song-play-button"
                onClick={() => onSelectTrack(song)}
                aria-label={`Open ${song.title}`}
              >
                <Play size={18} />
              </button>
            </div>
            <div>
              <div className="song-title-line">
                {song.spotifyId ? (
                  <a href={`https://open.spotify.com/track/${song.spotifyId}`} target="_blank" rel="noreferrer">
                    <strong>{song.title}</strong>
                  </a>
                ) : (
                  <strong>{song.title}</strong>
                )}
                {song.repeatCount > 1 ? <b className="repeat-count">x{song.repeatCount}</b> : null}
              </div>
              <span>
                {song.artist} - {song.album}
              </span>
            </div>
            <small>{formatRelativeTime(song.endTime)}</small>
            <em title={song.vibe}>
              <SpotifyGlyph size={18} />
            </em>
          </article>
        ))}
      </div>
    </section>
  )
}

function ActivitiesCard({ activities, serverStats }) {
  const tiltRef = useTilt()
  const visible = (activities || []).filter(
    (a) => a.type !== 4 && a.name !== 'Custom Status',
  )

  return (
    <section className="mini-card" ref={tiltRef}>
      <div className="mini-card-header">
        <h2>Current Activities</h2>
        {serverStats?.onlineCount != null && (
          <a
            className="server-pill"
            href="https://discord.gg/gogurt"
            target="_blank"
            rel="noreferrer"
          >
            <i className="status-dot online" aria-hidden="true" />
            {serverStats.onlineCount.toLocaleString()} online
          </a>
        )}
      </div>
      <div className="activity-list">
        {visible.slice(0, 3).map((activity) => (
          <div key={`${activity.name}-${activity.created_at || activity.id}`} className="activity-row">
            <ActivityIcon activity={activity} />
            <span>
              <strong>{activity.name}</strong>
              <small>
                {activity.details || activity.state ||
                  (activity.timestamps?.start
                    ? formatElapsed(activity.timestamps.start, Date.now())
                    : 'active now')}
              </small>
            </span>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="activity-row activity-row--empty">
            <Headphones size={18} />
            <span>
              <strong>Nothing public right now</strong>
              <small>check back later</small>
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

function MediaPlayer({ track, onClose }) {
  const [playing, setPlaying] = useState(true)
  const [volume, setVolume] = useState(67)
  const [position, setPosition] = useState(0)
  const audioRef = useRef(null)
  const analyserRef = useRef(null)
  const canvasRef = useVisualizer(playing, volume / 100, analyserRef)
  const tiltRef = useTilt(1.5)

  useEffect(() => {
    setPosition(0)
    setPlaying(Boolean(track?.previewUrl))
  }, [track])

  useEffect(() => {
    if (track?.previewUrl && audioRef.current) {
      analyserRef.current = connectAnalyser(audioRef.current)
    }
  }, [track])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.previewUrl) return
    audio.volume = (volume / 100) ** 2
  }, [volume, track])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !track?.previewUrl) return undefined

    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }

    return undefined
  }, [playing, track])

  useEffect(() => {
    if (!playing || track?.previewUrl) return undefined
    const id = window.setInterval(() => {
      setPosition((value) => (value >= 30 ? 0 : value + 0.5))
    }, 500)
    return () => window.clearInterval(id)
  }, [playing, track])

  if (!track) return null

  return (
    <aside className="media-player" ref={tiltRef}>
      <canvas ref={canvasRef} />
      {track.previewUrl ? (
        <audio
          ref={audioRef}
          src={track.previewUrl}
          crossOrigin="anonymous"
          onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
          onEnded={() => setPlaying(false)}
        />
      ) : null}
      <img src={track.image || heroImage} alt="Album art" draggable="false" />
      <div className="media-copy">
        <strong>{track.title}</strong>
        <span>{track.artist}</span>
      </div>
      <button type="button" className="round-btn" onClick={() => setPlaying(!playing)} aria-label="Play or pause">
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <div className="media-controls">
        <label>
          <Volume2 size={16} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <span>{volume}%</span>
        </label>
        <label>
          <span>{formatMs(position * 1000)}</span>
          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={position}
            onChange={(event) => {
              const nextPosition = Number(event.target.value)
              setPosition(nextPosition)
              if (audioRef.current) audioRef.current.currentTime = nextPosition
            }}
          />
          <span>0:30</span>
        </label>
      </div>
      <button type="button" className="close-player" onClick={onClose} aria-label="Close player">
        <X size={18} />
      </button>
    </aside>
  )
}

function useRecentGames() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/api/steam-games')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) {
          setGames(data?.games || [])
          setLoading(false)
        }
      })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { games, loading }
}

function GameImage({ headerUrl, appid, iconUrl, name }) {
  const [idx, setIdx] = useState(0)

  const urls = [
    headerUrl,
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
    `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`,
    `https://steamcdn-a.akamaihd.net/steam/apps/${appid}/header.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`,
    iconUrl,
  ].filter(Boolean)

  if (idx >= urls.length) return <div className="game-img-missing" />

  return (
    <img
      key={urls[idx]}
      src={urls[idx]}
      alt={name}
      draggable="false"
      onError={() => setIdx((i) => i + 1)}
    />
  )
}

function GamesCard() {
  const tiltRef = useTilt()
  const { games, loading } = useRecentGames()
  const displayGames = useMemo(() => {
    const cols = 4
    const snapped = Math.floor(games.length / cols) * cols
    return games.slice(0, snapped || games.length)
  }, [games])

  return (
    <section className="section-card games-card" ref={tiltRef}>
      <div className="section-title-row">
        <h2>Recently Played</h2>
        <div className="icon-actions">
          <a
            href="https://steamcommunity.com/id/bigbootygurl"
            target="_blank"
            rel="noreferrer"
            aria-label="Steam profile"
          >
            <SteamIcon size={16} />
          </a>
        </div>
      </div>
      <div className="games-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="game-tile game-tile--skeleton" />
            ))
          : displayGames.length === 0
            ? <div className="song-empty">No recently played games.</div>
            : displayGames.map((game) => (
                <a
                  key={game.appid}
                  className="game-tile"
                  href={`https://store.steampowered.com/app/${game.appid}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GameImage headerUrl={game.headerUrl} appid={game.appid} iconUrl={game.iconUrl} name={game.name} />
                  <div className="game-overlay">
                    <strong>{game.name}</strong>
                    <span>{game.hoursTotal.toLocaleString()} hrs total</span>
                    {game.hoursRecent != null && (
                      <small>{game.hoursRecent} hrs past 2 weeks</small>
                    )}
                  </div>
                </a>
              ))}
      </div>
    </section>
  )
}

function HardwareWarning() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setVisible(!gl)
  }, [])

  if (!visible) return null

  return (
    <aside className="hardware-warning">
      <AlertTriangle size={22} />
      <div>
        <strong>Hardware Acceleration is disabled</strong>
        <span>This may cause performance issues</span>
      </div>
      <button type="button" onClick={() => setVisible(false)} aria-label="Close warning">
        <X size={18} />
      </button>
    </aside>
  )
}

const NAME_STYLES = [
  { id: 'neon',   label: 'Neon'   },
  { id: 'holo',   label: 'Holo'   },
  { id: 'glitch', label: 'Glitch' },
  { id: 'chrome', label: 'Chrome' },
  { id: 'blood',  label: 'Blood'  },
  { id: 'void',   label: 'Void'   },
  { id: 'melt',   label: 'Melt'   },
  { id: 'fire',   label: 'Fire'   },
  { id: 'ice',    label: 'Ice'    },
  { id: 'plasma', label: 'Plasma' },
  { id: 'gold',   label: 'Gold'   },
  { id: 'matrix', label: 'Matrix' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'toxic',  label: 'Toxic'  },
]

const DEFAULT_BIO = `<div><h3>Who am I?</h3><p>i'm <b>J4ke</b>, a gamer and music addict from the midwest.</p></div><div><h3>My Interests</h3><p>gaming, listening to music on repeat, and hanging in discord.</p></div>`

function navigate(href) {
  window.location.href = href
}

const RTE_TOOLS = [
  { cmd: 'bold',               label: 'B',    title: 'Bold',           style: { fontWeight: 700 } },
  { cmd: 'italic',             label: 'I',    title: 'Italic',         style: { fontStyle: 'italic' } },
  { cmd: 'underline',          label: 'U',    title: 'Underline',      style: { textDecoration: 'underline' } },
  { cmd: 'strikeThrough',      label: 'S',    title: 'Strikethrough',  style: { textDecoration: 'line-through' } },
  'sep',
  { cmd: 'justifyLeft',        label: '⇐',   title: 'Align left'   },
  { cmd: 'justifyCenter',      label: '≡',   title: 'Center'       },
  { cmd: 'justifyRight',       label: '⇒',   title: 'Align right'  },
  'sep',
  { cmd: 'formatBlock', arg: 'h2',         label: 'H2', title: 'Heading'   },
  { cmd: 'formatBlock', arg: 'h3',         label: 'H3', title: 'Subheading'},
  { cmd: 'formatBlock', arg: 'p',          label: '¶',  title: 'Paragraph' },
  { cmd: 'formatBlock', arg: 'blockquote', label: '"',  title: 'Quote'     },
  'sep',
  { cmd: 'insertUnorderedList', label: '•—', title: 'Bullet list'   },
  { cmd: 'insertOrderedList',   label: '1—', title: 'Numbered list' },
  'sep',
  { cmd: 'removeFormat', label: '✕', title: 'Clear formatting' },
]

const RTE_EFFECTS = [
  { cls: 'rainbow-text',        label: '🌈', title: 'Rainbow'                    },
  { cls: 'name-style-neon',     label: '⚡', title: 'Neon'                      },
  { cls: 'name-style-holo',     label: '✦',  title: 'Holo',   size: '18px'      },
  { cls: 'name-style-glitch',   label: '▓',  title: 'Glitch', size: '10px'      },
  { cls: 'name-style-fire',     label: '🔥', title: 'Fire'                      },
  { cls: 'name-style-ice',      label: '❄',  title: 'Ice',    size: '18px'      },
  { cls: 'name-style-chrome',   label: '◈',  title: 'Chrome', size: '18px'      },
  { cls: 'name-style-aurora',   label: '◉',  title: 'Aurora', size: '18px'      },
]

function resizeImageFile(file, maxW, maxH) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let w = img.naturalWidth, h = img.naturalHeight
      const ratio = Math.min(maxW / w, maxH / h, 1)
      w = Math.round(w * ratio)
      h = Math.round(h * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = url
  })
}

function ImageUploadField({ label, value, onChange, maxW = 800, maxH = 400 }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const isDataUrl = value?.startsWith('data:')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try { onChange(await resizeImageFile(file, maxW, maxH)) } catch {}
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div className="admin-field">
      {label && <span>{label}</span>}
      {isDataUrl && <img className="img-upload-thumb" src={value} alt="" />}
      <div className="img-upload-row">
        {isDataUrl
          ? <span className="img-upload-info">uploaded image</span>
          : <input className="admin-input" type="url" placeholder="https://…" value={value || ''} onChange={e => onChange(e.target.value)} />
        }
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        <button type="button" className="admin-btn admin-btn--sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? '…' : '↑ upload'}
        </button>
        {value && <button type="button" className="admin-clear-btn" onClick={() => onChange('')} title="Clear">✕</button>}
      </div>
    </div>
  )
}

function RichBioEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const skipSync = useRef(false)

  useEffect(() => {
    const el = editorRef.current
    if (!el || skipSync.current) return
    if (el.innerHTML !== (value || '')) el.innerHTML = value || ''
  }, [value])

  function exec(cmd, arg = null) {
    editorRef.current?.focus()
    document.execCommand(cmd, false, arg)
    skipSync.current = true
    onChange(editorRef.current.innerHTML)
    setTimeout(() => { skipSync.current = false }, 0)
  }

  function applyEffect(cls) {
    editorRef.current?.focus()
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return
    const range = sel.getRangeAt(0)

    let existingSpan = null
    let node = range.commonAncestorContainer
    if (node.nodeType === Node.TEXT_NODE) node = node.parentElement
    let cursor = node
    while (cursor && cursor !== editorRef.current) {
      if (cursor.tagName === 'SPAN' && cursor.classList.contains(cls)) {
        existingSpan = cursor; break
      }
      cursor = cursor.parentElement
    }

    if (existingSpan) {
      const unwrapRange = document.createRange()
      unwrapRange.selectNode(existingSpan)
      sel.removeAllRanges()
      sel.addRange(unwrapRange)
      document.execCommand('insertHTML', false, existingSpan.innerHTML)
    } else {
      const tmp = document.createElement('div')
      tmp.appendChild(range.cloneContents())
      document.execCommand('insertHTML', false, `<span class="${cls}">${tmp.innerHTML}</span>`)
    }

    skipSync.current = true
    onChange(editorRef.current.innerHTML)
    setTimeout(() => { skipSync.current = false }, 0)
  }

  function onInput() {
    skipSync.current = true
    onChange(editorRef.current.innerHTML)
    setTimeout(() => { skipSync.current = false }, 0)
  }

  return (
    <div className="rte-wrap">
      <div className="rte-toolbar">
        {RTE_TOOLS.map((tool, i) => {
          if (tool === 'sep') return <div key={i} className="rte-sep" />
          return (
            <button
              key={tool.cmd + (tool.arg || '')}
              type="button"
              title={tool.title}
              style={tool.style}
              onMouseDown={e => { e.preventDefault(); exec(tool.cmd, tool.arg || null) }}
            >
              {tool.label}
            </button>
          )
        })}
      </div>
      <div className="rte-toolbar rte-toolbar--effects">
        <span className="rte-effects-label">fx</span>
        {RTE_EFFECTS.map(fx => (
          <button
            key={fx.cls}
            type="button"
            title={fx.title}
            className="rte-effect-btn"
            style={fx.size ? { fontSize: fx.size } : undefined}
            onMouseDown={e => { e.preventDefault(); applyEffect(fx.cls) }}
          >
            {fx.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className="rte-body"
        contentEditable
        onInput={onInput}
        suppressContentEditableWarning
        data-placeholder="say something…"
      />
    </div>
  )
}

function useSiteContent() {
  const [content, setContent] = useState({})
  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.ok ? r.json() : {})
      .then(setContent)
      .catch(() => {})
  }, [])
  return content
}

function AdminNav({ active }) {
  return (
    <div className="admin-nav">
      <span className="admin-nav-label">admin</span>
      <button
        className={`admin-nav-tab${active === 'editor' ? ' active' : ''}`}
        onClick={() => navigate('/admin')}
      >editor</button>
      <button
        className={`admin-nav-tab${active === 'uploads' ? ' active' : ''}`}
        onClick={() => navigate('/admin/uploads')}
      >uploads</button>
    </div>
  )
}

function AdminUploadsPanel() {
  const [verified, setVerified] = useState(false)
  const [files, setFiles] = useState([])
  const [uploadDesc, setUploadDesc] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const uploadInputRef = useRef(null)
  const { profile: discordProfile } = useDiscordPresence()
  useAccentColor(discordProfile?.spotify?.album_art_url)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { navigate('/admin'); return }
    fetch('/api/admin/content', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        if (!r.ok) { localStorage.removeItem('admin_token'); navigate('/admin') }
        else setVerified(true)
      })
      .catch(() => navigate('/admin'))
  }, [])

  useEffect(() => {
    if (!verified) return
    fetch('/api/files').then(r => r.json()).then(setFiles).catch(() => {})
  }, [verified])

  async function handleUploadFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const token = localStorage.getItem('admin_token')
    setUploading(true); setUploadError('')
    const desc = uploadDesc
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : ''
      try {
        const res = await fetch('/api/admin/files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: file.name, ext, description: desc, data: ev.target.result, size: file.size }),
        })
        if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || `Upload failed (${res.status})`) }
        const { id } = await res.json()
        setFiles(prev => [{ id, name: file.name, ext, description: desc, size: file.size, created_at: Date.now() }, ...prev])
        setUploadDesc('')
      } catch (err) { setUploadError(err.message || 'Upload failed') }
      setUploading(false); e.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  async function deleteUpload(id) {
    const token = localStorage.getItem('admin_token')
    await fetch(`/api/admin/files?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  function logout() {
    const token = localStorage.getItem('admin_token')
    fetch('/api/admin/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => {})
    localStorage.removeItem('admin_token')
    navigate('/admin')
  }

  if (!verified) {
    return (
      <div className="admin-shell">
        <div className="top-rainbow-bar" aria-hidden="true" />
        <div className="page-backdrop" />
        <p className="admin-checking">checking session…</p>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <div className="top-rainbow-bar" aria-hidden="true" />
      <div className="page-backdrop" />
      <AdminNav active="uploads" />
      <div className="admin-panel admin-panel--wide">
        <div className="admin-panel-header">
          <h2 className="admin-panel-title"><button onClick={() => navigate('/')} className="admin-site-link">site</button> uploads</h2>
          <button type="button" className="admin-back" onClick={logout}>logout</button>
        </div>

        <div className="admin-fields">
          {files.length > 0 && (
            <div className="admin-upload-list">
              {files.map(f => (
                <div key={f.id} className="admin-upload-item">
                  <span className="aui-icon">{fileIcon(f.ext)}</span>
                  <div className="aui-meta">
                    <span className="aui-name">{f.name}</span>
                    <span className="aui-detail">{formatBytes(f.size)} · {formatUploadDate(f.created_at)}</span>
                    {f.description ? <span className="aui-desc">{f.description}</span> : null}
                  </div>
                  <button type="button" className="admin-clear-btn" onClick={() => deleteUpload(f.id)} title="Remove">✕</button>
                </div>
              ))}
            </div>
          )}
          {files.length === 0 && <p className="admin-hint">no uploads yet</p>}

          {uploadError && <p className="admin-upload-error">{uploadError}</p>}
          <div className="admin-upload-row">
            <input
              className="admin-input"
              type="text"
              placeholder="description (optional)"
              value={uploadDesc}
              onChange={e => setUploadDesc(e.target.value)}
            />
            <input ref={uploadInputRef} type="file" style={{ display: 'none' }} onChange={handleUploadFile} />
            <button type="button" className="admin-btn admin-btn--sm" onClick={() => uploadInputRef.current?.click()} disabled={uploading}>
              {uploading ? '…' : '↑ upload file'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminPanel() {
  const [step, setStep] = useState(() => localStorage.getItem('admin_token') ? 'check' : 'email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [otpToken, setOtpToken] = useState('')
  const [remember, setRemember] = useState(true)
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '')
  const [content, setContent] = useState({
    custom_status: '', location: '', about_bio: '',
    custom_name: '', custom_handle: '', ascii_comment: '', name_style: 'melt',
    custom_avatar_url: '', custom_banner_url: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const { profile: discordProfile } = useDiscordPresence()
  const spotify = discordProfile?.spotify
  useAccentColor(spotify?.album_art_url)

  useEffect(() => {
    if (step !== 'check' || !token) return
    fetch('/api/admin/content', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) { setContent(c => ({ ...c, ...data })); setStep('panel') }
        else { localStorage.removeItem('admin_token'); setToken(''); setStep('email') }
      })
      .catch(() => setStep('email'))
  }, [step, token])

  async function requestOtp(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.otpToken) setOtpToken(data.otpToken)
      setStep('otp')
    } catch { setError('Request failed.') }
    setLoading(false)
  }

  async function verifyOtp(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, otpToken, remember }),
      })
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('admin_token', data.token)
        setToken(data.token)
        const c = await fetch('/api/admin/content').then(r => r.json()).catch(() => ({}))
        setContent(c)
        setStep('panel')
      } else {
        setError(data.error || 'Invalid code.')
      }
    } catch { setError('Request failed.') }
    setLoading(false)
  }

  async function save(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(content),
      })
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500) }
      else if (res.status === 401) { localStorage.removeItem('admin_token'); setStep('email') }
    } catch {}
    setLoading(false)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => {})
    localStorage.removeItem('admin_token')
    setToken(''); setStep('email')
  }

  if (step === 'check') {
    return (
      <div className="admin-shell">
        <div className="top-rainbow-bar" aria-hidden="true" />
        <div className="page-backdrop" />
        <p className="admin-checking">checking session…</p>
      </div>
    )
  }

  if (step === 'email') {
    return (
      <div className="admin-shell">
        <div className="top-rainbow-bar" aria-hidden="true" />
        <div className="page-backdrop" />
        <form className="admin-form" onSubmit={requestOtp}>
          <h1 className="admin-title">_</h1>
          <input
            className="admin-input"
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-btn" type="submit" disabled={loading}>
            {loading ? '…' : 'continue'}
          </button>
        </form>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <div className="admin-shell">
        <div className="top-rainbow-bar" aria-hidden="true" />
        <div className="page-backdrop" />
        <form className="admin-form" onSubmit={verifyOtp}>
          <h1 className="admin-title">_</h1>
          <p className="admin-hint">check your email for a 6-digit code</p>
          <input
            className="admin-input admin-input--code"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            maxLength={6}
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
            required
            autoComplete="one-time-code"
          />
          {error && <p className="admin-error">{error}</p>}
          <label className="admin-remember">
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
            keep me logged in for 30 days
          </label>
          <button className="admin-btn" type="submit" disabled={loading}>
            {loading ? '…' : 'verify'}
          </button>
          <button className="admin-back" type="button" onClick={() => { setStep('email'); setCode(''); setError('') }}>
            ← back
          </button>
        </form>
      </div>
    )
  }

  const namePreview = content.custom_name || 'j4ke'

  return (
    <div className="admin-shell">
      <div className="top-rainbow-bar" aria-hidden="true" />
      <div className="page-backdrop" />
      <AdminNav active="editor" />
      <form className="admin-panel admin-panel--wide" onSubmit={save}>
        <div className="admin-panel-header">
          <h2 className="admin-panel-title"><button onClick={() => navigate('/')} className="admin-site-link">site</button> editor</h2>
          <button type="button" className="admin-back" onClick={logout}>logout</button>
        </div>

        {spotify && spotify.song && (
          <div className="songs-nowplaying">
            <img className="snp-art" src={spotify.album_art_url} alt="" draggable="false" />
            <div className="snp-info">
              <span className="snp-label">now playing</span>
              <span className="snp-title">{spotify.song}</span>
              <span className="snp-artist">{spotify.artist}</span>
            </div>
            <div className="snp-bar">
              <div
                className="snp-bar-fill"
                style={{ width: `${spotify.timestamps?.end ? Math.min(100, Math.max(0, (Date.now() - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start) * 100)) : 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="admin-fields">
          <p className="admin-section-label">profile</p>

          <label className="admin-field">
            <span>name text</span>
            <input
              className="admin-input"
              type="text"
              placeholder="j4ke"
              value={content.custom_name || ''}
              onChange={e => setContent(c => ({ ...c, custom_name: e.target.value }))}
            />
          </label>

          <div className="admin-field">
            <span>name style</span>
            <div className="style-picker">
              {NAME_STYLES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  className={`style-picker-btn${(content.name_style || 'melt') === s.id ? ' active' : ''}`}
                  onClick={() => setContent(c => ({ ...c, name_style: s.id }))}
                >
                  <span className={`style-picker-preview name-style-${s.id}`}>{namePreview}</span>
                  <span className="style-picker-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="admin-field">
            <span>handle (@…)</span>
            <input
              className="admin-input"
              type="text"
              placeholder="ihymich"
              value={content.custom_handle || ''}
              onChange={e => setContent(c => ({ ...c, custom_handle: e.target.value }))}
            />
          </label>

          <label className="admin-field">
            <span>top-right tag</span>
            <input
              className="admin-input"
              type="text"
              placeholder="@ihymich"
              value={content.ascii_comment || ''}
              onChange={e => setContent(c => ({ ...c, ascii_comment: e.target.value }))}
            />
          </label>

          <ImageUploadField
            label="avatar (blank = discord)"
            value={content.custom_avatar_url || ''}
            onChange={val => setContent(c => ({ ...c, custom_avatar_url: val }))}
            maxW={256} maxH={256}
          />

          <ImageUploadField
            label="banner (blank = discord)"
            value={content.custom_banner_url || ''}
            onChange={val => setContent(c => ({ ...c, custom_banner_url: val }))}
            maxW={900} maxH={360}
          />

          <p className="admin-section-label">status</p>

          <label className="admin-field">
            <span>custom status</span>
            <input
              className="admin-input"
              type="text"
              placeholder=".gg/gogurt"
              value={content.custom_status || ''}
              onChange={e => setContent(c => ({ ...c, custom_status: e.target.value }))}
            />
          </label>

          <label className="admin-field">
            <span>location</span>
            <input
              className="admin-input"
              type="text"
              placeholder="KC, MO"
              value={content.location || ''}
              onChange={e => setContent(c => ({ ...c, location: e.target.value }))}
            />
          </label>

          <p className="admin-section-label">bio</p>

          <div className="admin-field">
            <span>about bio</span>
            <RichBioEditor
              value={(content.about_bio && content.about_bio.replace(/<[^>]*>/g, '').trim().length > 0) ? content.about_bio : DEFAULT_BIO}
              onChange={val => setContent(c => ({ ...c, about_bio: val }))}
            />
          </div>

        </div>

        {error && <p className="admin-error">{error}</p>}
        <button className="admin-btn" type="submit" disabled={loading}>
          {saved ? 'saved ✓' : loading ? '…' : 'save changes'}
        </button>
      </form>
    </div>
  )
}

export default function App() {
  if (window.location.pathname === '/admin') return <AdminPanel />
  if (window.location.pathname === '/admin/uploads') return <AdminUploadsPanel />
  if (window.location.pathname === '/uploads') return <UploadsPage />
  const now = useClock()
  const { profile, loading } = useDiscordPresence()
  const serverStats = useServerStats()
  const siteContent = useSiteContent()
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [specsOpen, setSpecsOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(true)
  const scrollPrev = useRef(0)
  useAccentColor(selectedTrack?.image || profile.spotify?.album_art_url)

  useEffect(() => {
    if (!window.matchMedia('(max-width: 620px)').matches) return
    const onScroll = () => {
      const y = window.scrollY
      if (y > scrollPrev.current + 5 && y > 40) setNavOpen(false)
      else if (y < 30) setNavOpen(true)
      scrollPrev.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const location = siteContent.location || 'KC, MO'
  const customStatusFallback = siteContent.custom_status || fallbackProfile.customStatus
  const mergedProfile = {
    ...profile,
    customStatus: profile.customStatus || customStatusFallback,
    avatarUrl: siteContent.custom_avatar_url || profile.avatarUrl,
    bannerUrl: siteContent.custom_banner_url || profile.bannerUrl,
  }

  return (
    <main className="bio-shell">
      <div className={`top-rainbow-bar${(profile.spotify || selectedTrack) ? ' top-rainbow-bar--playing' : ''}`} aria-hidden="true" />
      <div className={`ascii-comment${navOpen ? '' : ' ascii-comment--closed'}`}>
        <span aria-hidden="true">{siteContent.ascii_comment || '@ihymich'}</span>
        <button onClick={e => { e.preventDefault(); navigate('/uploads') }} className="uploads-top-link">uploads</button>
        <button onClick={e => { e.preventDefault(); navigate('/admin') }} className="uploads-top-link">login</button>
        <button
          className="ascii-comment-close"
          onClick={() => setNavOpen(false)}
          aria-label="Close navigation"
        >
          <X size={11} />
        </button>
      </div>
      <div className="page-backdrop" />
      <section className="bio-container">
        <div className="top-grid">
          <ProfileCard
            profile={mergedProfile}
            loading={loading}
            now={now}
            location={location}
            nameStyle={siteContent.name_style || 'melt'}
            customName={siteContent.custom_name}
            customHandle={siteContent.custom_handle}
          />
          <div className="side-stack">
            <SpotifyCard spotify={profile.spotify} now={now} />
            <ActivitiesCard activities={profile.activities} serverStats={serverStats} />
          </div>
        </div>
        <div className="bottom-grid">
          <AboutCard onOpenSpecs={() => setSpecsOpen(true)} aboutBio={siteContent.about_bio} />
          <SongsCard onSelectTrack={setSelectedTrack} />
        </div>
        <GamesCard />
      </section>
      <MediaPlayer track={selectedTrack} onClose={() => setSelectedTrack(null)} />
      {specsOpen && <SpecsModal onClose={() => setSpecsOpen(false)} />}
      <HardwareWarning />
      <span className="dev-tag">made by landan</span>
    </main>
  )
}
