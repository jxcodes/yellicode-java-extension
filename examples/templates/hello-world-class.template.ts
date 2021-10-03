import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../out/HelloWold.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'HelloWold',
      accessModifier: 'public',
      docComment: ['A fully generated HelloWorld class'],
      properties: [
        {
          name: 'message',
          typeName: 'String',
          accessModifier: 'private',
          docComment: ['A simple message'],
          isStatic: true,
          defaultValue: 'Hi developer!',
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
      // Main method
      java.writeMainMethod(() => {
        java.writeLine('System.out.println(HelloWold.message);');
      });
    });
  }
);
