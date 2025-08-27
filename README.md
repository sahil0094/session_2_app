# Flask Animal Selector & File Upload

Using uv (recommended):

```bash
cd "/Users/sahilpahuja/AI_ML/ERA4/Session_2/take_home"
uv venv
source .venv/bin/activate
uv add flask
uv run flask --app app run --debug --host 127.0.0.1 --port 8000
```

Open `http://127.0.0.1:8000`.

Features:
- Select one of: cat, dog, elephant → shows local image
- Upload any file → returns JSON: name, size (bytes), type

Structure:
- `app.py` — Flask app with `/` and `/upload`
- `templates/index.html` — UI markup
- `static/styles.css` — styles
- `static/script.js` — behavior
- `static/images/*.svg` — animal images
