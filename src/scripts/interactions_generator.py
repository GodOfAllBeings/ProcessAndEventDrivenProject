import random;
import time;
import urllib3
import json

dict = ["linux bad", "windows11 <3", "john <3<3"]

http = urllib3.PoolManager()

url = 'http://localhost:8081/VideoInteraction'
# url = 'http://localhost:3000/'

while True:
    interaction = random.choice(dict)
    print(interaction)
    fields={'videoInteractedOn': interaction}
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