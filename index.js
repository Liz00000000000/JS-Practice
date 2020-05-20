document.addEventListener('DOMContentLoaded', function(){
    
const actionUrl = 'http://localhost:4000/action'
const comendyUrl = 'http://localhost:4000/comedy'
const horrorUrl = 'http://localhost:4000/horror'
const actionDiv = document.querySelector('#action')
const comedyDiv = document.querySelector('#comedy')
const horrorDiv = document.querySelector('#horror')

function loadMovies(array, div){
    if (array.length == 1){
        const liNew = document.createElement('li')
        liNew.setAttribute('id',`${array[0].id}`)
        liNew.innerHTML = `<h3>${array[0].title}</h3>
        <h4 id='cast'> Starting ${array[0].cast[0].name}, ${array[0].cast[1].name}, and ${array[0].cast[2].name}</h4>
        <button>View Cast</button><br>
        <input placeholder='Adrian Brody'><br>
        <button>Add Cast Member</button><br>
        <img src="${array[0].cover}"><br>
        <button>Back</button>`
        div.append(liNew)
    }
   else {array.forEach(movie => {
       const li = document.createElement('li')
       li.setAttribute('id',`${movie.id}`)
       li.innerHTML = `<h3>${movie.title}</h3>
       <h4 id='cast'> Starting ${movie.cast[0].name}, ${movie.cast[1].name}, and ${movie.cast[2].name}</h4>
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
    } else if (e.target.innerHTML === 'Add Cast Member'){

        const castTag = e.target.parentElement.querySelector('#cast')
        const currectCast = e.target.parentElement.querySelector('#cast').innerText
        console.log(castTag)
        
    }
})



fetch(actionUrl).then(res => res.json()).then(actionMovies => loadMovies(actionMovies, actionDiv))
fetch(comendyUrl).then(res => res.json()).then(comedyMovies => loadMovies(comedyMovies, comedyDiv))
fetch(horrorUrl).then(res => res.json()).then(horrorMovies => loadMovies(horrorMovies, horrorDiv))


document.addEventListener('change', function(e){
     console.log(e.target.value)
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
    }
})



})