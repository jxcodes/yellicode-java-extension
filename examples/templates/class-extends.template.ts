import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../out/Mammut.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'Mammut',
      extends: 'Animal',
      accessModifier: 'public',
      docComment: ['The Mammut class extends from Animal'],
    };

    // Java code writer
    const java = new JavaWriter(output);

    java.writeClassBlock(classDefinition, () => {
      java.writeLine('// Code goes here.');
    });
  }
);
