
## Getting Started

(1)
pnpm 은 기본적으로 글로벌 store 에 모든 패키지 보관

pnpm store path 

ex) /user/~~~~~~~/store/v3

(2)

zip or tar 파일로 묶어서 오프라인 서버에 복사.

ex) rsync -a /Users/yourname/Library/pnpm/store/v3 ./pnpm-store
ex) tar czf pnpm-store.tar.gz /Users/yourname/Library/pnpm/store/v3

(3) 오프라인 환경에서 pnpm store 설정

```bash
  pnpm install --offline --store-dir ./pnpm-store
```


인터넷 가능 환경에서 먼저 작업

```bash
  pnpm install
  pnpm fetch
  pnpm store export './offline-pkgs'
```

이후 오프라인 서버로 offline-pkgs 디렉토리 복사

오프라인 환경에서
```bash
pnpm install --offline --store-dir ./offline-pkgs
```

