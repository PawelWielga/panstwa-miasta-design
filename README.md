# Państwa Miasta Design

Wspólne źródło prawdy dla identyfikacji wizualnej gry **Państwa Miasta**.

Repozytorium obsługuje:

- aplikację Flutter `PawelWielga/panstwa-miasta`,
- grę przeglądarkową `PawelWielga/panstwa-miasta-play`,
- landing page `PawelWielga/panstwa-miasta-website`.

## Co jest źródłem prawdy

Edytowalne wartości znajdują się w:

```text
tokens/colors.json
tokens/layout.json
tokens/typography.json
assets/manifest.json
assets/branding/
docs/UI_GUIDELINES.md
```

Pliki w `dist/` oraz podstawowe klasy tokenów w `packages/flutter/` są generowane z wartości w `tokens/`. Nie należy edytować ich ręcznie.

Pierwsza wersja została odtworzona z aplikacji Flutter, głównie z `app_colors.dart`, `app_theme.dart` oraz ekranów używających wspólnych wymiarów. Od wersji `0.2.0` to repozytorium jest nadrzędnym źródłem wspólnych zasad UI.

Aktualny niezmienny punkt wydania `0.2.0`:

```text
e28d643a2cc10eb2e47f55f82e8252485674ec2f
```

## Struktura

```text
tokens/                    edytowalne tokeny
dist/                      generowany CSS oraz eksporty JS/TS
assets/branding/           współdzielone pliki źródłowe SVG
assets/manifest.json       stabilne nazwy i ścieżki assetów
packages/flutter/          pakiet Flutter
scripts/build.mjs          generator plików platformowych
docs/UI_GUIDELINES.md      zasady projektowania interfejsu
```

## Webowa gra

Zależność Git przypięta do pełnego SHA:

```json
{
  "dependencies": {
    "@pawelwielga/panstwa-miasta-design": "github:PawelWielga/panstwa-miasta-design#e28d643a2cc10eb2e47f55f82e8252485674ec2f"
  }
}
```

Import CSS:

```css
@import "@pawelwielga/panstwa-miasta-design/tokens.css";
```

Import TypeScript:

```ts
import { colors, dimensions } from "@pawelwielga/panstwa-miasta-design/tokens";
```

## Statyczny landing page

Landing page bez procesu npm powinien przechowywać lokalną kopię `dist/tokens.css`, przypiętą w metadanych do konkretnego tagu lub pełnego SHA. Nie należy pobierać tokenów z brancha `main` podczas działania strony.

Przykładowa kolejność arkuszy:

```html
<link rel="stylesheet" href="design-tokens.css">
<link rel="stylesheet" href="styles.css">
```

Własne zmienne landing page mogą wskazywać na tokeny:

```css
:root {
  --primary: var(--pm-color-primary);
  --background: var(--pm-color-background);
  --surface: var(--pm-color-surface);
  --text: var(--pm-color-text-primary);
}
```

## Flutter

```yaml
dependencies:
  panstwa_miasta_design:
    git:
      url: https://github.com/PawelWielga/panstwa-miasta-design.git
      ref: e28d643a2cc10eb2e47f55f82e8252485674ec2f
      path: packages/flutter
```

```dart
import 'package:panstwa_miasta_design/panstwa_miasta_design.dart';

MaterialApp(theme: PmTheme.lightTheme);
```

Pakiet wymaga Fluttera `>=3.32.0` i Darta `>=3.8.0`, ponieważ używa typów aktualnego Material 3, w tym `CardThemeData`.

## Assety

Stabilne ścieżki są zapisane w `assets/manifest.json`. Współdzielone pliki źródłowe powinny być wektorowe, gdy tylko format SVG jest wystarczający.

Pliki zależne od procesu budowania konkretnej platformy, takie jak rozmiary ikon Androida lub dźwięki używane wyłącznie przez aplikację Flutter, mogą pozostać w repozytorium platformy. Manifest wskazuje ich bieżącego właściciela, żeby nie tworzyć niekontrolowanych kopii.

## Wprowadzanie zmian

1. Edytuj wartości w `tokens/*.json` lub źródłowe pliki w `assets/`.
2. Uruchom generator:

```bash
npm run build
```

3. Sprawdź zmienione pliki dla webu i Fluttera.
4. Uzupełnij `CHANGELOG.md`, gdy zmienia się publiczny token lub asset.
5. Uruchom pełną walidację:

```bash
npm test
```

`npm run build:check` nie zapisuje plików. Kończy się błędem, gdy którykolwiek generowany plik jest nieaktualny względem `tokens/*.json`.

## Zasady

1. Nie wpisuj wspólnych kolorów i wymiarów ręcznie w aplikacjach.
2. Nie edytuj ręcznie plików generowanych w `dist/`, `colors.dart` ani `dimensions.dart`.
3. Nie odwołuj aplikacji produkcyjnych do ruchomego brancha `main`. Używaj tagu lub pełnego SHA.
4. Zmiany niekompatybilne wydawaj jako nową wersję główną SemVer.
5. Każda zmiana publicznego assetu lub tokenu wymaga wpisu w `CHANGELOG.md`.

## Walidacja Fluttera

```bash
cd packages/flutter
flutter pub get
flutter analyze
flutter test
```

GitHub Actions sprawdza aktualność generowanych plików, tokeny webowe, manifest assetów oraz pakiet Flutter na minimalnej wspieranej i aktualnej stabilnej wersji Fluttera.
