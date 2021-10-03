import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../out/Animal.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'Animal',
      accessModifier: 'public',
      docComment: ['The Animal class'],
      properties: [
        {
          name: 'name',
          typeName: 'String',
          accessModifier: 'private',
          docComment: ['The animal name'],
        },
      ],
    };

    // Java code writer
    const java = new JavaWriter(output);

    java.writeClassBlock(classDefinition, () => {
      // Properties
      (classDefinition.properties || []).forEach((p) => {
        java.writeProperty(p);
        java.writeLine();
      });
      // Write public method
      java.writeMethodBlock(
        {
          name: 'getName',
          returnTypeName: 'String',
          accessModifier: 'public',
        },
        () => {
          java.writeLine('// Code goes here.');
          java.writeLine('return name;');
        }
      );
    });
  }
);
