import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, InterfaceDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../out/InterfazDeclarationExample.java' },
  (output: TextWriter) => {
    const ineterfaceDefinition: InterfaceDefinition = {
      name: 'InterfazDeclarationExample',
      accessModifier: 'public',
      docComment: ['A fully generated Interface'],
    };

    // Java code writer
    const java = new JavaWriter(output);

    java.writeInterfaceBlock(ineterfaceDefinition, () => {
      // Basic method
      java.writeMethodDeclaration({
        name: 'basicMethod',
        returnTypeName: `String`,
      });
      // Whit parameters
      java.writeMethodDeclaration({
        name: 'withParameters',
        returnTypeName: `String`,
        parameters: [
          { name: 'param1', typeName: 'String' },
          { name: 'param2', typeName: 'Integer' },
        ],
      });
      // Method that throws exceptions
      java.writeMethodDeclaration({
        name: 'withExecptions',
        returnTypeName: `String`,
        throws: ['Exception'],
      });
      // Method with public modifier
      java.writeMethodDeclaration({
        isPublic: true,
        name: 'whitPublicModifier',
        returnTypeName: `String`,
      });
      // Method with public modifier
      java.writeMethodBlock(
        {
          isDefault: true,
          name: 'whitDefultMethodImlementation',
          returnTypeName: `void`,
        },
        () => {
          java.writeLine('// Write your code here!');
        }
      );
    });
  }
);