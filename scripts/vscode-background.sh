#!/usr/bin/env bash
# VS Code に背景画像を追加する (拡張機能なし)
# workbench の CSS に数行追記し、product.json のチェックサムを更新して「破損」警告を出さないようにする
# macOS の App Management 保護があるため VS Code の統合ターミナルから実行すること
# VS Code を更新すると元に戻るので、その都度再実行する
#
# usage: scripts/vscode-background.sh [apply|remove]
set -euo pipefail

IMAGE_URL="https://images.unsplash.com/photo-1518837695005-2083093ee35b?fm=jpg&q=60&w=3000&auto=format&fit=crop" # Ocean Ripple by Matt Hardy (Unsplash)
OPACITY=0.15

APP="${VSCODE_APP:-/Applications/Visual Studio Code.app}/Contents/Resources/app"
CSS_KEY="vs/workbench/workbench.desktop.main.css"
CSS="$APP/out/$CSS_KEY"
PRODUCT="$APP/product.json"

strip() {
  perl -0pi -e 's{\n?/\* vscode-background:begin \*/.*?/\* vscode-background:end \*/\n?}{}gs' "$CSS"
}

update_checksum() {
  local hash tmp
  hash=$(openssl dgst -sha256 -binary "$CSS" | base64 | tr -d =)
  tmp=$(mktemp)
  jq --arg k "$CSS_KEY" --arg v "$hash" '.checksums[$k] = $v' "$PRODUCT" >"$tmp"
  cat "$tmp" >"$PRODUCT"
  rm "$tmp"
}

case "${1:-apply}" in
apply)
  strip
  cat >>"$CSS" <<EOF

/* vscode-background:begin */
body::after{content:"";position:fixed;inset:0;z-index:10000;pointer-events:none;background:url("$IMAGE_URL") center/cover no-repeat;opacity:$OPACITY}
/* vscode-background:end */
EOF
  ;;
remove) strip ;;
*)
  echo "usage: $0 [apply|remove]" >&2
  exit 1
  ;;
esac

update_checksum
echo "done: run 'Developer: Reload Window'"
