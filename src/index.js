document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  // "global" variables
  let imageId = 4173
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const likes = document.getElementById('likes')
  let imageCommentsContainer = document.getElementById('comments')

  function fetchImage(){
    fetch(imageURL)
    .then(function(response){
      return response.json()
    })
    .then(function(image){
      let imageCard = document.getElementById('image_card')
      let imageActual = document.getElementById('image')
      let imageName = document.getElementById('name')
      let imageLikes = document.getElementById('likes')
      imageActual.src = image.url
      imageName.innerText = image.name
      imageLikes.innerText = image.like_count
      image.comments.forEach(function(comment){
        let newComment = document.createElement('li')
        // newComment.innerHTML = comment.content
        newComment.innerHTML = `
          <button id="dddelete">Delete</button>
          ${comment.content}
        `
        // newComment.dataset."something" = comment."smoething"
        imageCommentsContainer.append(newComment)
      })

    })
  }

  fetchImage()


  let imageLikeBtn = document.getElementById('like_button')

  imageLikeBtn.addEventListener('click', function(){
    likes.innerText = parseInt(likes.innerText) + 1
    updateLikesDB()
  })
  
  function updateLikesDB(){
    fetch(likeURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`
      })
    })
  }
  
  let commentForm = document.getElementById('comment_form')
  let commentFormInput = document.getElementById('comment_input')
  
  commentForm.addEventListener('submit', function(e){
    e.preventDefault()
    let newComment = document.createElement('li')
    let newCommentText = commentFormInput.value
    newComment.innerText = newCommentText
    // newComment.dataset."something" = comment."smoething"
    imageCommentsContainer.append(newComment)
    commentForm.reset()
    updateCommentsDB(newCommentText)
  })
  
  function updateCommentsDB(newCommentText){
    fetch(commentsURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        content: `${newCommentText}`
      })
    })
  }


  // BONUS
  // imageCommentsContainer.addEventListener('click', function(e){
  //   if (e.target.id === "dddelete"){
  //     // invoke deleteCommentFromDB(e)
      
  //   }
    
    
  // })
  
  // function deleteCommentFromDB(e){     // may have to pass in argument
  //   fetch(commentsURL, {
  //     method: "DELETE",
  //     body: ({
  //       // just have to find the obj
  //     })
  //   })
  //   .then(function(response){
  //     return response.json()
  //   })
  //   .then 
    
  //   // e.target.parentNode.remove()
  // }









})
