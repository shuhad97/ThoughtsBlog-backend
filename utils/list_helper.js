const dummy = (blogs) => {
    return 1;
  }


const totalLike = (blogs) =>{

  const reducerTotal = (sum, element)=>{
        
    return sum + element;
  }

   return blogs.reduce(reducerTotal, 0)

}

const mostLikes = (blogs) =>{

  const reducerLikes = (mostLikes, elements) =>{

    if(elements.likes> mostLikes.likes){
      return elements;
    } else {
      return mostLikes
    }
    
  }

  return blogs.reduce(reducerLikes)


}
  
  module.exports = {
    dummy,
    totalLike,
    mostLikes
  }