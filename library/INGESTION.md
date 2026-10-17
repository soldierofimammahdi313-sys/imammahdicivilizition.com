# Grand Library ingestion foundation

This directory is a source-tracked starting point for a real digital Islamic library.

## Important status
The catalog records candidate source locations and validation requirements. It does **not** mean full texts have already been downloaded, checked, or published. Entries marked `source_required` must remain visibly incomplete in the user interface until ingestion and validation succeed.

## Required ingestion workflow
1. Fetch source data from its canonical repository or publisher; record exact URL, version/commit, retrieval date, language, editor/translator, and license.
2. Confirm the license permits redistribution and website display. A publicly accessible GitHub repository is not automatically public domain or freely redistributable.
3. Preserve the source's structure and identifiers (surah/ayah, hadith number, sermon/letter/saying, volume/page).
4. Validate completeness against source counts/checksums where available; reject truncated or malformed imports.
5. Store normalized records separately from UI components. Never replace a complete text with generated summaries.
6. Display provenance, edition, translator, license, and a report-an-error action on every text page.
7. Add tests for record counts, duplicate identifiers, missing chapters, language metadata, and source attribution.
8. Only mark a record `published` after automated validation and editorial review.

## Suggested normalized text record
`work_id, section_id, item_number, language, text, source_url, source_version, edition, translator, license, attribution, verification_status`.

## Safety and integrity
- Do not fabricate religious text, citations, hadith grades, translators, page numbers, or licenses.
- Keep school/tradition-specific metadata transparent and respectful.
- Use public-domain or explicitly licensed editions where possible; obtain permission for copyrighted translations.
- Keep the current website untouched until the actual application source and route wiring are available and verified.
