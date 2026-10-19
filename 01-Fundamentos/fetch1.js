fetch ('')
.then(result =>{
    return result.json()
})
.then(usuarios => {
    console.log(usuarios)
})

fetch ('')
.then(response => response.text())
.then(html => {
    document.body.innerHTML = html;
}
)

