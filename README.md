## Tombala

## Kurulum

socket.js içindeki sunucu adresini tanımla

```
const socket = io('http://localhost:5200');
```

npm modullerini yükle

```
npm install
```

dev modunda çalıştır

```
npm run dev
```

## Oynanış

Oyunu yönetmek için clientlardan biri yönetici olmak durumunda.

- Oyuna girişte 'Yönetici olarak başla' seçeneğini seç.

Diğer clientlar oyuncu olarak giriş yapabilmek için:

- önce kullancı adı ve bir anahtar kodu seçip giriş yapar.
- Yöneticinin paylaştığı 'Oyun Kodu' bilgisini girip, oyuncu olur

Tüm oyuncular giriş yaptıktan sonra yönetici oyunu başlatır ve sayı çekmeye başlar.

Oyun bitmeden bağlantısı kopan oyuncu oyundan atılmaz, tekrar bağlanıp kaldığı yerden devam edebilir.

Bir kazanan olduğu an oyun biter.
