import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../code/Person.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'Person',
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
          defaultValue: 'Pepe',
        },
        {
          name: 'apellido',
          typeName: 'String',
          accessModifier: 'private',
        },
        {
          name: 'edad',
          typeName: 'Integer',
          accessModifier: 'private',
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
      // Write setters
      java.writeSetterMethod({ name: 'nombre', typeName: 'String' });
      java.writeSetterMethod({ name: 'apellido', typeName: 'String' });
      java.writeSetterMethod({ name: 'edad', typeName: 'Integer' });
      // Write getters
      java.writeGetterMethod({ name: 'nombre', typeName: 'String' });
      java.writeGetterMethod({ name: 'apellido', typeName: 'String' });
      //
      java.writeGetterMethod({ name: 'edad', typeName: 'Integer' });
      java.writeGetterMethod({ name: 'nEdad', typeName: 'Integer' });
      java.writeGetterMethod({ name: 'edad', typeName: 'Integer' }, 'nEdad');
    });
  }
);
