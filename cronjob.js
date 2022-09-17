const axios =  require("axios")
require('dotenv').config({path: './.env'});

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
      console.error(err)
    }
  }

  const getTVL = async() => {
    const tvlUrl = "https://asia-southeast1-algomint-tvl.cloudfunctions.net/tvlSummary"
    try{
      const response = await axios.get(tvlUrl)
      await slackCall(`
        ${parseFloat(response.data.BTC).toFixed(2)} BTC, ${parseFloat(response.data.WBTC).toFixed(2)} WBTC, ${parseFloat(response.data.ETH).toFixed(2)} ETH, ${parseFloat(response.data.SIPLP).toFixed(2)} goUSD/USDC LP, ${parseFloat(response.data.USDC).toFixed(2)} USDC, ${parseFloat(response.data.goBTC).toFixed(2)} goBTC, ${parseFloat(response.data.goETH).toFixed(2)} goETH, ${parseFloat(response.data.goUSD).toFixed(2)} goUSD,
      `)
      console.log(response.data)
      return response.data
    }catch(error){
      console.error(error)
    }
  }

  getTVL()
