# default-uid

> Get the system default [UID *(User ID)*](http://www.linfo.org/uid.html)


## Install

```
$ npm install --save default-uid
```


## Usage

```js
const defaultUid = require('default-uid');

// on macOS

defaultUid();
//=> 501

defaultUid('linux');
//=> 1000
```


## API

### defaultUid([platform])

#### platform

Type: `string`<br>
Default: `process.platform`

One of the [supported Node.js platforms](http://nodejs.org/api/process.html#process_process_platform).


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
