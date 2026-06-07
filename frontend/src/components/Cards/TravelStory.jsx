import moment from 'moment';
import React from 'react';
import { FaHeart } from 'react-icons/fa6';
import { GrMapLocation } from 'react-icons/gr';

const TAG_COLORS = {
  default: { bg: '#DDEEFF', color: '#0A4A88' },
};

const TravelStoryCard = React.memo(({
  imgUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
  onEdit,
}) => {
  const locationLabel = Array.isArray(visitedLocation)
    ? visitedLocation.join(', ')
    : visitedLocation || '';

  return (
    <div className="rd-card" onClick={onClick}>
      {/* Image */}
      <div className="rd-card-img-wrap">
        <img
          src={imgUrl}
          alt={title}
          className="rd-card-img"
          loading="lazy"
        />
        {/* Dark gradient so location pin is always readable */}
        <div className="rd-card-img-overlay" />

        {/* Location pin badge */}
        {locationLabel && (
          <div className="rd-card-pin">
            <GrMapLocation size={10} />
            <span>{locationLabel}</span>
          </div>
        )}

        {/* Favourite button */}
        <button
          className={`rd-fav-btn ${isFavourite ? 'rd-fav-btn--on' : ''}`}
          onClick={(e) => { e.stopPropagation(); onFavouriteClick(); }}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <FaHeart size={13} />
        </button>
      </div>

      {/* Body */}
      <div className="rd-card-body">
        <div className="rd-card-meta-row">
          <span className="rd-card-date">
            {date ? moment(date).format('D MMM YYYY') : '—'}
          </span>
        </div>

        <h3 className="rd-card-title">{title}</h3>

        <p className="rd-card-excerpt">
          {story?.slice(0, 80)}{story?.length > 80 ? '…' : ''}
        </p>

        <div className="rd-card-footer-row">
          <span className="rd-card-photo-count">
            <GrMapLocation size={11} style={{ opacity: 0.5 }} />
            {locationLabel || 'Unknown location'}
          </span>
          {onEdit && (
            <button
              className="rd-card-edit-btn"
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default TravelStoryCard;