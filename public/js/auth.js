(function () {
  const thisURL = new URL(window.location.href)
  const client_id = thisURL.searchParams.get('client_id')
  const redirect_uri = thisURL.searchParams.get('redirect_uri')
  const response_type = thisURL.searchParams.get('response_type')

  const token = window.localStorage.getItem('token')

  const loadingDiv = document.getElementById('loading')
  const loginformDiv = document.getElementById('loginform')
  const loginform = document.getElementById('login')
  const loginNotice = document.getElementById('login-notice')
  
  const req = new XMLHttpRequest()
  req.open('POST', '/api/checkClient', true)

  if (token) req.setRequestHeader('Authorization', 'Bearer ' + token)

  req.setRequestHeader('Content-Type', 'application/json')
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      const res = JSON.parse(this.responseText)
      
      if (!res.success) {
        loadingDiv.innerText = res.message
        return
      }

      if (res.needLogin) {
        loadingDiv.style.display = 'none'
        loginformDiv.style.display = 'block'
        loginform.onsubmit = function (ev) {
          ev.preventDefault()

          const req2 = new XMLHttpRequest()
          req2.open('POST', '/api/login', true)

          req2.setRequestHeader('Content-Type', 'application/json')
          req2.onreadystatechange = function () {
            if (this.readyState === 4) {
              const res = JSON.parse(this.responseText)
              
              if (!res.success) {
                loginNotice.innerText = res.message
                return
              }

              window.localStorage.setItem('token', res.token)
              window.location.reload()
            }
          }

          req2.send(JSON.stringify({ id: loginform.id.value, password: loginform.password.value }))
        }

        return
      }

      window.location.replace(res.redirect)
    }
  }

  req.send(JSON.stringify({ client_id, redirect_uri, response_type }))
})()
