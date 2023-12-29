import('lodash').then(({default: _}) => {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack']);
  document.body.appendChild(component());
});
