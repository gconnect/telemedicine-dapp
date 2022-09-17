const axios =  require("axios")
require('dotenv').config({path: './.env'});

const getTVL = async() => {
  const tvlUrl = "https://asia-southeast1-algomint-tvl.cloudfunctions.net/tvlSummary"
  try{
    const response = await axios.get(tvlUrl)
    return response.data
  }catch(error){
    console.error(error)
  }
}
  const slackMessage = async () => {
    const slackWebHookUrl = `https://hooks.slack.com/services/${process.env.SLACK_HOOK}`

    const tvlData = await getTVL()
    console.log(tvlData)

    const slackBody = {
      type: "mrkdwn",
      text: ` ${parseFloat(tvlData.BTC).toFixed(2)} BTC, ${parseFloat(tvlData.WBTC).toFixed(2)} WBTC, ${parseFloat(tvlData.ETH).toFixed(2)} ETH, ${parseFloat(tvlData.SIPLP).toFixed(2)} goUSD/USDC LP, ${parseFloat(tvlData.USDC).toFixed(2)} USDC, ${parseFloat(tvlData.goBTC).toFixed(2)} goBTC, ${parseFloat(tvlData.goETH).toFixed(2)} goETH, ${parseFloat(tvlData.goUSD).toFixed(2)} goUSD,`
    }
    try{
      await axios.post(slackWebHookUrl, JSON.stringify(slackBody), {
        withCredentials: false,
        transformRequest: [(data, headers) => {
          delete headers.post["Content-Type"]
          return data
        }]
      })
    }catch(err){
      console.error(err)
    }
  }

  slackMessage()
