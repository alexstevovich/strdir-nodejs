# strdir

**Canonical URL:**  
[https://alexstevovich.com/a/strdir-nodejs](https://alexstevovich.com/a/strdir-nodejs)

**Software URL:**  
[https://midnightcitylights.com/software/strdir-nodejs](https://midnightcitylights.com/software/strdir-nodejs)

Aggregates file contents in a directory into a string, with optional recursive walking and extension filtering.

---

## Installation

```sh
npm install strdir
```

## Example

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

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
