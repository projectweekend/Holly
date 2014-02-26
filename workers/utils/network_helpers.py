import json
import requests


def make_json_post(url, data):
    request_headers = {'content-type': 'application/json'}
    json_data = json.dumps(data)
    response = requests.post(url, data=json_data, headers=request_headers)
    return response.status_code
