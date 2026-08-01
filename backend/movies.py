# A tiny, hand-written dataset so the whole example runs with no downloads,
# no API keys, and no external data files. In a real project this would come
# from a database or a CSV.
#
# "tags" is the text we'll feed to the ML model. It's a mix of genre and
# short description, mashed together into one string per movie.

MOVIES = [
    {
        "id": 1,
        "title": "Galaxy Raiders",
        "genres": "sci-fi action adventure",
        "description": "A rogue pilot leads a rebellion against an empire that controls the stars.",
    },
    {
        "id": 2,
        "title": "The Last Starlight",
        "genres": "sci-fi drama",
        "description": "A scientist races to save Earth from a dying sun using experimental technology.",
    },
    {
        "id": 3,
        "title": "Heartstrings",
        "genres": "romance drama",
        "description": "Two rival musicians fall in love while competing for the same scholarship.",
    },
    {
        "id": 4,
        "title": "Letters We Never Sent",
        "genres": "romance drama",
        "description": "A woman discovers decades-old love letters that change how she sees her family.",
    },
    {
        "id": 5,
        "title": "Kitchen Chaos",
        "genres": "comedy",
        "description": "A disaster-prone chef tries to save his failing restaurant before the health inspector arrives.",
    },
    {
        "id": 6,
        "title": "Roommates Forever",
        "genres": "comedy romance",
        "description": "Two mismatched roommates accidentally become the city's most talked-about couple.",
    },
    {
        "id": 7,
        "title": "Silent Verdict",
        "genres": "thriller mystery crime",
        "description": "A detective uncovers a conspiracy while investigating a seemingly ordinary murder.",
    },
    {
        "id": 8,
        "title": "The Glass Alibi",
        "genres": "thriller mystery crime",
        "description": "A lawyer defends a client she suspects is guilty, unraveling a web of lies.",
    },
    {
        "id": 9,
        "title": "Warp Drive",
        "genres": "sci-fi action",
        "description": "A crew tests humanity's first faster-than-light ship, with catastrophic consequences.",
    },
    {
        "id": 10,
        "title": "Second Chances",
        "genres": "drama romance",
        "description": "A widow rebuilds her life and unexpectedly falls in love again.",
    },
    {
        "id": 11,
        "title": "Punchline",
        "genres": "comedy drama",
        "description": "A struggling stand-up comedian finds an unlikely mentor in a retired legend.",
    },
    {
        "id": 12,
        "title": "The Vanishing Hour",
        "genres": "thriller mystery",
        "description": "A journalist investigates a string of disappearances tied to a small town's dark secret.",
    },
]
