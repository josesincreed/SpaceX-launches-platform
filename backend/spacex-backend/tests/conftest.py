import sys
from pathlib import Path

# Agrega /src al PYTHONPATH para pytest
SRC_PATH = Path(__file__).resolve().parents[1] / "src"
sys.path.insert(0, str(SRC_PATH))
