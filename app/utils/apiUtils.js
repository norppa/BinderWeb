// const backend = 'http://localhost:3000/binder'
const backend = 'https://jtthaavi.kapsi.fi/subrosa/binder'

const checkIfSiteExists = async (site) => {
    if (typeof site !== 'string' || site === '') return { error: 'parameter site required, received ' + site }
    const url = backend + '/sites/exists/' + site
    console.log('url', url)
    
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
    // console.log('getFiles', token)
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
        return { error: result }
    } catch (error) {
        console.error(error)
        return { error }
    }
}

const getFileContents = async (token, id) => {
        // console.log('getFileContents', token, id)
    const url = backend + '/files/' + id
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
            const resultJson = await result.json()
            return resultJson.contents
        }
        throw new Error(result)
    } catch (error) {
        console.error(error)
        return { error }
    }
}

const save = async (data, token) => {
    console.log('save', data, token.substring(0,8))
    const url = backend + '/files'
    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }

    try {
        const result = await fetch(url, options)
        console.log('save result', result)
        if (result.status === 200) {
            return await result.json()
        }
        throw new Error(result)
    } catch (error) {
        console.error(JSON.stringify(error))
        return { error }
    }

}

export default { checkIfSiteExists, login, register, getFiles, getFileContents, save }