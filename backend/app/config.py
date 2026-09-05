import os
from pathlib import Path
from dotenv import load_dotenv

# Absolute path to the .env file at the backend project root, so environment
# variables load correctly regardless of the current working directory.
BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BACKEND_DIR / ".env"


def load_env():
    """Load the backend .env file into the process environment.

    Anchored to the project root so it works no matter where uvicorn is
    started from (e.g. ``uvicorn app.main:app`` run from backend/ or from
    another directory). Existing environment variables take precedence and
    are never overridden.
    """
    load_dotenv(dotenv_path=ENV_FILE, override=False)
