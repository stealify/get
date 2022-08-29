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

export { createTemplate };
