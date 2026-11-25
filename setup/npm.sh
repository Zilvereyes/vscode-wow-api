#!/bin/bash
set -e

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
	echo "Node.js 24 and npm are required; install them from a trusted package source." >&2
	exit 1
fi

if [ "$(node -p 'process.versions.node.split(".")[0]')" != "24" ]; then
	echo "Node.js 24 is required." >&2
	exit 1
fi

npm install
