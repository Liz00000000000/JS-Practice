document.addEventListener('DOMContentLoaded', function(){
    
const actionUrl = 'http://localhost:4000/action'
const comendyUrl = 'http://localhost:4000/comedy'
const horrorUrl = 'http://localhost:4000/horror'
const actionDiv = document.querySelector('#action')
const comedyDiv = document.querySelector('#comedy')
const horrorDiv = document.querySelector('#horror')
const option = document.querySelector('select')
const topBar = document.querySelector('.tools')

function loadMovies(array, div){
    if (array.length == 1){
        const liNew = document.createElement('li')
        liNew.setAttribute('id',`${array[0].id}`)
        liNew.innerHTML = `<h3>${array[0].title}</h3>
        <p>${array[0]['duration-in-hours']} hours long</p>
        <h4 id='cast'> ${array[0].cast[0].name} as ${array[0].cast[0].character}, ${array[0].cast[1].name} as ${array[0].cast[1].character}, and ${array[0].cast[2].name} as ${array[0].cast[2].character}</h4>
        <button>View Cast</button><br>
        <input placeholder='Adrian Brody'><br>
        <button id='add'>Add Cast Member</button><br>
        <img src="${array[0].cover}"><br>
        <button>Back</button>`
        div.append(liNew)
    }
   else {array.forEach(movie => {
       const li = document.createElement('li')
       li.setAttribute('id',`${movie.id}`)
       li.innerHTML = `<h3>${movie.title}</h3>
       <p>${movie['duration-in-hours']} hours long</p>
       <h4 id='cast'>${movie.cast[0].name} as ${movie.cast[0].character}, ${movie.cast[1].name} as ${movie.cast[1].character}, and ${movie.cast[2].name} as ${movie.cast[2].character}</h4>
       <button>View Cast</button><br>
       <img src="${movie.cover}">`
       div.append(li) })
   }
}


document.addEventListener('click', function(e){
    if (e.target.innerHTML == 'View Cast'){
       const stars = e.target.parentElement.querySelector('#cast')
       const bigStars = stars.innerText
       stars.innerHTML = `<h2>${bigStars}</h2>`
       e.target.innerHTML = 'Hide Cast'
    } else if (e.target.innerHTML == 'Hide Cast'){
       const cast = e.target.parentElement.querySelector('#cast')
       const smallStars = cast.innerText
       cast.innerHTML = `<h4>${smallStars}</h4>`
       e.target.innerHTML = 'View Cast'
    } else if (e.target.localName == 'img'){
        const id = e.target.parentElement.id
        const genre = e.target.parentElement.parentElement.id
        actionDiv.innerHTML = ' '
        comedyDiv.innerHTML = ' '
        horrorDiv.innerHTML = ' '
            if (genre === 'horror'){
                fetch(`${horrorUrl}/${id}`).then(res => res.json()).then(horrorMovies => {
                    const horrorMovie = [horrorMovies]
                    loadMovies(horrorMovie, horrorDiv)})
            } else if (genre == 'comedy'){
                fetch(`${comendyUrl}/${id}`).then(res => res.json()).then(comedyMovies => {
                    const comedyMovie = [comedyMovies]
                    loadMovies(comedyMovie, comedyDiv)})
            } else if (genre == 'action'){
                fetch(`${actionUrl}/${id}`).then(res => res.json()).then(actionMovies => {
                    const actionMovie = [actionMovies]
                    loadMovies(actionMovie, actionDiv)})
            }
    } else if (e.target.innerHTML == 'Back'){
        actionDiv.innerHTML = ' '
        comedyDiv.innerHTML = ' '
        horrorDiv.innerHTML = ' '
        fetch(actionUrl).then(res => res.json()).then(actionMovies => loadMovies(actionMovies, actionDiv))
        fetch(comendyUrl).then(res => res.json()).then(comedyMovies => loadMovies(comedyMovies, comedyDiv))
        fetch(horrorUrl).then(res => res.json()).then(horrorMovies => loadMovies(horrorMovies, horrorDiv))
    } else if (e.target.innerText == 'Add Cast Member'){
        e.preventDefault()
      const castTag = e.target.parentElement.parentElement.querySelector('#cast')
      const currectCast = e.target.parentElement.querySelector('#cast').innerText
      const newCastMember = document.querySelector('input').value
      castTag.innerText = newCastMember + ', ' + currectCast
      
  } else if (e.target.innerText == 'Add Movie'){
      const form = document.createElement('form')
      form.innerHTML = '<input placeholder="new movie title"><br><input placeholder="length in hours"><br><input placeholder="coverphoto"><br><input placeholder="cast"><br><button>Submit</button>'
      topBar.append(form)
  } else if (e.target.innerText == 'Submit'){
      e.preventDefault()
      const newDiv = document.createElement('div')
      newDiv.setAttribute('class','movie-list')
      const newTitle = document.querySelectorAll('input')[0].value
      const newLegnth = document.querySelectorAll('input')[1].value
      const newPhoto = document.querySelectorAll('input')[2].value
      const newCast = document.querySelectorAll('input')[3].value
      console.log(newTitle, newLegnth, newPhoto, newCast)
      newDiv.innerHTML = `<h2>${newTitle}<h2><p>${newLegnth} hours long</p><h4>${newCast}</h4>`
      topBar.append(newDiv)
      form.reset()
  }
})



fetch(actionUrl).then(res => res.json()).then(actionMovies => loadMovies(actionMovies, actionDiv))
fetch(comendyUrl).then(res => res.json()).then(comedyMovies => loadMovies(comedyMovies, comedyDiv))
fetch(horrorUrl).then(res => res.json()).then(horrorMovies => loadMovies(horrorMovies, horrorDiv))


option.addEventListener('change', function(e){
        actionDiv.innerHTML = ' '
        comedyDiv.innerHTML = ' '
        horrorDiv.innerHTML = ' '

    if (e.target.value == 'all'){
        fetch(actionUrl).then(res => res.json()).then(actionMovies => loadMovies(actionMovies, actionDiv))
        fetch(comendyUrl).then(res => res.json()).then(comedyMovies => loadMovies(comedyMovies, comedyDiv))
        fetch(horrorUrl).then(res => res.json()).then(horrorMovies => loadMovies(horrorMovies, horrorDiv)) 
    } else if (e.target.value == 'comedy'){
        fetch(comendyUrl).then(res => res.json()).then(comedyMovies => loadMovies(comedyMovies, comedyDiv))
    } else if (e.target.value == 'horror'){
        fetch(horrorUrl).then(res => res.json()).then(horrorMovies => loadMovies(horrorMovies, horrorDiv))
    } else if (e.target.value == 'action'){
        fetch(actionUrl).then(res => res.json()).then(actionMovies => loadMovies(actionMovies, actionDiv))
    } else {e.preventDefault()}

})



})