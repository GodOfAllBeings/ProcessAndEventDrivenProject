import random;
import time;
import urllib3
import json

dict = ["cat", "dog"]

http = urllib3.PoolManager()

while True:
    video = random.choice(dict)
    print(video)
    fields={'value': video}
    encoded = json.dumps(fields).encode('utf-8')
    r = http.request('POST', 'http://localhost:8081/ViewOnVideo', body=encoded, headers={'Content-Type': 'application/json'});
    time.sleep(random.random())
    