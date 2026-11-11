# Run using bin/ci

CI.run do
  step "Setup", "bin/setup --skip-server"

  step "Zeitwerk: eager load check", "bin/rails zeitwerk:check"
  step "Build: JavaScript bundle", "npm run build"

  step "Security: Gem audit", "bin/bundler-audit check --update"
  # Moderate uuid advisory via @devexpress/dx-react-grid-export -> exceljs has no upstream fix yet.
  step "Security: npm audit (production deps)", "npm audit --omit=dev --audit-level=high"

  # Optional: set a green GitHub commit status to unblock PR merge.
  # Requires the `gh` CLI and `gh extension install basecamp/gh-signoff`.
  # if success?
  #   step "Signoff: All systems go. Ready for merge and deploy.", "gh signoff"
  # else
  #   failure "Signoff: CI failed. Do not merge or deploy.", "Fix the issues and try again."
  # end
end
