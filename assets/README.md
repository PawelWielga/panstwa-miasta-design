# Wspólne zasoby

Ten katalog jest docelowym źródłem grafik, dźwięków i fontów używanych przez więcej niż jedno repozytorium.

## Docelowa struktura

```text
assets/
├── branding/
│   ├── app-icon.png
│   ├── app-icon-full.png
│   └── banner.png
├── illustrations/
├── icons/
├── audio/
│   └── sfx/
└── fonts/
```

## Aktualne zasoby do przeniesienia

W aplikacji Flutter znajdują się obecnie:

```text
assets/branding/app_icon.png
assets/branding/app_icon_full.png
assets/branding/banner_1.png
assets/audio/sfx/
```

Pliki binarne powinny zostać przeniesione do tego repozytorium w osobnym commicie, a następnie usunięte z repozytoriów aplikacji dopiero po podłączeniu nowej zależności.

## Zasady

1. Przechowuj pliki źródłowe w najwyższej dostępnej jakości.
2. Preferuj SVG dla ikon, logo i prostych ilustracji.
3. Nie edytuj ręcznie plików wynikowych generowanych z pliku źródłowego.
4. Nazwy plików zapisuj małymi literami w `kebab-case`.
5. Zmiana istniejącego zasobu wymaga wpisu w `CHANGELOG.md` po utworzeniu pierwszego wydania.
6. Zasób zależny wyłącznie od jednej platformy powinien pozostać w repozytorium tej platformy.
