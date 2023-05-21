const Instance = (url, method = 'get', token = localStorage.getItem('token'), body = null) =>
    fetch('http://api-shop.alabuga.space/api-shop/' + url, {
        method: method,
        headers: {
            'Content-type': 'application/json',
            'Authorization': token && 'Bearer ' + token
        },
        body: body && JSON.stringify(body)
    })
export default Instance