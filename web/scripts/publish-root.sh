#!/usr/bin/env bash
# Next 빌드 결과(out/)를 저장소 루트로 반영한다.
# EC2(nginx)가 저장소 루트를 1분마다 pull 해서 서빙하므로, 이 스크립트 실행 후 커밋·푸시하면 배포 완료.
# 소스는 web/ 가 기준. 루트 파일은 빌드 산출물이므로 직접 수정하지 말 것.
set -euo pipefail
cd "$(dirname "$0")/.."            # web/
# 정식 오픈 전(검색 비노출) 빌드는 개발 서버 주소로 canonical·OG 이미지 절대경로를 만든다 → 링크 공유 썸네일이 개발 서버에서도 보임.
# 오픈 시: SITE_INDEXABLE=true NEXT_PUBLIC_SITE_URL=https://mrdevello.com ./scripts/publish-root.sh
if [ "${SITE_INDEXABLE:-}" != "true" ]; then export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://d2ufacxk4b6xve.cloudfront.net}"; fi
npm run build
ROOT="$(cd .. && pwd)"
KEEP='^(web/|README\.md$|\.gitignore$)'
# 이전 산출물 제거 (web/ 와 README 제외)
(cd "$ROOT" && git ls-files | grep -Ev "$KEEP" | xargs -r rm -f)
find "$ROOT" -mindepth 1 -maxdepth 1 -type d ! -name web ! -name .git -empty -delete 2>/dev/null || true
cp -R out/. "$ROOT"/
echo "✔ out/ → 저장소 루트 반영 완료. 이제 git add -A && git commit && git push"
