import React, { useEffect, useState } from 'react';
import './Explore.css';
import exploreConstants from '../../Constants/exploreConstants';
import axios from 'axios';

const Explore = () => {
  const [explorePage, setExplorePage] = useState();
  const searchExplorePageContent = async () => {
    const response = await axios.get('http://localhost:5001/api/user/exploreFeed');
    const data = response.data;
    setExplorePage(data.posts);
  }
  useEffect(() => {
    searchExplorePageContent();
  }, []);
  return (
    <div id='explore-page'>
      {explorePage && explorePage.map((section) => (
        <div id='explore-section' key={section[0].category}>
          <h3 className='explore-section-tag'>#{section[0].category}</h3>
          <div id='explore-posts' className='explore-posts-container'>
            {section.map((post) => (
              <div key={post._id} className='explore-feed'>
                <div className='explore-post-img'>
                  <img alt='post-img' src={post.imageUrl} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
