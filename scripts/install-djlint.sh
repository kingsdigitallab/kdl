#!/usr/bin/env bash
set -e

DJLINT_BIN="node_modules/.bin/djlint"
mkdir -p node_modules/.bin

if command -v djlint &> /dev/null; then
  ln -sf "$(which djlint)" "$DJLINT_BIN"
  echo "djlint already available"
  exit 0
fi

pip3 install djlint 2>/dev/null && ln -sf "$(which djlint)" "$DJLINT_BIN" && echo "djlint installed via pip" && exit 0
pip3 install djlint --break-system-packages 2>/dev/null && ln -sf "$(which djlint)" "$DJLINT_BIN" && echo "djlint installed via pip (--break-system-packages)" && exit 0

if python3 -m venv .venv 2>/dev/null && .venv/bin/pip install djlint 2>/dev/null; then
  ln -sf "$(pwd)/.venv/bin/djlint" "$DJLINT_BIN"
  echo "djlint installed in .venv (symlinked to node_modules/.bin/djlint)"
  exit 0
fi

echo "Warning: Could not install djlint. Install manually: pip3 install djlint"
