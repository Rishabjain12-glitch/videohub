import React, { useState, useEffect } from 'react';
import { Heart, Plus, Clock, Home, Zap, Users, Search, Moon, Sun, Menu, X, Film, Music, Gamepad2, Newspaper, TrendingUp, CheckCircle, Star, Play } from 'lucide-react';

// Custom CSS styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
  }

  .app-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grain)"/></svg>') repeat;
    pointer-events: none;
    z-index: 1;
  }

  .dark .app-container {
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(60px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .dark .navbar {
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .menu-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 1.5rem;
    font-weight: 800;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  }

  .search-container {
    flex: 1;
    max-width: 500px;
    margin: 0 2rem;
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    font-size: 1rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .search-input:focus {
    outline: none;
    background: ra(255, 255, 255, 0.2);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.7);
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 12px;
    transition: all 0.25s ease;
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .watch-later-badge {
    background: rgba(255, 255, 255, 0.15);
    color: red;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    backdrop-filter: blur(10px);
  }

  .timer {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.5rem;
  }

  .sidebar {
    position: fixed;
    top: 80px;
    left: 0;
    width: 280px;
    height: calc(100vh - 80px);
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 500;
    overflow-y: auto;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-section {
    margin-bottom: 2rem;
  }

  .sidebar-title {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding: 0 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    font-size: 1rem;
  }

  .sidebar-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(5px);
  }

  .sidebar-item.active {
    background: linear-gradient(90deg, rgba(255, 107, 107, 0.3), rgba(255, 107, 107, 0.1));
    color: #ff6b6b;
    border-right: 3px solid #ff6b6b;
  }

  .main-content {
    margin-left: 0;
    padding-top: 80px;
    min-height: 100vh;
    position: relative;
    z-index: 2;
    transition: margin-left 0.3s ease;
  }

  .main-content.sidebar-open {
    margin-left: 280px;
  }

  .filter-bar {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .filter-buttons {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .filter-buttons::-webkit-scrollbar {
    display: none;
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    font-weight: 500;
  }

  .filter-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .filter-btn.active {
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }

  .content-area {
    padding: 2rem;
  }

  .page-title {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .video-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
  }

  .video-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  .video-thumbnail {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .video-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .video-card:hover .video-thumbnail img {
    transform: scale(1.1);
  }

  .video-duration {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .video-card:hover .play-overlay {
    opacity: 1;
  }

  .video-info {
    padding: 1.5rem;
  }

  .video-title {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .video-meta {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .video-channel {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  .video-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .action-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  .action-btn.liked {
    background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }

  .action-btn.watch-later {
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.4);
  }

  .action-btn.remove {
    background: linear-gradient(45deg, #ff4757, #ff6b7a);
    box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .empty-state-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    opacity: 0.5;
  }

  .feedback {
    position: fixed;
    top: 100px;
    right: 2rem;
    background: linear-gradient(45deg, #00d4aa, #01a085);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 212, 170, 0.3);
    z-index: 1001;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .footer {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
    margin-top: 4rem;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-links {
    display: flex;
    gap: 2rem;
  }

  .footer-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: white;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 400;
    backdrop-filter: blur(5px);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .navbar {
      padding: 0 1rem;
    }

    .search-container {
      display: none;
    }

    .main-content.sidebar-open {
      margin-left: 0;
    }

    .sidebar {
      width: 100%;
      background: rgba(0, 0, 0, 0.95);
    }

    .content-area {
      padding: 1rem;
    }

    .video-grid {
      grid-template-columns: 1fr;
    }

    .page-title {
      font-size: 2rem;
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Dummy video data with more creative content
const dummyVideos = [
  {
    id: 1,
    title: "Midnight Coding Session - Building the Future",
    channel: "DevNinja",
    views: "1.2M",
    timePosted: "2 days ago",
    thumbnail: "https://picsum.photos/320/180?random=1",
    category: "Education",
    duration: "15:42"
  },
  {
    id: 2,
    title: "Neon Dreams - Cyberpunk Gaming Montage",
    channel: "GameVerse",
    views: "890K",
    timePosted: "1 week ago",
    thumbnail: "https://picsum.photos/320/180?random=2",
    category: "Gaming",
    duration: "8:30"
  },
  {
    id: 3,
    title: "Ambient Synthwave - Work & Focus",
    channel: "ElectroBeats",
    views: "2.1M",
    timePosted: "3 days ago",
    thumbnail: "https://picsum.photos/320/180?random=3",
    category: "Music",
    duration: "1:23:15"
  },
  {
    id: 4,
    title: "AI Revolution: What's Next?",
    channel: "TechVision",
    views: "567K",
    timePosted: "5 hours ago",
    thumbnail: "https://picsum.photos/320/180?random=4",
    category: "News",
    duration: "12:08"
  },
  {
    id: 5,
    title: "Modern JavaScript Wizardry",
    channel: "CodeCraft",
    views: "445K",
    timePosted: "4 days ago",
    thumbnail: "https://picsum.photos/320/180?random=5",
    category: "Education",
    duration: "22:45"
  },
  {
    id: 6,
    title: "Viral Dance Moves 2024",
    channel: "MoveIt",
    views: "3.2M",
    timePosted: "1 day ago",
    thumbnail: "https://picsum.photos/320/180?random=6",
    category: "Entertainment",
    duration: "3:20"
  },
  {
    id: 7,
    title: "Quantum Physics Made Simple",
    channel: "ScienceMind",
    views: "789K",
    timePosted: "6 days ago",
    thumbnail: "https://picsum.photos/320/180?random=7",
    category: "Education",
    duration: "18:55"
  },
  {
    id: 8,
    title: "Hidden Gems Around the World",
    channel: "WanderLust",
    views: "1.5M",
    timePosted: "2 weeks ago",
    thumbnail: "https://picsum.photos/320/180?random=8",
    category: "Travel",
    duration: "25:12"
  }
];

// Timer Component
const Timer = () => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="timer">
      Time: {formatTime(timeSpent)}
    </div>
  );
};

// Feedback Component
const Feedback = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="feedback">
      <CheckCircle size={16} />
      <span>{message}</span>
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video, onLike, onWatchLater, onRemoveFromWatchLater, isLiked, isInWatchLater, isWatchLaterPage, showFeedback }) => {
  const handleLike = () => {
    onLike(video.id);
    showFeedback(isLiked ? "Removed from likes 💔" : "Added to likes ❤️");
  };

  const handleWatchLater = () => {
    if (isWatchLaterPage) {
      onRemoveFromWatchLater(video.id);
      showFeedback("Removed from Watch Later 🗑️");
    } else {
      onWatchLater(video.id);
      showFeedback(isInWatchLater ? "Removed from Watch Later 🗑️" : "Added to Watch Later ⏰");
    }
  };

  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt={video.title} />
        <div className="video-duration">{video.duration}</div>
        <div className="play-overlay">
          <Play size={24} color="white" />
        </div>
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        
        <div className="video-meta">
          <div className="video-channel">{video.channel}</div>
          <div>{video.views} views • {video.timePosted}</div>
        </div>
        
        <div className="video-actions">
          <button
            onClick={handleLike}
            className={`action-btn ${isLiked ? 'liked' : ''}`}
          >
            <Heart size={16} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          
          <button
            onClick={handleWatchLater}
            className={`action-btn ${isInWatchLater && !isWatchLaterPage ? 'watch-later' : ''} ${isWatchLaterPage ? 'remove' : ''}`}
          >
            {isWatchLaterPage ? <X size={16} /> : <Clock size={16} />}
            <span>{isWatchLaterPage ? 'Remove' : 'Watch Later'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [watchLaterVideos, setWatchLaterVideos] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState({ message: '', isVisible: false });

  const showFeedback = (message) => {
    setFeedback({ message, isVisible: true });
  };

  const hideFeedback = () => {
    setFeedback({ message: '', isVisible: false });
  };

  const toggleLike = (videoId) => {
    setLikedVideos(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(videoId)) {
        newLikes.delete(videoId);
      } else {
        newLikes.add(videoId);
      }
      return newLikes;
    });
  };

  const toggleWatchLater = (videoId) => {
    setWatchLaterVideos(prev => {
      const newWatchLater = new Set(prev);
      if (newWatchLater.has(videoId)) {
        newWatchLater.delete(videoId);
      } else {
        newWatchLater.add(videoId);
      }
      return newWatchLater;
    });
  };

  const removeFromWatchLater = (videoId) => {
    setWatchLaterVideos(prev => {
      const newWatchLater = new Set(prev);
      newWatchLater.delete(videoId);
      return newWatchLater;
    });
  };

  const getFilteredVideos = () => {
    let filtered = dummyVideos;

    if (searchTerm) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== 'all' && activeFilter !== 'trending') {
      filtered = filtered.filter(video => video.category === activeFilter);
    }

    if (activeFilter === 'trending') {
      filtered = [...filtered].sort((a, b) => {
        const aViews = parseFloat(a.views);
        const bViews = parseFloat(b.views);
        return bViews - aViews;
      });
    }

    return filtered;
  };

  const getWatchLaterVideos = () => {
    return dummyVideos.filter(video => watchLaterVideos.has(video.id));
  };

  const mainItems = [
    { icon: Home, label: 'Home', key: 'home' },
    { icon: Clock, label: 'Watch Later', key: 'watchLater' },
    { icon: Heart, label: 'Liked Videos', key: 'liked' },
    { icon: Users, label: 'Subscriptions', key: 'subscriptions' },
  ];

  const categories = [
    { icon: TrendingUp, label: 'Trending', key: 'trending' },
    { icon: Music, label: 'Music', key: 'Music' },
    { icon: Gamepad2, label: 'Gaming', key: 'Gaming' },
    { icon: Newspaper, label: 'News', key: 'News' },
    { icon: Film, label: 'Entertainment', key: 'Entertainment' },
  ];

  const filters = [
    { label: 'All', key: 'all' },
    { label: 'Trending', key: 'trending' },
    { label: 'Music', key: 'Music' },
    { label: 'Gaming', key: 'Gaming' },
    { label: 'News', key: 'News' },
    { label: 'Education', key: 'Education' },
    { label: 'Entertainment', key: 'Entertainment' },
  ];

  const handleItemClick = (key) => {
    if (key === 'home' || key === 'watchLater') {
      setCurrentPage(key);
      setActiveFilter('all');
    } else if (key === 'trending') {
      setCurrentPage('home');
      setActiveFilter('trending');
    } else {
      setCurrentPage('home');
      setActiveFilter(key);
    }
    setSidebarOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            
            <div className="logo">
              <div className="logo-icon">
                <Film size={24} color="white" />
              </div>
              <span>VisionHub</span>
            </div>
          </div>
          
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search for amazing content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="navbar-right">
            <button
              className="nav-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="watch-later-badge">
              <Clock size={16} />
              <span>Watch Later ({watchLaterVideos.size})</span>
            </div>
            
            <Timer />
          </div>
        </nav>

        {/* Sidebar */}
        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
        
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-section">
            <div className="sidebar-title">Main</div>
            {mainItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                className={`sidebar-item ${currentPage === item.key ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="sidebar-section">
            <div className="sidebar-title">Categories</div>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleItemClick(category.key)}
                className={`sidebar-item ${activeFilter === category.key ? 'active' : ''}`}
              >
                <category.icon size={20} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {currentPage === 'home' && (
            <div className="filter-bar">
              <div className="filter-buttons">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="content-area">
            {currentPage === 'home' && (
              <div>
                <h1 className="page-title">
                  {activeFilter === 'all' ? '✨ Discover Amazing Content' : 
                   activeFilter === 'trending' ? '🔥 Trending Now' : 
                   `🎯 ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                </h1>
                
                <div className="video-grid">
                  {getFilteredVideos().map(video => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onLike={toggleLike}
                      onWatchLater={toggleWatchLater}
                      isLiked={likedVideos.has(video.id)}
                      isInWatchLater={watchLaterVideos.has(video.id)}
                      isWatchLaterPage={false}
                      showFeedback={showFeedback}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {currentPage === 'watchLater' && (
              <div>
                <h1 className="page-title">
                  ⏰ Watch Later ({watchLaterVideos.size})
                </h1>
                
                {watchLaterVideos.size === 0 ? (
                  <div className="empty-state">
                    <Clock size={80} className="empty-state-icon" />
                    <h3>No videos saved yet</h3>
                    <p>Videos you save for later will appear here</p>
                  </div>
                ) : (
                  <div className="video-grid">
                    {getWatchLaterVideos().map(video => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onLike={toggleLike}
                        onRemoveFromWatchLater={removeFromWatchLater}
                        isLiked={likedVideos.has(video.id)}
                        isInWatchLater={watchLaterVideos.has(video.id)}
                        isWatchLaterPage={true}
                        showFeedback={showFeedback}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div>
              © 2025 VisionHub • Crafted with ❤️ by Claude
            </div>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
              <a href="#">API</a>
            </div>
          </div>
        </footer>

        {/* Feedback */}
        <Feedback
          message={feedback.message}
          isVisible={feedback.isVisible}
          onClose={hideFeedback}
        />
      </div>
    </>
  );
};

export default App;
