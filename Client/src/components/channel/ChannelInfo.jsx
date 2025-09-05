import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdVerified, MdSettings } from "react-icons/md";
import { FaBell, FaUpload } from "react-icons/fa";
import { formatNumber, getInitial } from "../../utils/utilityFunctions";

const ChannelInfo = ({
  channelData,
  videos,
  isOwner,
  isLoggedIn,
  handleSubscribe,
  startEditChannel,
  setShowUploadModal,
}) => {
  // Avatar error handling
  const [avatarError, setAvatarError] = useState(channelData?.avatar ? false : true);
  const [showDescription, setShowDescription] = useState(false);
  useEffect(() => {
    setAvatarError(null);
  }, [channelData.avatar]);

  return (
    <div className="px-4 lg:px-6 py-4">
      <div className="flex flex-row gap-4 items-center">
        {channelData?.avatar && !avatarError ? (
          <img
            src={channelData?.avatar}
            alt={channelData?.channelName}
            onError={() => setAvatarError(true)}
            on
            className="w-18 h-18 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full object-cover"
          />
        ) : (
          <div className="w-18 h-18 md:w-30 md:h-30 lg:w-40 lg:h-40 rounded-full flex items-center justify-center bg-blue-100">
            <p className="text-blue-600 text-bold text-4xl md:text-7xl">
              {getInitial(channelData?.channelName)}
            </p>
          </div>
        )}

        {/* Channel Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {channelData.channelName}
            </h1>
            {channelData?.isVerified && (
              <MdVerified
                className="text-blue-500"
                size={24}
                title="Verified channel"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 md:mb-3">
            <span>
              {formatNumber(channelData?.subscribers || 0)} subscribers
            </span>
            <span>•</span>
            <span>{videos?.length || 0} videos</span>
            {channelData?.totalViews && (
              <>
                <span>•</span>
                <span>{formatNumber(channelData.totalViews)} total views</span>
              </>
            )}
          </div>

          <div className="hidden md:block">
            <div className="flex gap-2 mb-4 items-center">
              <p className="text-sm break-words break-all whitespace-normal text-gray-700  max-w-2xl">
                {showDescription
                  ? channelData.description
                  : `${channelData.description?.substring(0, 20)}...`}
              </p>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="text-sm font-medium text-gray-900  hover:text-gray-700"
              >
                {showDescription ? "Show less" : "Show more"}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {!isOwner && isLoggedIn && (
                <button
                  onClick={handleSubscribe}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    channelData?.isSubscribed
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {channelData?.isSubscribed ? (
                    <div className="flex items-center gap-2">
                      <FaBell size={14} />
                      <span>Subscribed</span>
                    </div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              )}

              {!isOwner && !isLoggedIn && (
                <Link
                  to="/signin"
                  className="px-4 py-2 text-base bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Sign in to Subscribe
                </Link>
              )}
              {/* Channel Owner Actions - from medium to large screens */}
              {isOwner && (
                <>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex whitespace-nowrap items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FaUpload size={14} />
                    <span>Upload Video</span>
                  </button>

                  <button
                    onClick={startEditChannel}
                    className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <MdSettings size={16} />
                    <span>Customize Channel</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" md:hidden mt-2 space-y-3">
        <div className="flex gap-2 items-center">
          <p className="text-xs gap-2 text-gray-700  max-w-2xl">
            {showDescription
              ? channelData.description
              : `${channelData.description?.substring(0, 20)}...`}
            <span>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="text-sm font-medium text-gray-900  hover:text-gray-700"
              >
                {showDescription ? " Show less" : " Show more"}
              </button>
            </span>
          </p>
        </div>

        <div className="flex w-full items-center gap-3">
          {!isOwner && isLoggedIn && (
            <button
              onClick={handleSubscribe}
              className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                channelData?.isSubscribed
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {channelData?.isSubscribed ? (
                <div className="flex items-center gap-2">
                  <FaBell size={14} />
                  <span>Subscribed</span>
                </div>
              ) : (
                "Subscribe"
              )}
            </button>
          )}

          {!isOwner && !isLoggedIn && (
            <Link
              to="/signin"
              className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign in to Subscribe
            </Link>
          )}
          {/* Channel Owner Actions - Mobile */}
          {isOwner && (
            <div className="w-full flex flex-wrap gap-2">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex-1 flex justify-center text-sm whitespace-nowrap items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <FaUpload size={14} />
                <span>Upload Video</span>
              </button>

              <button
                onClick={startEditChannel}
                className="flex-1 justify-center text-sm whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                <MdSettings size={16} />
                <span>Customize Channel</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChannelInfo);
