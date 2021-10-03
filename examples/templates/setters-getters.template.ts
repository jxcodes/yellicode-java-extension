import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../out/Person.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'Person',
      accessModifier: 'public',
      docComment: ['The person class'],
      properties: [
        {
          name: 'name',
          typeName: 'String',
          accessModifier: 'private',
          defaultValue: 'Pepe',
        },
        {
          name: 'lastName',
          typeName: 'String',
          accessModifier: 'private',
        },
        {
          name: 'age',
          typeName: 'Integer',
          accessModifier: 'private',
        },
      ],
    };

    // Java code writer
    const java = new JavaWriter(output);

    java.writeClassBlock(classDefinition, () => {
      // Properties
      java.writeLine('// Properties');
      (classDefinition.properties || []).forEach((p) => {
        java.writeProperty(p);
        java.writeLine();
      });
      // Write setters
      java.writeLine('// Setters');
      (classDefinition.properties || []).forEach((p) => {
        java.writeSetterMethod(p);
        java.writeLine();
      });
      // Write getters
      java.writeLine('// Getters');
      (classDefinition.properties || []).forEach((p) => {
        java.writeGetterMethod(p);
        java.writeLine();
      });
    });
  }
);
