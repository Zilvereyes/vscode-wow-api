#!/bin/bash
set -e

sudo apt update

# Lua and LuaRocks are installed from Ubuntu's signed repositories. Keep the
# project modules in .lua so the existing activation workflow remains local.
sudo apt install lua5.4 liblua5.4-dev luarocks libreadline-dev libssl-dev unzip -y
mkdir -p .lua/bin
ln -sf "$(command -v lua5.4)" .lua/bin/lua
cat > .lua/bin/activate <<'EOF'
lua_tree="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="${lua_tree}/bin:${PATH}"
export LUA_PATH="${lua_tree}/share/lua/5.4/?.lua;${lua_tree}/share/lua/5.4/?/init.lua;;"
export LUA_CPATH="${lua_tree}/lib/lua/5.4/?.so;;"
unset lua_tree
EOF
source .lua/bin/activate

# lua modules
luarocks --lua-version=5.4 --tree=.lua make ./setup/vscode-wow-api-scm-0.rockspec

echo "Setup complete for generating LuaLS annotations"
