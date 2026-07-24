# Changelog

Wszystkie istotne zmiany w design systemie są dokumentowane w tym pliku.

Format opiera się na Keep a Changelog, a wersje stosują Semantic Versioning.

## [0.2.0] - 2026-07-25

### Added

- współdzielone pliki `logo-mark.svg`, `favicon.svg` i `og-image.svg`,
- wersjonowany manifest assetów wraz ze schematem JSON,
- testy dymne pakietu Flutter,
- walidacja minimalnej i aktualnej stabilnej wersji Fluttera,
- eksport assetów w pakiecie webowym.

### Changed

- minimalna wersja Fluttera została ustawiona na `3.32.0`,
- minimalna wersja Darta została ustawiona na `3.8.0`,
- dokumentacja instalacji używa wersjonowanych tagów zamiast branchy roboczych,
- walidacja sprawdza spójność wersji pakietu i manifestu assetów.

## [0.1.0] - 2026-07-25

### Added

- początkowy zestaw tokenów kolorów, wymiarów i typografii,
- gotowe eksporty CSS, JavaScript i TypeScript,
- pakiet Flutter z `PmColors`, `PmSpacing`, `PmRadius`, `PmSize` i `PmTheme`,
- dokument `UI_GUIDELINES.md`,
- podstawowa walidacja GitHub Actions.
