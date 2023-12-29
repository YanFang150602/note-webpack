// - import _ from 'lodash';
import { cube } from './math.js'

function component() {
  // - const element = document.createElement('div');
  const element = document.createElement('pre');

  // - lodash（目前通过一个 script 引入）对于执行这一行是必需的
  // +- lodash 在当前 script 中使用 import 引入
  // - element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = [
     'Hello webpack!',
     '5 cubed is equal to ' + cube(5)
   ].join('\n\n');

  return element;
}

document.body.appendChild(component());
