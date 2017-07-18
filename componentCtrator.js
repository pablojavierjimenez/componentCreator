/**
 * CONSTANTS
 * TODO: crear una funcion que checkee si la carpeta ya existe
 */

/**
  * referencia: https://blog.raananweber.com/2015/12/15/check-if-a-directory-exists-in-node-js/
  *
  * function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    You could also add it to the String.prototype so you could chain it with other methods:

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
  */

const fs = require('fs');
const app = {};
var path = './';

if ( process.argv.length > 3 ) {
  var pathString = process.argv[3];
  var lastChar = pathString.substr(pathString.length - 1);
  if (lastChar != '/') {
    pathString = pathString + '/';
  }
  path = pathString;
}

/**
 * Full Camelize Name
 */
app.camelizeAll = function (string) {
  var str = string.split('-');
  var out ='';
  str.forEach(function (item,index,arr) {
    var uppercaseFirstLetter = item.substring(0, 1).toUpperCase();
    item = uppercaseFirstLetter + item.substring(1, item.length);
    out = out + item;
  });
  return out;
};

/**
 * Camelize Name
 */
app.camelize = function (string) {
  var out = string.split('-');
  var res = '';
  for(var i = 1; i < out.length; i++) {
    out[i] = out[i].charAt(0).toUpperCase() + out[i].substring(1, out[i].length);;
  }
  res = out.join('');
  return res;
};

/**
 * Creating a component DIRECTORY
 */
app.createDirectori = function (stringPath) {
  console.log(stringPath);
  var aaa = stringPath.split('/');
  console.log(aaa);

  fs.mkdir(stringPath, function (err) {
    console.log(err);
  });

};

app.fileName                = process.argv[2];
app.fileFullcamelizedName   = app.camelizeAll(app.fileName);
app.fileCamelizedName       = app.camelize(app.fileName);
app.componentPath           = path + app.fileCamelizedName;

app.fileNames = {
  component:  app.componentPath + "/" + app.fileCamelizedName + ".component.js",
  module:     app.componentPath + "/" + app.fileCamelizedName + ".module.js",
  test:       app.componentPath + "/" + app.fileCamelizedName + ".test.js",
  template:   app.componentPath + "/" + app.fileCamelizedName + ".tpl.html",
  style:      app.componentPath + "/_" + app.fileCamelizedName + ".scss",
};

app.fileContents = {
  template: `<section class="pbl_${app.fileCamelizedName}">\n\t New component ${app.fileCamelizedName.toUpperCase()}\n</section>`,
  style: `.pbl_${app.fileCamelizedName} {\n //Here you should put your Styles with a bit of padding\n background-color:#f00;\n height: 50vw;\n padding: 2em;\n width: 50vw;\n}`,
  component: ` angular.module('peyableApp')
    .component('${app.fileCamelizedName}', {
        templateUrl: '${app.fileCamelizedName}.tpl.html',
        controller: ${app.fileFullcamelizedName}Controller,
        bindings: {
            hero: '='
        }
    });

    function ${app.fileFullcamelizedName}Controller(a,b) {
        console.log('${app.fileFullcamelizedName}Controller cargada ;)');
        return a + b;
    }
    module.exports = ${app.fileFullcamelizedName}Controller;`,
  module: `angular.component("${app.fileCamelizedName}",[]) {\n}`,
  test: `const fun = require('./${app.fileCamelizedName}.component');
    test('${app.fileCamelizedName}:suma 1 + 2 to equal 3', () => {
        expect(fun(1, 2)).toBe(3);
        }
    );`
};

app.fileList = [
  {
    name: app.fileNames.template,
    content: app.fileContents.template
  },
  {
    name: app.fileNames.style,
    content: app.fileContents.style
  },
  {
    name: app.fileNames.component,
    content: app.fileContents.component
  },
  {
    name: app.fileNames.module,
    content: app.fileContents.module
  },
  {
    name: app.fileNames.test,
    content: app.fileContents.test
  }
];


app.createDirectori(app.componentPath);

/**
 * Creating a component FILES
*/
app.fileList.forEach((file, index, array) => {
  fs.writeFile(file.name, file.content, (err) => {
    if (err) throw err;
    console.log(file.name + ' It\'s saved!');
  });
});

/// esto va a ir commiteado 3 */
