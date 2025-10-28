# strdir

**Canonical URL:**  
[https://alexstevovich.com/r/strdir-nodejs](https://alexstevovich.com/r/strdir-nodejs)

<br>
Aggregates file contents in a directory into a string, with optional recursive walking and extension filtering.
<br>

## Usage

```js
import strdir from 'strdir';

// ─── Async Usage ───

const content = await strdir('./directory', {
    recursive: true,
    extensions: ['.txt'],
});
console.log(content); // Output: All .txt file contents in the directory

// ─── Sync Usage ───

const syncContent = strdir.sync('./directory', {
    recursive: true,
    extensions: ['.md'],
});
console.log(syncContent); // Output: All .md file contents in the directory
```

## Installation

```sh
npm install strdir
```

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
