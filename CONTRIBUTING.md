# Contributing

PRs are welcomed, please submit them on [Github](https://github.com/domdomegg/halifax-share-dealing-sdk/pulls).

Install dependencies with `npm install`

Uses Jest for tests - run `npm run test` to run them.

Uses JavaScript Standard Style - run `npm run lint` to view issues, and `npm run lint:fix` to automagically fix them.

A useful pre-commit hook (save as `.git/hooks/pre-commit`) to ensure the tests pass, the code is formatted correctly and you haven't accidentally left your personal details in is (change 000123456 to your account code or other personal data you want to search for):

```sh
#!/bin/sh
npm run test && npm run lint && ! grep --exclude=pre-commit -r '000123456' .
```

Warning: It is still possible to commit your data if you stage it, delete it and then commit. Please be careful!

## Releases

Versions follow the [semantic versioning spec](https://semver.org/). Use `npm version <major | minor | patch>` to bump the version, then push. Ensure you have set follow tags option to true with `git config --global push.followTags true`. GitHub actions will then pick it up and handle the actual publishing to the NPM registry.