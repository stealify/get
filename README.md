# get
A Component that allows getting files with a predefined schema used to download platform depenedent stuff
```js
// (createTemplate`${0} ${'foo'}!`)('Hello', {foo: 'World'}); // "Hello World!"
const createTemplate = (strings, ...keys) => 
  (...values) => {
    const dict = (values[values.length - 1] || {});
    const result = [strings[0]];
    keys.forEach((key, i) =>
      result.push(Number.isInteger(key) 
        ? values[key] : dict[key], strings[i + 1])
    );
    return result.join('');
  };


const gitHubReleaseTemplate = createTemplate`https://github.com/${'name'}/${'name'}/releases/download/${'version'}/${'name'}-${'version'}-${'platform'}-${'arch'}.zip`;



//getPartsFromUrl(new URL(url), "v5.0.5")
const getElectronGetExampleLikePartsFromUrl = (url, version) => ({ 
  mirror: url.pathname.split(`${version}/`)[0], customDir: `${version}/`, customFilename: url.pathname.split(`${version}/`)[1] 
})(new URL(url))


const electronGetTemplate = ({ name, version }) => [ 
  // Using the github Template to generate the electron Url that we transform 
  // into arrguments for our Electron like version of the template.
  getElectronGetExampleLikePartsFromUrl( gitHubReleaseTemplate({ 
    name, version, platform: process.platform, arch: process.arch 
  }), version)
].map((electronGetLikeObject) => (
  createTemplate`${'mirror'}/${'customDir'}/${'customFileName'}`)(electronGetLikeObject)
)[0];

console.log(gitHubReleaseTemplate({ 
  name: "electron", version: "v5.1.12", platform: process.platform, arch: process.arch 
}))
// same 
electronGetTemplate("electron", "v4.0.4")

//(createTemplate`${'mirror'}/${'customDir'}/${'customFileName'}`)({mirror, })
// https://github.com/electron/electron/releases/download/v4.0.4/electron-v4.0.4-linux-x64.zip
// |                                                     |       |                           |
// -------------------------------------------------------       -----------------------------
//                         |                                                   |
//               mirror / nightlyMirror                  |    |         customFilename
//                                                        ------
//                                                          ||
//                                                       customDir
// ```

```
