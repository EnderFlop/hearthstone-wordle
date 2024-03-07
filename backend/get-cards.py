import os
import json
import urllib3
from dotenv import load_dotenv

load_dotenv()

def get_access_token(client_id, client_secret):
    http = urllib3.PoolManager()
    url = "https://us.battle.net/oauth/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret
    }
    response = http.request('POST', url, fields=data)

    if response.status == 200:
        body = response.data.decode('utf-8')
        token = json.loads(body)["access_token"]
        return token
    else:
        print(f"Failed to obtain access token: {response.status}")
        return None

def get_hearthstone_cards(access_token, page=1, page_size=500):
    http = urllib3.PoolManager()
    url = f"https://us.api.blizzard.com/hearthstone/cards?page={page}&pageSize={page_size}"
    params = {
        "locale": "en_US",
        "access_token": access_token
    }
    response = http.request('GET', url, fields=params)

    if response.status == 200:
        cards_response = json.loads(response.data.decode('utf-8'))
        cards = cards_response.get('cards', [])

        # Check if there are more pages
        print(page, cards_response['pageCount'])
        if page < cards_response['pageCount']:
            next_page_cards = get_hearthstone_cards(access_token, page + 1, page_size)
            cards.extend(next_page_cards)
            
        return cards
    else:
        print(f"Error fetching Hearthstone cards: {response.status}")
        return []
        
def save_locally(data):
  with open("cards.json", "w") as file:
    file.write(json.dumps(data))
  # s3 = boto3.client('s3')
  # s3.put_object(Bucket="hearthstone-cards", Key="cards.json", Body=json.dumps(data))

def main():
  client_id = os.environ['CLIENT_ID']
  client_secret = os.environ['CLIENT_SECRET']

  access_token = get_access_token(client_id, client_secret)
  cards = get_hearthstone_cards(access_token)
  save_locally(cards)

main()
