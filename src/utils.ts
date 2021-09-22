const reservedKeywords = [
  'abstract',
  'as',
  'base',
  'bool',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'checked',
  'class',
  'const',
  'continue',
  'decimal',
  'default',
  'delegate',
  'do',
  'double',
  'else',
  'enum',
  'event',
  'explicit',
  'extern',
  'false',
  'finally',
  'fixed',
  'float',
  'for',
  'foreach',
  'goto',
  'if',
  'implicit',
  'in',
  'int',
  'interface',
  'internal',
  'is',
  'lock',
  'long',
  'namespace',
  'new',
  'null',
  'object',
  'operator',
  'out',
  'override',
  'params',
  'private',
  'protected',
  'public',
  'readonly',
  'ref',
  'return',
  'sbyte',
  'sealed',
  'short',
  'sizeof',
  'stackalloc',
  'static',
  'string',
  'struct',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'uint',
  'ulong',
  'unchecked',
  'unsafe',
  'ushort',
  'using',
  'virtual',
  'void',
  'volatile',
  'while',
];
// https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
const javaPrimitiveTypes = [
  'byte',
  'short',
  'int',
  'long',
  'float',
  'double',
  'boolean',
  'char',
];
const javaClassTypes = ['String', 'Boolean', 'Integer', 'Long', 'Date'];
/**
 * Returns true if the input string is a reserved Java keyword.
 * @param input Any input string to check.
 */
export function isReservedKeyword(input: string): boolean {
  if (!input) return false;

  return reservedKeywords.indexOf(input) >= 0;
}
export function isValidJavaType(input: string): boolean {
  if (!input) return false;

  return (
    javaPrimitiveTypes.indexOf(input) >= 0 || javaClassTypes.indexOf(input) >= 0
  );
}
export function getCapitalezedCamelCase(str: string): string {
  if (!str) {
    return '';
  }
  let out = str
    .replace(/_.{1}/g, (letter) => letter.toUpperCase())
    .replace(/_/g, '')
    .replace(/^.{1}/, (letter) => letter.toUpperCase());
  return out;
}
