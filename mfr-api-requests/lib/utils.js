'use strict'
const URL = require('url')

exports.doencode = function() {
  const encode = require('nodejs-base64-encode');
  var username = "fekadu_wannaw@et.jsi.com";
  var password = "12345678";
  var tobeencoded = username + ":" + password;
  return encode.encode(tobeencoded, 'base64');
}

exports.doencodeDHIS2 = function() {
  const encode = require('nodejs-base64-encode');
  var username = "admin";
  var password = "district";
  var tobeencoded = username + ":" + password;
  return encode.encode(tobeencoded, 'base64');
}

exports.returnShortName = function(name) {
  let shortName;
  if(name.endsWith('Federal Ministry of Helath')) {
    shortName = name.replace('Federal Ministry of Helath', 'FMOH')
  } else if(name.endsWith('Regional Health Bureau')) {
    shortName = name.replace('Regional Health Bureau', 'RHB')
  } else if(name.endsWith('Zonal Health Department')) {
    shortName = name.replace('Zonal Health Department', 'ZHD')
  } else if(name.endsWith('Woreda Health Office')) {
    shortName = name.replace('Woreda Health Office', 'WorHO')
  } else if(name.endsWith('Health Post')) {
    shortName = name.replace('Health Post', 'HP')
  } else if(name.endsWith('Health Center')) {
    shortName = name.replace('Health Center', 'HC')
  } else if(name.endsWith('Clinic')) {
    shortName = name.replace('Clinic', 'C')
  } else if(name.endsWith('Hospital')) {
    shortName = name.replace('Hospital', 'HSP')
  } else {
    shortName = name
  }
  
  return shortName
}

exports.buildOrchestration = (name, beforeTimestamp, method, url, requestHeaders, requestContent, res, body) => {
  let uri = URL.parse(url)
  return {
    name: name,
    request: {
      method: method,
      headers: requestHeaders,
      body: requestContent,
      timestamp: beforeTimestamp,
      path: uri.path,
      querystring: uri.query
    },
    response: {
      status: res.statusCode,
      headers: res.headers,
      body: body,
      timestamp: new Date()
    }
  }
}

exports.buildReturnObject = (urn, status, statusCode, headers, responseBody, orchestrations, properties) => {
  var response = {
    status: statusCode,
    headers: headers,
    body: responseBody,
    timestamp: new Date().getTime()
  }
  return {
    'x-mediator-urn': urn,
    status: status,
    response: response,
    orchestrations: orchestrations,
    properties: properties
  }
}
