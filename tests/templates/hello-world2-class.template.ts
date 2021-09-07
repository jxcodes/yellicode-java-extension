import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../code/Persona.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'Persona',
      accessModifier: 'public',
      docComment: [
        'Nueva clase generada con yellicode, representa una persona',
      ],
      properties: [
        {
          name: 'nombre',
          typeName: 'String',
          accessModifier: 'private',
          docComment: ['Nombre de la persona'],
          isStatic: true,
          defaultValue: 'Pepe',
        },
        {
          name: 'apellido',
          typeName: 'String',
          accessModifier: 'public',
        },
        {
          name: 'edad',
          typeName: 'Integer',
          accessModifier: 'public',
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
        java.writeLine('System.out.println(Persona.nombre);');
      });
    });
  }
);
