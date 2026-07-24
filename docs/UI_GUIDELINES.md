# Zasady UI gry Państwa Miasta

Dokument opisuje wspólne reguły dla aplikacji Flutter, gry WWW i landing page. Platformy mogą mieć inne układy, ale powinny korzystać z tych samych kolorów, typografii, promieni, odstępów i charakteru wizualnego.

## 1. Charakter interfejsu

Interfejs ma być:

- prosty i czytelny dla dzieci oraz dorosłych,
- lekki wizualnie, bez zbędnych dekoracji,
- oparty na jasnym tle i białych powierzchniach,
- jednoznaczny: najważniejsza akcja jest zawsze najbardziej widoczna,
- dostępny przy zwiększonym rozmiarze tekstu.

Aktualny motyw jest jasny i bazuje na Material 3. Ciemny motyw nie jest jeszcze częścią systemu.

## 2. Kolory

Używaj nazw semantycznych, a nie wartości HEX wpisywanych bezpośrednio w komponentach.

| Rola | Wartość | Zastosowanie |
|---|---:|---|
| Primary | `#1565C0` | główne przyciski, aktywny stan, fokus |
| Accent | `#FFC107` | wyróżnienia i elementy drugorzędne |
| Background | `#F8FAFC` | tło ekranów |
| Surface | `#FFFFFF` | karty, pola i panele |
| Text primary | `#0F172A` | nagłówki, ważne etykiety |
| Text secondary | `#64748B` | opisy, podpowiedzi i metadane |
| Border | `#CBD5E1` | obramowania i separatory |
| Success | `#2E7D32` | poprawna odpowiedź i sukces |
| Warning | `#FB8C00` | ostrzeżenie lub duplikat |
| Error | `#D32F2F` | błędna odpowiedź i błąd |
| Ranking silver | `#94A3B8` | drugie miejsce |
| Ranking bronze | `#CD7F32` | trzecie miejsce |

Nie używaj koloru jako jedynego nośnika informacji. Status powinien mieć również tekst, ikonę albo jednoznaczny kształt.

## 3. Typografia

Aktualna aplikacja korzysta z domyślnego fontu systemowego platformy. Nie wprowadzaj własnej rodziny fontów tylko w jednym kliencie.

Zalecane grubości:

- `700`: główne nagłówki i najważniejsze CTA,
- `600`: etykiety przycisków, elementy nawigacyjne i metadane,
- `400`: zwykły tekst oraz opisy.

Tekst podstawowy nie powinien być mniejszy niż `14 px`. Kontrolki muszą poprawnie działać przy zwiększeniu skali tekstu.

## 4. Odstępy

Podstawowa siatka wynosi `4`.

Dozwolone wartości:

```text
4, 8, 12, 16, 20, 24, 28, 32, 40, 48
```

Najczęstsze zastosowania:

- `8`: mały odstęp wewnątrz zwartej grupy,
- `12`: odstęp między sąsiednimi kontrolkami,
- `16`: standardowy padding karty,
- `24`: padding ekranu,
- `32`: oddzielenie większych sekcji.

## 5. Promienie zaokrągleń

- `8`: małe elementy interaktywne,
- `14`: pola formularzy,
- `16`: karty, główne przyciski i grafiki,
- `24`: chipy i elementy o kapsułowym kształcie.

Nie dodawaj nowych wartości bez uzasadnienia i aktualizacji tokenów.

## 6. Przyciski

Główna akcja:

- wypełniona kolorem Primary,
- biały tekst,
- grubość tekstu `700` na głównych ekranach,
- promień `16`,
- wysokość zwykle `54` lub `58`,
- ikona może wspierać etykietę, ale jej nie zastępuje.

Akcja drugorzędna:

- tekst lub obrys,
- tekst Primary albo Text secondary zależnie od hierarchii,
- obramowanie kolorem Border.

Na jednym ekranie unikaj kilku konkurujących przycisków głównych.

## 7. Karty, pola i panele

Karta:

- Surface,
- brak cienia w podstawowym stylu,
- obramowanie `1 px` kolorem Border,
- promień `16`.

Pole formularza:

- Surface,
- promień `14`,
- standardowe obramowanie Border,
- fokus Primary o szerokości `2 px`.

Chip:

- promień `24`,
- Surface w stanie zwykłym,
- Primary w stanie zaznaczonym.

## 8. Układ

Ekrany formularzy i ekran startowy aplikacji Flutter używają maksymalnej szerokości treści `420`.

Dla WWW:

- nie rozciągaj formularzy i głównych paneli na całą szerokość dużego monitora,
- zachowuj ten sam rytm odstępów co w aplikacji,
- landing page może być szerszy, ale komponenty gry powinny pozostać zwarte.

Standardowy padding ekranu wynosi `24`.

## 9. Animacje i informacja zwrotna

- Animacje powinny być krótkie i wspierać zrozumienie stanu.
- Nie używaj agresywnego migania.
- Aktualny motyw Flutter wyłącza domyślny splash przycisków.
- Dźwięk jest uzupełnieniem, nie jedynym potwierdzeniem działania.

## 10. Dostępność

- Zachowuj kontrast tekstu i kontrolek.
- Każda ikona interaktywna wymaga etykiety lub tooltipa.
- Elementy dotykowe powinny mieć co najmniej około `48 × 48`.
- Układ nie może się rozpadać po zwiększeniu tekstu.
- Informacje o błędzie zapisuj prostym językiem i wskazuj sposób naprawy.

## 11. Czego nie współdzielimy

Repozytorium nie narzuca wspólnego kodu komponentów pomiędzy Flutterem i WWW. Współdzielone są zasady oraz tokeny. Każda platforma implementuje własne komponenty zgodnie ze swoim środowiskiem.
