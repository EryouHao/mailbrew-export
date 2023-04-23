const fs = require('fs');

/**
 * 登录状态下的 Cookie
 */
const ENV_COOKIE = '<Change me use your cookie>';

let totalCount = 0

const main = async (nextRequestPath) => {
  const res = await fetch(nextRequestPath || "https://api.mailbrew.com/read_later/?archived=false&size=50", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-tt-env": "boe_url_message_link",
      "cookie": ENV_COOKIE,
      "Referer": "https://app.mailbrew.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const data = await res.json();

  const newArray = data.results;

  const fileData = fs.readFileSync('./read.json');

  const originalArray = JSON.parse(fileData);

  const mergedArray = originalArray.concat(newArray);


  const jsonString = JSON.stringify(mergedArray, null, 2);

  // Append the JSON string to the original file
  fs.writeFileSync('./read.json', jsonString);
  
  if (data.next) {
    console.log('🚀 export progress: ', data.results.length, data.next, ' total: ', totalCount += data.results.length);

    // delay 3000ms
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    await main(data.next);
  } else {
    console.log('✅ export done: ', data.results.length, ' total: ', totalCount += data.results.length);
  }
}

main();