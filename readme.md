# default-uid

> Get the system default [UID *(User ID)*](http://www.linfo.org/uid.html)

## Install

```
$ npm install default-uid
```

## Usage

```js
import defaultUid from 'default-uid';

// On macOS
defaultUid();
//=> 501

defaultUid('linux');
//=> 1000
```

## API

### defaultUid(platform?)

#### platform

Type: `string`\
Default: `process.platform`

One of the [supported Node.js platforms](https://nodejs.org/api/process.html#process_process_platform).
