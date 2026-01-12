import requests

def web_search(query: str, serp_api_key: str, k: int = 5) -> str:
    url = "https://serpapi.com/search.json"
    params = {
        "q": query,
        "api_key": serp_api_key,
        "num": k
    }

    response = requests.get(url, params=params)
    response.raise_for_status()

    data = response.json()

    results = []
    for item in data.get("organic_results", []):
        title = item.get("title", "")
        snippet = item.get("snippet", "")
        results.append(f"{title}: {snippet}")

    return "\n".join(results)
