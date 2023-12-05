import React from 'react';
import './Explore.css';
import exploreConstants from '../../Constants/exploreConstants';

const Explore = () => {
  return (
    <div id='explore-page'>
      {exploreConstants.map((section) => (
        <div id='explore-section' key={section.tag}>
          <h3 className='explore-section-tag'>#{section.tag}</h3>
          <div id='explore-posts' className='explore-posts-container'>
            {section.posts.map((post) => (
              <div key={post.id} className='explore-feed'>
                {post.type === 'image' ? (
                  <div className='explore-post-img'>
                    <img alt='post-img' src={post.post} />
                  </div>
                ) : (
                  <div className='explore-post-post'>
                    <h6>{post.post}</h6>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
