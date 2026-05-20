import urllib.request
import re

url = 'https://www.youtube.com/@maabaglamukhidarshan-d2e/videos'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    video_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
    unique_ids = list(dict.fromkeys(video_ids))
    print('Found Video IDs:', unique_ids[:3])
    
    for vid in unique_ids[:3]:
        title_match = re.search(r'"videoId":"' + vid + r'".*?"title":\{"runs":\[\{"text":"(.*?)"\}\]', html)
        title = title_match.group(1) if title_match else 'Maa Baglamukhi Darshan'
        print(f'{{ id: "{vid}", title: "{title}", thumbnail: "https://i.ytimg.com/vi/{vid}/hqdefault.jpg" }},')
        
except Exception as e:
    print('Error:', e)
