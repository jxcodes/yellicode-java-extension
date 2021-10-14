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
        java.writeLine();
        java.writeMethodDeclaration({
            name: 'basicMethod',
            returnTypeName: `String`,
        });
        java.writeLine();
        java.writeMethodDeclaration({
            name: 'withParameters',
            returnTypeName: `String`,
            parameters: [
                { name: 'param1', typeName: 'String' },
                { name: 'param2', typeName: 'Integer' },
            ],
        });
        java.writeLine();
        java.writeMethodDeclaration({
            name: 'withExecptions',
            returnTypeName: `String`,
            throws: ['Exception'],
        });
        java.writeLine();
        java.writeMethodDeclaration({
            isPublic: true,
            name: 'whitPublicModifier',
            returnTypeName: `String`,
        });
        java.writeLine();
        java.writeMethodBlock({
            isDefault: true,
            name: 'whitDefultMethodImlementation',
            returnTypeName: `void`,
        }, () => {
            java.writeLine('// Write your code here!');
        });
        java.writeLine();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLWRlY2xhcmF0aW9uLWV4YW1wbGUudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmZhY2UtZGVjbGFyYXRpb24tZXhhbXBsZS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCx5Q0FBaUU7QUFFakUsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLHdDQUF3QyxFQUFFLEVBQ3hELENBQUMsTUFBa0IsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sb0JBQW9CLEdBQXdCO1FBQ2hELElBQUksRUFBRSw0QkFBNEI7UUFDbEMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDNUMsQ0FBQztJQUdGLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBQ2xELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDMUIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsY0FBYyxFQUFFLFFBQVE7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUMxQixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFVBQVUsRUFBRTtnQkFDVixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtnQkFDdEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7YUFDeEM7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1lBQzFCLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3RCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDMUIsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLGNBQWMsRUFBRSxRQUFRO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsZ0JBQWdCLENBQ25CO1lBQ0UsU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsK0JBQStCO1lBQ3JDLGNBQWMsRUFBRSxNQUFNO1NBQ3ZCLEVBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUNGLENBQUMifQ==