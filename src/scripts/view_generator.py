import random;
import time;
import urllib3
import json

dict = ["cat", "dog", "frog"]

http = urllib3.PoolManager()

url = 'http://localhost:8081/ViewOnVideo'
# url = 'http://localhost:3000/'

debugging = True
if debugging:
    i = 0
    while i < 20: 
        video = "cat"
        print(video)
        fields={'video': video}
        encoded = json.dumps(fields).encode('utf-8')
        r = http.request('POST', url, body=encoded, headers={'Content-Type': 'application/json'})
        time.sleep(random.random()/2)
        i = i + 1
    exit()

while True:
    video = random.choice(dict)
    print(video)
    fields={'video': video}
    encoded = json.dumps(fields).encode('utf-8')
    r = http.request('POST', url, body=encoded, headers={'Content-Type': 'application/json'})
    time.sleep(random.random())

"""
{
  "messageName" : "VideoGoneViral",
  "businessKey" : "1",
  "processVariables" : {
    "videoId" : {  
        "value": "cat", "type": "string"
    }
  }
}
 """