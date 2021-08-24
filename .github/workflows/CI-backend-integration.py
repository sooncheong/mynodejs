#!/bin/sh

import urllib2
import json

import time
import sys
import  os

CI_RALPH_BACKEND_BUILD_TIME = os.getenv("CI_RALPH_BACKEND_BUILD_TIME") or 600
print("ENV - " + str(CI_RALPH_BACKEND_BUILD_TIME))
time.sleep(float(CI_RALPH_BACKEND_BUILD_TIME))

req = urllib2.Request("https://ralph-unit-test-report.s3-ap-southeast-1.amazonaws.com/admin-portal/backend/integration/result.json")

opener = urllib2.build_opener()
f = opener.open(req)
json = json.loads(f.read())

overRollStatus = json['projectStatus']['status']

#induStatus = json['projectStatus']['conditions']

print("Project Status - " + str(overRollStatus))

if overRollStatus == "ERROR":
    exit(1)
else:
    exit(0)  
