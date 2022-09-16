const axios =  require("axios")

  const slackCall = async (message) => {
    const slackWebHookUrl = `https://hooks.slack.com/services/${process.env.REACT_APP_SLACK_HOOK}`
    const slackBody = {
      type: "mrkdwn",
      text: message
    }
    try{
      const response = await axios.post(slackWebHookUrl, JSON.stringify(slackBody), {
        withCredentials: false,
        transformRequest: [(data, headers) => {
          delete headers.post["Content-Type"]
          return data
        }]
      })
      console.log(` slack call ${response}`)
      return response
    }catch(err){
  
    }
  }

  const getTVL = async() => {
    const tvlUrl = "https://asia-southeast1-algomint-tvl.cloudfunctions.net/tvlSummary"
    try{
      const response = await axios.get(tvlUrl)
      slackCall(`
        ${response.data.BTC} BTC, 
        ${response.data.WBTC} WBTC,
        ${response.data.ETH} ETH,
        ${response.data.SIPLP} goUSD/USDC LP,
        ${response.data.USDC} USDC,
        ${response.data.goBTC} goBTC,
        ${response.data.goETH} goETH,
        ${response.data.goUSD} goUSD,
      `)
      console.log(response.data)
      return response.data
    }catch(error){
      console.error(error)
    }
  }

  getTVL()
