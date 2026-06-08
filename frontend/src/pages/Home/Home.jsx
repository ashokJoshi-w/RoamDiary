import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import TravelStoryCard from '../../components/Cards/TravelStory.jsx';
import EmptyCard from '../../components/Cards/EmptyCard.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from './AddEditTravelStory.jsx';
import ViewTravelStory from './ViewTravelStory.jsx';
import { DayPicker } from 'react-day-picker';
import FilterInfoTitle from '../../components/Cards/FilterInfoTitle.jsx';

import NoStoryImg from '../../assets/images/no-story.png';
import NoSearchImg from '../../assets/images/no-search.png';



const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [loading, setLoading] = useState(false);

  const [openAddEditModel, setOpenAddEditModel] = useState({ isShown: false, type: 'add', data: null });
  const [openViewModal, setOpenViewModal] = useState({ isShown: false, data: null });

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data?.user) setUserInfo(response.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }, [navigate]);

  const getAllTravelStories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/get-all-stories');
      if (response.data?.stories) setAllStories(response.data.stories);
    } catch (error) {
      console.log('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onSearchStory = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/search', { params: { query } });
      if (response.data?.stories) {
        setFilterType('search');
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterStoriesByDate = useCallback(async (day) => {
    if (!day?.from || !day?.to) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get('/travel-stories/filter', {
        params: { startDate: day.from.getTime(), endDate: day.to.getTime() },
      });
      if (response.data?.stories) {
        setFilterType('date');
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    if (filterType === 'search' && searchQuery) onSearchStory(searchQuery);
    else if (filterType === 'date') filterStoriesByDate(dateRange);
    else getAllTravelStories();
  }, [filterType, searchQuery, dateRange, onSearchStory, filterStoriesByDate, getAllTravelStories]);

  const handleClearSearch = useCallback(() => {
    setFilterType('');
    setSearchQuery('');
    setDateRange({ from: null, to: null });
    getAllTravelStories();
  }, [getAllTravelStories]);

  const handleAddStory = useCallback(async (storyData) => {
    try {
      const response = await axiosInstance.post('/add-travel-story', storyData);
      if (response.data && !response.data.error) {
        toast.success('Story added successfully');
        handleClearSearch();
        setOpenAddEditModel({ isShown: false, type: 'add', data: null });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }, [handleClearSearch]);

  const handleUpdateStory = useCallback(async (storyId, storyData) => {
    try {
      const response = await axiosInstance.put('/edit-travel-story/' + storyId, storyData);
      if (response.data && !response.data.error) {
        toast.success('Story updated successfully');
        refreshData();
        setOpenAddEditModel({ isShown: false, type: 'add', data: null });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  }, [refreshData]);

  const handleDeleteStory = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete('/delete-travel-story/' + data._id);
      if (response.data && !response.data.error) {
        toast.success('Story deleted successfully');
        refreshData();
        setOpenViewModal({ isShown: false, data: null });
        setOpenAddEditModel({ isShown: false, type: 'add', data: null });
      }
    } catch (error) {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
  }, [refreshData]);

  const updateIsFavourite = useCallback(async (storyData) => {
    try {
      const response = await axiosInstance.put(`/update-is-favourite/${storyData._id}`, {
        isFavourite: !storyData.isFavourite,
      });
      if (response.data) {
        toast.success('Updated!');
        refreshData();
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  }, [refreshData]);

  const handleDayClick = useCallback((day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  }, [filterStoriesByDate]);

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  const firstName = userInfo?.fullName?.split(' ')[0] || 'Traveller';

  return (
    <div className="rd-page">
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      {/* Hero Banner */}
      <div className="rd-hero">
        <div className="rd-hero-rings">
          <div className="rd-hero-ring rd-hero-ring--lg" />
          <div className="rd-hero-ring rd-hero-ring--sm" />
        </div>
        <div className="rd-hero-content">
          <div>
            <p className="rd-hero-eyebrow">Your travel journal</p>
            <h1 className="rd-hero-title">
              Every journey<br />tells a <em>story.</em>
            </h1>
            <p className="rd-hero-sub">
              Document the places, moments &amp; memories that matter.
            </p>
            <div className="rd-hero-stats">
              <div className="rd-hero-stat">
                <span className="rd-hero-stat-num">{allStories.length}</span>
                <span className="rd-hero-stat-lbl">Stories</span>
              </div>
              <div className="rd-hero-stat">
                <span className="rd-hero-stat-num">
                  {[...new Set(allStories.flatMap(s => s.visitedLocations || []))].length}
                </span>
                <span className="rd-hero-stat-lbl">Places</span>
              </div>
              <div className="rd-hero-stat">
                <span className="rd-hero-stat-num">
                  {allStories.filter(s => s.isFavourite).length}
                </span>
                <span className="rd-hero-stat-lbl">Saved</span>
              </div>
            </div>
          </div>
          <button
            className="rd-new-btn"
            onClick={() => setOpenAddEditModel({ isShown: true, type: 'add', data: null })}
          >
            <MdAdd size={18} />
            New story
          </button>
        </div>
      </div>

      {/* Main body */}
      <div className="rd-body">

        {/* Filter info */}
        {filterType && (
          <div className="rd-filter-bar">
            <FilterInfoTitle
              filterType={filterType}
              filterDates={dateRange}
              onClear={handleClearSearch}
            />
          </div>
        )}

        <div className="rd-layout">
          {/* Stories grid */}
          <div className="rd-stories-col">
            {loading ? (
              <div className="rd-loading">
                <div className="rd-spinner" />
                <p className="rd-loading-text">Loading your stories…</p>
              </div>
            ) : allStories.length > 0 ? (
              <div className="rd-grid">
                {allStories.map((item) => (
                  <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocations}
                    isFavourite={item.isFavourite}
                    onEdit={() => setOpenAddEditModel({ isShown: true, type: 'edit', data: item })}
                    onClick={() => setOpenViewModal({ isShown: true, data: item })}
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={filterType ? NoSearchImg : NoStoryImg}
                message={
                  filterType
                    ? 'No stories found for this filter.'
                    : 'Start creating your first Travel Story!'
                }
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="rd-sidebar">

            {/* Calendar */}
            <div className="rd-widget">
              <p className="rd-widget-label">Filter by date</p>
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                pagedNavigation
                className="rd-daypicker"
              />
            </div>

            {/* Quick destinations */}
            {allStories.length > 0 && (
              <div className="rd-widget">
                <p className="rd-widget-label">Destinations</p>
                {[...new Set(allStories.flatMap(s => s.visitedLocations || []))]
                  .slice(0, 5)
                  .map((place, i) => {
                    const count = allStories.filter(s =>
                      s.visitedLocations?.includes(place)
                    ).length;
                    const max = Math.max(
                      ...([...new Set(allStories.flatMap(s => s.visitedLocations || []))]
                        .map(p => allStories.filter(s => s.visitedLocations?.includes(p)).length))
                    );
                    return (
                      <div key={i} className="rd-dest-row">
                        <div className="rd-dest-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A5A9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="rd-dest-name">{place}</div>
                          <div className="rd-dest-bar-wrap">
                            <div className="rd-dest-bar" style={{ width: `${(count / max) * 100}%` }} />
                          </div>
                        </div>
                        <span className="rd-dest-count">{count} {count === 1 ? 'story' : 'stories'}</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() => !loading && setOpenAddEditModel({ isShown: false, type: 'add', data: null })}
        style={{ overlay: { backgroundColor: 'rgba(10,16,30,0.55)', zIndex: 999 } }}
        appElement={document.getElementById('root')}
        className="model-box scrollbar"
      >
        <AddEditTravelStory
          type={openAddEditModel.type}
          storyInfo={openAddEditModel.data}
          onClose={() => setOpenAddEditModel({ isShown: false, type: 'add', data: null })}
          onAddStory={handleAddStory}
          onUpdateStory={handleUpdateStory}
          onDeleteStory={handleDeleteStory}
        />
      </Modal>

      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => !loading && setOpenViewModal({ isShown: false, data: null })}
        style={{ overlay: { backgroundColor: 'rgba(10,16,30,0.55)', zIndex: 999 } }}
        appElement={document.getElementById('root')}
        className="model-box scrollbar"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => setOpenViewModal({ isShown: false, data: null })}
          onEditClick={() => {
            const d = openViewModal.data;
            setOpenViewModal({ isShown: false, data: null });
            setOpenAddEditModel({ isShown: true, type: 'edit', data: d });
          }}
          onDeleteClick={() => handleDeleteStory(openViewModal.data)}
        />
      </Modal>

      {/* FAB */}
      <button
        className="rd-fab"
        onClick={() => setOpenAddEditModel({ isShown: true, type: 'add', data: null })}
        aria-label="Add new story"
      >
        <MdAdd size={28} />
      </button>

      <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default Home;