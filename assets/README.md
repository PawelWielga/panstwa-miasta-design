# Wspólne zasoby

Ten katalog jest źródłem grafik używanych przez więcej niż jedno repozytorium projektu **Państwa Miasta**.

## Aktualna struktura

```text
assets/
├── branding/
│   ├── favicon.svg
│   ├── logo-mark.svg
│   └── og-image.svg
├── manifest.json
└── manifest.schema.json
```

`manifest.json` zapewnia stabilne, semantyczne nazwy zasobów. Aplikacje nie powinny zgadywać nazw plików ani przeszukiwać katalogu.

## Własność zasobów

Współdzielone są przede wszystkim źródłowe materiały identyfikacji wizualnej, które mają zastosowanie na kilku platformach.

Nie każdy plik musi zostać fizycznie przeniesiony do tego repozytorium. Zasoby zależne od konkretnego procesu budowania mogą pozostać przy platformie, dopóki nie ma co najmniej dwóch realnych konsumentów. Dotyczy to obecnie:

```text
PawelWielga/panstwa-miasta:assets/branding/app_icon.png
PawelWielga/panstwa-miasta:assets/branding/app_icon_full.png
PawelWielga/panstwa-miasta:assets/branding/banner_1.png
PawelWielga/panstwa-miasta:assets/audio/sfx/
```

Ich właściciel jest zapisany w sekcji `platformOwned` manifestu. Zapobiega to tworzeniu niezsynchronizowanych kopii bez korzyści dla innych aplikacji.

## Zasady

1. Przechowuj źródła w najwyższej dostępnej jakości.
2. Preferuj SVG dla logo, ikon i prostych ilustracji.
3. Używaj nazw w `kebab-case`.
4. Nie podmieniaj znaczenia istniejącej semantycznej nazwy w manifeście.
5. Usunięcie lub zmiana ścieżki istniejącego assetu jest zmianą niekompatybilną.
6. Zmiana publicznego assetu wymaga wpisu w `CHANGELOG.md`.
7. Repozytoria konsumenckie powinny przypinać wersję tagiem lub pełnym SHA.
