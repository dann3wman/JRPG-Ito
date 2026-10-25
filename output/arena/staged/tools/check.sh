#!/usr/bin/env bash
# Every fast check, in the order CI runs them. Run before committing a change to index.html,
# the rig viewer, the design doc or the tools.
#
#   tools/check.sh           data check, reference freshness, a short simulator smoke run
#   tools/check.sh --full    also a 100-run simulation of every encounter, compared to the baseline
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== data check"
node tools/data-check/check.js --quiet

echo "== game data reference"
node tools/data-export/export.js --check

echo "== battle simulator smoke run (every encounter, 5 battles each)"
node tools/battle-sim/sim.js -n 5 --strict > /dev/null
echo "every encounter ran to a result"

if [[ "${1:-}" == "--full" ]]; then
  echo "== balance against baseline"
  node tools/battle-sim/sim.js -n 100 --baseline
fi
