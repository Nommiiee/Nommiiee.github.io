async function start() {
    const response = await fetch('https://api.chucknorris.io/jokes/random')
    const data = await response.json()
    document.getElementById('fact').textContent = data.value
}
start()


async function animeQuote() {
    const response = await fetch('https://animechan.vercel.app/api/random')
    const data = await response.json()
    console.log(data)
    loadQuote(data)
}

function loadQuote(newQuote) {
    rivets.bind(document.getElementById('card'), { name: newQuote.anime, quote: newQuote.quote, character: newQuote.character })
        // rivets.bind(document.querySelector("#card"), { Name: newQuote.anime })

    // rivets.bind(document.querySelector("#card"), { Quote: newQuote.quote })

    // rivets.bind(document.querySelector("#card"), { Character: newQuote.character })

    /*
    rivets.bind(document.querySelector('#quote'), { newAnime: newQuote.anime });
    rivets.bind(document.querySelector('#anime'), { quote: newQuote.quote });
    rivets.bind(document.querySelector('#character'), { quote: newQuote.character });
    */
    // document.getElementById('aniName').textContent = newQuote.anime
    // document.getElementById('aniQuote').textContent = "⟪ " + newQuote.quote + " ⟫"
    // document.getElementById('aniCharacter').textContent = "- " + newQuote.character
}
animeQuote()


async function placeJson() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    console.log(data)
}
// placeJson()