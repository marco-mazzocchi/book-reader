# Book Reader (book-reader)

Listen to audiobook

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev -m capacitor -T android
```

### Lint the files

```bash
npm run lint
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Update app icons

Create square png of ~1024px then execute

```bash
icongenie generate -i [path-to-png] --skip-trim
```

### Build the app

```bash
quasar build -m capacitor -T android
```

```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore dist/capacitor/android/apk/release/app-release-unsigned.apk alias_name
```

Change target file version each time (also in `package.json`)

```bash
~/Library/Android/sdk/build-tools/29.0.2/zipalign -v 4 dist/capacitor/android/apk/release/app-release-unsigned.apk bookReader_0.2.1.apk
```

Move generated file to `dist/apk`