// import React from 'react'

// const CommentComponent = (props) => {
//     const [comment, setComment] = useState('');
//     const changeCommentInput = (e) => {
//         const { value } = e.target;
//         setComment(value);
//     }
//     const { commentRef, postComments, postComment } = props;
//     return (
//         <div id='comment-block' ref={commentRef}>
//             {postComments && postComments.map((comment, ind) => {
//                 return <div key={ind} className='comment-data'>
//                     <h4>{comment.userCommented} : </h4>
//                     <p>{comment.comment}</p>
//                 </div>
//             })}
//             <form onSubmit={postComment}>
//                 <input type="text" placeholder='Enter Comment' value={comment} onChange={changeCommentInput} />
//                 <button type='submit'>Comment</button>
//             </form>
//         </div>
//     )
// }

// export default CommentComponent;