'use strict'

const axios = require('axios')

const url = 'https://api.nal.usda.gov/fdc/v1/'
const apiKey = 'f30b8Dr9qFteNLSfCtaOIQX1SHHJSxOIrwfb87Vo'

module.exports.search = function search(term) {
  return axios.get(
    url +'foods/search', {
      params: {
        api_key: apiKey,
        query: term
      }
    }
  )
  .then((res) => res.data['foods'])
}

module.exports.info = function info(fdcId) {
  console.log(url + 'food/' + fdcId)
  return axios.get(
    url + 'food/' + fdcId, {
      params: {
        api_key: apiKey
      }
    }
  )
  .then(res => res.data)
}