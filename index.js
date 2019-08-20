const http = require('http')

const domain = '';
const connPort = 80;

function sendRequest(options,data=""){
  return new Promise((resolve, reject)=>{
    const req = http.request(options, (res) => {
      let str = '';
      res.on('data', function (chunk) {
        str += chunk;
      });

      res.on('end', function () {
        const d = JSON.parse(str);
        if(res.statusCode===200){
          resolve(d)
        }else{
          reject(d)
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })
    req.write(data)
    req.end()
  })
}

async function authenticate(){
  console.log("***** Authentication started.")
  const data = JSON.stringify({
    'username': 'diamond_expiry_executor',
    'password': 'fdsafdsa',
    'select-optimised': 'true'
  })

  const options = {
    hostname: domain,
    port: connPort,
    path: '/api/authenticate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  try{
    let res = await sendRequest(options, data)
    return new Promise((resolve,reject)=>{
      resolve(res.token)
    })
  }catch(err){
    console.log(err)
  }
}

async function trigger(token) {
  console.log("***** Function trigger started.")
  const options = {
    hostname: domain,
    port: connPort,
    path: '/api/path-to-api',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  try{
    await sendRequest(options)
  }catch(err){
    console.log(err)
  }
}

async function main(){
  console.log("***** Api Executor started")
  let token = await authenticate()
  if(token){
    trigger(token)
  }
}

exports.handler = async (event) => {
    main()
};
