import random;
import time;
import urllib3
import json

dict = ["9/11", "7/11", "4/20"]

http = urllib3.PoolManager()

url = 'http://localhost:8081/TopicMention'
# url = 'http://localhost:3000/'

while True:
    topic = random.choice(dict)
    print(topic)
    fields={'topic': topic}
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