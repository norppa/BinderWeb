const backend = 'http://localhost:3009/binder'

const checkIfSiteExists = async (site) => {
    if (typeof site !== 'string' || site === '') return { error: 'parameter site required, received ' + site }
    const url = backend + '/sites/exists/' + site
    
    try {
        const fetchResult = await fetch(url)
        const jsonResult = await fetchResult.json()
        return jsonResult[site]
    } catch (error) {
        return { error }
    }
}

const login = async (site, password) => {
    const url = backend + '/sites/login'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ site, password })
    }

    try {
        const fetchResult = await fetch(url, options)
        if (fetchResult.status === 401) {
            return { error: 'UNAUTHORIZED'}
        }
        return await fetchResult.json()
    } catch (error) {
        return { error }
    }
}

const register = async (site, password) => {
    const url = backend + '/sites/register'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ site, password })
    }

    try {
        const fetchResult = await fetch(url, options)
        return await fetchResult.json()
    } catch (error) {
        return { error }
    }
}

const getFiles = async (token) => {
    console.log('getFiles', token)
    const url = backend + '/files'
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    }

    try {
        const result = await fetch(url, options)
        if (result.status === 200) {
            return await result.json()
        }
        throw new Error(result)
    } catch (error) {
        console.error(error)
        return { error }
    }
}

export default { checkIfSiteExists, login, register, getFiles }