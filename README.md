# Państwa Miasta Design

Wspólne źródło prawdy dla identyfikacji wizualnej gry **Państwa Miasta**.

Repozytorium jest przeznaczone dla:

- aplikacji Flutter,
- gry przeglądarkowej w TypeScript/CSS,
- landing page.

## Aktualne źródło wartości

Pierwsza wersja została odtworzona z repozytorium `PawelWielga/panstwa-miasta`, przede wszystkim z:

- `lib/src/core/theme/app_colors.dart`,
- `lib/src/core/theme/app_theme.dart`,
- ekranów używających szerokości treści, odstępów i wysokości kontrolek.

Stan bazowy: branch `main`, commit `c66ff50a709d28535ab88f8aab3de57fdc2db36b`.

Od momentu wdrożenia tego repozytorium nowe wartości wspólne należy najpierw zmieniać tutaj, a następnie aktualizować zależność w aplikacjach.

## Struktura

```text
tokens/                  edytowalne źródła wartości
dist/                    gotowe pliki dla aplikacji WWW
packages/flutter/        pakiet współdzielony przez Flutter
assets/                   wspólne grafiki, dźwięki i fonty
docs/UI_GUIDELINES.md    zasady projektowania interfejsu
scripts/                 walidacja repozytorium
```

## Web i landing page

CSS:

```css
@import "@pawelwielga/panstwa-miasta-design/tokens.css";
```

JavaScript lub TypeScript:

```ts
import { colors, dimensions } from "@pawelwielga/panstwa-miasta-design/tokens";
```

Do czasu pierwszego wydania pakiet można podłączyć bezpośrednio z GitHub:

```json
{
  "dependencies": {
    "@pawelwielga/panstwa-miasta-design": "github:PawelWielga/panstwa-miasta-design#chore/bootstrap-design-system"
  }
}
```

## Flutter

```yaml
dependencies:
  panstwa_miasta_design:
    git:
      url: https://github.com/PawelWielga/panstwa-miasta-design.git
      ref: chore/bootstrap-design-system
      path: packages/flutter
```

```dart
import 'package:panstwa_miasta_design/panstwa_miasta_design.dart';

MaterialApp(theme: PmTheme.lightTheme);
```

## Zasady zmian

1. Nie wpisuj wspólnych kolorów i wymiarów ręcznie w aplikacjach.
2. Edytuj pliki w `tokens/`.
3. Utrzymuj zgodność plików w `dist/` oraz pakietu Flutter.
4. Nie edytuj wygenerowanych lub dystrybuowanych plików bez równoczesnej zmiany tokenów.
5. Większe zmiany wizualne opisuj w Pull Request.
6. Wydania oznaczaj tagami SemVer, na przykład `v0.1.0`.

## Walidacja

```bash
npm test
```

Workflow GitHub Actions sprawdza poprawność JSON, zgodność głównych kolorów i analizę pakietu Flutter.
