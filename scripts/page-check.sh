#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND="$ROOT/frontend"
SITE="$FRONTEND/_site"
PREFIX="kdl"
REPORT="$ROOT/.page-check.report"
PASS=0
FAIL=0
SKIP=0

if [ ! -d "$SITE" ]; then
    echo "[ERROR] _site not found. Build first: npm run build -w frontend -- --pathprefix '$PREFIX'"
    exit 1
fi

# Collect output into a variable so we can print and write to file
OUTPUT=""

log() { OUTPUT="${OUTPUT}$1\n"; }

check() {
    local url="$1"
    local label="$2"
    local pattern="${3:-.}"

    local rel="${url#/$PREFIX/}"
    local file="$SITE/$rel"

    if [ -d "$file" ]; then
        file="$file/index.html"
    fi

    if [ ! -f "$file" ]; then
        log "$(printf "  %-30s %-45s %s" "$label" "$url" "⚠ NOT FOUND")"
        SKIP=$((SKIP+1))
        return
    fi

    local count
    count=$(grep -c "$pattern" "$file" 2>/dev/null || echo 0)

    if [ "$count" -gt 0 ]; then
        log "$(printf "  %-30s %-45s %s" "$label" "$url" "✓ ($count matches)")"
        PASS=$((PASS+1))
    else
        log "$(printf "  %-30s %-45s %s" "$label" "$url" "✗ (pattern not found)")"
        FAIL=$((FAIL+1))
    fi
}

# Build the report
log ""
log "=== Page Rendering Check ==="
log ""

log "$(printf "  %-30s %-45s %s" "Page" "URL" "Status")"
log "$(printf "  %-30s %-45s %s" "$(printf '=%.0s' {1..30})" "$(printf '=%.0s' {1..45})" "$(printf '=%.0s' {1..20})")"

check "/kdl/"                          "Home"                    "King.*Digital.*Lab"
check "/kdl/projects/"                 "Projects index"          "project"
check "/kdl/projects/archetype/"       "Project detail"          "article"
check "/kdl/about/people/"             "People index"            "people\|People"
check "/kdl/about/people/stefan-meier/" "Person detail"          "article"
check "/kdl/blog/"                     "Blog index"              "href.*blog"
check "/kdl/blog/kdl-launch/"          "Blog post"               "King.*Digital Lab"
check "/kdl/slides/"                   "Slides index"            "slide"
check "/kdl/slides/2024-london-ireal-workshop-2/" "Slide detail"  "section class=.slide."
check "/kdl/faqs/"                     "FAQs index"              "faq\|FAQ"
check "/kdl/faqs/what-kind-of-projects-does-kdl-take-on/" "FAQ detail" "article"
check "/kdl/projects/research-themes/"  "Themes index"            "theme\|Theme"
check "/kdl/projects/research-themes/machine-learning-ai/" "Theme detail" "article"
check "/kdl/about/partners-and-funders/" "Organisations index"   "Partner"
check "/kdl/about/partners-and-funders/kings-college-london/" "Organisation detail" "article"
check "/kdl/about/"                    "About"                   "about"
check "/kdl/search/"                   "Search"                  "search\|Search"
check "/kdl/contact-us/"               "Contact"                 "contact\|Contact"
check "/kdl/assets/stylesheets/main.css" "CSS"                  "body"

log ""
log "=== Summary ==="
log "$(printf "  Pass: %d  Fail: %d  Skipped: %d" "$PASS" "$FAIL" "$SKIP")"
log ""

if [ "$FAIL" -gt 0 ]; then
    log "[WARN] Some pages may have rendering issues."
fi

# Write report file
printf "%b" "$OUTPUT" > "$REPORT"

# Print to stdout
printf "%b" "$OUTPUT"

# macOS notification
if [ "$(uname)" = "Darwin" ]; then
    if [ "$FAIL" -gt 0 ]; then
        osascript -e "display notification \"${FAIL} page(s) failed, ${PASS} passed\" with title \"Page Check\" subtitle \"⚠ Some rendering issues\"" 2>/dev/null || true
    else
        osascript -e "display notification \"All ${PASS} pages passed\" with title \"Page Check\" subtitle \"✓ Rendering OK\"" 2>/dev/null || true
    fi
fi

echo "[INFO] Report saved to .page-check.report"
