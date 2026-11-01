# Grand Library implementation contract

## Current repository limitation
The verified `main` tree has 54 paths but no `package.json`, lockfile, TanStack route tree, database migrations, or database configuration. The app shown in the screenshot is therefore not represented by a complete buildable application in this branch. Do not invent routes or run a production migration until the correct application source is restored/identified.

## Data model
Use normalized records rather than a description-only JSON catalogue:
- works: slug, title/title_original, authors/editors/translators, category, languages, edition, publisher/year, moderation_status, content_status
- provenance: source_url, source_type, exact commit/release, retrieval timestamp, licence name/URL, permission evidence, attribution, checksum
- sections: work_id, stable source section key, parent section, title, order, page range
- text_items: section_id, language, item key/number, body, direction, source page, OCR confidence, validation status, checksum
- import_jobs: source URL, metadata preview, licence evidence, validation report, reviewer, moderation state, resulting work
- reader_progress and annotations: user_id, work_id, section/item, progress, bookmark/highlight/note

Suggested categories: Quran, Hadith, Tafsir, Seerah, Ahl al-Bayt, Fiqh, Duas, Islamic History, Philosophy, Manuscripts, Rare Books, Other.

## Import approval state machine
submitted -> metadata-reviewed -> license-review -> content-validation -> approved -> published.
Any stage can become needs-correction or rejected. A publicly accessible GitHub repository is not automatically redistributable. Each text, translation, scan, OCR transcription, and cover must have independently verified rights. Unknown rights must block publication.

## Import validation
- HTTPS-only allowlisted source hosts; reject localhost/private IPs and redirects to private networks (SSRF prevention).
- Preview metadata before import; never execute repository scripts.
- Record exact source version/commit, retrieval date, author/editor/translator, edition, language, licence and attribution.
- Deduplicate by upstream ID, normalized URL and content checksum without merging different editions silently.
- Validate UTF-8, non-empty sections, ordered/stable identifiers, expected item counts, duplicate keys, broken references and OCR confidence.
- Hold OCR below 0.92 confidence for human review by default.
- Require explicit admin approval and retain reviewer/audit trail before publication.

## Reader routes to implement after source restoration
- /library: categories and full-text search
- /library/$slug: work metadata, table of contents, licence/source and reader entry
- /library/$slug/read/$section: chapter reader, previous/next, citations, RTL/LTR and font controls
- /library/rare-books: only rights-verified rare works
- /admin/library/import: admin-only URL preview, rights evidence, validation, duplicate check and approval

## Security
Public visitors may read only published works and text. Admin imports/moderation require server-verified admin identity. Reader progress and annotations must be scoped to the authenticated user. Enable and test database RLS before release. Never expose service-role keys in client code.

## Acceptance tests
1. Metadata-only entries never appear as full-text books.
2. Unknown or incompatible licence blocks publication.
3. Duplicate source/checksum is flagged.
4. Low-confidence OCR requires review.
5. Public users cannot fetch draft content.
6. User A cannot read/update User B's notes or progress.
7. Arabic/Urdu/Persian render RTL without reversing text; English renders LTR.
8. Public work/section routes have unique title, description and canonical URL; admin and unpublished routes are noindex.
9. Import is repeatable and idempotent; failed imports roll back cleanly.

## Status
This document is a technical contract, not a claim that the application routes, database, bulk import UI, or reader have been implemented. No full texts are marked imported until the source, rights, completeness, and integrity checks have passed.
