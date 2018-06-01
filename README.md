# element-inspector

## How to use

```sh
npm i element-inspector
```

```
import { startPick } from 'element-inspector'

startPick({
  onClick: (el) => console.log(el)
});
```

## Development

Link your library for local use

```
npm link

# change dir to your app that will use this lib, and run:
npm link <my-lib>
```

## Test

```
npm test
```

## Build

```
npm run build
```

## Publish

```
npm publish
```

## License

MIT

## Credits

Thanks for @jamesbechet for his work in https://github.com/jamesbechet/element-picker.
I modified it to suite my needs and some enhancements.
His work is attributed in `LICENSE` file.
