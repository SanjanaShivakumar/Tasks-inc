const update = document.querySelector('#update-button')
update.addEventListener('click', _ => {
   fetch('/updateQuotes',{
       method:'put',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({
           name : 'Ross',
           quote:'We were on a break!'
       })
   })
   fetch('/updateQuotes',{
    method:'put',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        name : 'Rachel',
        quote:'We were on a break!'
    })
})
   .then(res => {
    if (res.ok) return res.json()
    })
})

const remove = document.querySelector('#delete-button')
remove.addEventListener('click', _ => {
   fetch('/deleteQuotes',{
       method:'delete',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({
           name:'Chandler',
           name: 'Monica'
       })
   })
   .then(res => {
    if (res.ok) return res.json()
    })
})