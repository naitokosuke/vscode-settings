#!/usr/bin/env bash
# VS Code に背景画像を追加する (拡張機能なし)
# workbench の CSS に数行追記し、product.json のチェックサムを更新して「破損」警告を出さないようにする
# dotfiles の switch (home/vscode.nix の home.activation) で毎回適用されるので、VS Code を更新しても次の switch で戻る
# macOS の App Management 保護があるため、実行するターミナルに「アプリケーション管理」の許可が必要 (VS Code の統合ターミナルなら不要)
#
# usage: scripts/vscode-background.sh [apply|remove]
set -euo pipefail

IMAGE_URL="https://images.unsplash.com/photo-1518837695005-2083093ee35b?fm=jpg&q=60&w=3000&auto=format&fit=crop" # Ocean Ripple by Matt Hardy (Unsplash)
OPACITY=0.08

ACTION="${1:-apply}"
APP="${VSCODE_APP:-/Applications/Visual Studio Code.app}/Contents/Resources/app"
export CSS_KEY="vs/workbench/workbench.desktop.main.css"
CSS="$APP/out/$CSS_KEY"
PRODUCT="$APP/product.json"

if [[ ! -f "$CSS" ]]; then
  echo "VS Code not found: $APP" >&2
  exit 0
fi

strip() {
  perl -0pi -e 's{\n?/\* vscode-background:begin \*/.*?/\* vscode-background:end \*/\n?}{}gs' "$CSS"
}

# product.json は書式を崩さないよう該当の値だけ置き換える
update_checksum() {
  perl -MDigest::SHA=sha256_base64 -0pi -e '
    BEGIN { open my $f, "<", shift @ARGV or die $!; local $/; $hash = sha256_base64(<$f>) }
    s{("\Q$ENV{CSS_KEY}\E":\s*")[^"]*"}{$1$hash"}
  ' "$CSS" "$PRODUCT"
}

case "$ACTION" in
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
echo "VS Code background: $ACTION done (run 'Developer: Reload Window')"
