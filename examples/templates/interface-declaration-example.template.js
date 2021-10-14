"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../out/InterfazDeclarationExample.java' }, (output) => {
    const ineterfaceDefinition = {
        name: 'InterfazDeclarationExample',
        accessModifier: 'public',
        docComment: ['A fully generated Interface'],
    };
    const java = new java_1.JavaWriter(output);
    java.writeInterfaceBlock(ineterfaceDefinition, () => {
        java.writeMethodDeclaration({
            name: 'basicMethod',
            returnTypeName: `String`,
        });
        java.writeMethodDeclaration({
            name: 'withParameters',
            returnTypeName: `String`,
            parameters: [
                { name: 'param1', typeName: 'String' },
                { name: 'param2', typeName: 'Integer' },
            ],
        });
        java.writeMethodDeclaration({
            name: 'withExecptions',
            returnTypeName: `String`,
            throws: ['Exception'],
        });
        java.writeMethodDeclaration({
            isPublic: true,
            name: 'whitPublicModifier',
            returnTypeName: `String`,
        });
        java.writeMethodBlock({
            isDefault: true,
            name: 'whitDefultMethodImlementation',
            returnTypeName: `void`,
        }, () => {
            java.writeLine('// Write your code here!');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLWRlY2xhcmF0aW9uLWV4YW1wbGUudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmZhY2UtZGVjbGFyYXRpb24tZXhhbXBsZS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCx5Q0FBaUU7QUFFakUsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLHdDQUF3QyxFQUFFLEVBQ3hELENBQUMsTUFBa0IsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sb0JBQW9CLEdBQXdCO1FBQ2hELElBQUksRUFBRSw0QkFBNEI7UUFDbEMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDNUMsQ0FBQztJQUdGLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBRWxELElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUMxQixJQUFJLEVBQUUsYUFBYTtZQUNuQixjQUFjLEVBQUUsUUFBUTtTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDMUIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixjQUFjLEVBQUUsUUFBUTtZQUN4QixVQUFVLEVBQUU7Z0JBQ1YsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7Z0JBQ3RDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO2FBQ3hDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQzFCLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUMxQixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxvQkFBb0I7WUFDMUIsY0FBYyxFQUFFLFFBQVE7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUNuQjtZQUNFLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLCtCQUErQjtZQUNyQyxjQUFjLEVBQUUsTUFBTTtTQUN2QixFQUNELEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUNGLENBQUMifQ==