const key = 'cd5g0v2ad3i5nc8nuio0cd5g0v2ad3i5nc8nuiog'

export async function fetchTickers(signal) {
    const resp = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`, { signal })
    return await resp.json()
}

export async function fetchProfile(signal, ticker) {
    const resp = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${key}`, { signal })
    return await resp.json()
}

export async function fetchIndicators(signal, ticker) {
    const resp = await fetch(`https://finnhub.io/api/v1/indicator?symbol=${ticker}&resolution=D&from=1663529116&to=1665343516&indicator=rsi&timeperiod=3&token=${key}`, { signal })
    return await resp.json()
}

export async function fetchSentiment(signal, ticker) {
    const resp = await fetch(`https://finnhub.io/api/v1/stock/social-sentiment?symbol=${ticker}&token=${key}`, { signal })
    return await resp.json()
}

export async function fetchEarnings(signal, ticker) {
    const resp = await fetch(`https://finnhub.io/api/v1/stock/earnings?symbol=${ticker}&token=${key}`, { signal })
    return await resp.json()
}

export async function fetchInsiders(signal, ticker) {
    const resp = await fetch(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${ticker}&from=2022-01-01&to=2022-09-01&token=${key}`, { signal })
    return await resp.json()
}

export async function fetchNews(signal, ticker) {
    const resp = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2022-10-03&to=2022-10-15&token=${key}`, { signal })
    return await resp.json()
}
