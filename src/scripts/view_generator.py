import random;
import time;
import urllib3
import json

dict = ["cat", "dog"]

http = urllib3.PoolManager()

url = 'http://localhost:8081/ViewOnVideo'
# url = 'http://localhost:3000/'

while True:
    video = random.choice(dict)
    print(video)
    fields={'value': video}
    encoded = json.dumps(fields).encode('utf-8')
    r = http.request('POST', url, body=encoded, headers={'Content-Type': 'application/json'});
    time.sleep(random.random())
    