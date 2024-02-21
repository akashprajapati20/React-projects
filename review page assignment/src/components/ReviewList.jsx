import React, { useState } from 'react'

const ReviewList = ({Reviewlist}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
   
    const highlightContent2 = (content, sentences, sentiment) => {
      let highlightedContent = '';
    
      // If sentences are not provided, return the content as it is
      if (!sentences || sentences.length === 0) {
        return { __html: content };
      }
    
      let lastIndex = 0;
      sentences.forEach(sentence => { console.log("here "+`${sentence}`)
        const indexOfFirst = content.indexOf(sentence, lastIndex);
    
        // If the sentence is not found, skip
        if (indexOfFirst === -1) {
          return;
        }
    
        // Append the content before the current sentence
        highlightedContent += content.substring(lastIndex, indexOfFirst);
    
        // Append the current sentence with the specified sentiment class
        highlightedContent += `<span class="${sentiment}  ">${sentence}</span>`;
    
        // Update the lastIndex to the end of the current sentence
        lastIndex = indexOfFirst + sentence.length;
      });
    
      // Append the remaining content after the last sentence
      highlightedContent += content.substring(lastIndex);
    
      return { __html: highlightedContent };
    };
    
     
  



  return (
    <div className="container">

    
    {Reviewlist.map((review)=>{
      return (
        <div key={review.review_id} className="review">
      <div className="user">
        <img className="user-img" src={review.source.icon} alt={review.review_id} />
        <span className="name">{review.reviewer_name}</span>
      </div>
     
      <div className="rating">
  {[...Array(5)].map((_, i) => (
    <span key={i} className={`star ${i < Math.floor(review.rating_review_score/2) ? 'golden' : ''} ${i >= Math.ceil(review.rating_review_score/2) ? 'hollow' : ''}`}>&#9733;</span>
  ))}
</div>
      <div className="datesentiment">
      <div className="date">{review.date}</div>
      <div className='tooltipc'>

         {showTooltip && <span className="tooltiptext ${review.sentiment}" >Sentiment:{review.sentiment}</span>}
         </div>

      </div>
       <div
            className="review-content"
            onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
            dangerouslySetInnerHTML={highlightContent2(review.content,  review.analytics.map((ob)=>{return ob.sentences}), review.sentiment)}
            title={review.sentiment} 
          />
             
         
        </div>
      )
    }

    )
  }</div>
  )
}

export default ReviewList
