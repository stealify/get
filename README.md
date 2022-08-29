# get
A Component that allows getting files with a predefined schema used to download platform depenedent stuff

### NodeJS Template
```js

const getNodeJSTemplate = createTemplate`https://nodejs.org/dist/${'version'}/node-${'version'}-${'platform'}-${'arch'}.zip`
getNodeJSTemplate({ version: "v16.17.0", platform: "win", arch: "x86"}) // https://nodejs.org/dist/v16.17.0/node-v16.17.0-win-x86.zip
fetch(getNodeJSTemplate({ version: "v16.17.0", platform: "win", arch: "x86"})) // fetchResponse!
```


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
const getElectronGetExampleLikePartsFromUrl = ((url, version) => ({ 
  mirror: url.pathname.split(`${version}/`)[0], customDir: `${version}/`, customFilename: url.pathname.split(`${version}/`)[1] 
}))(
  { url: new URL(url), version }
)


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
