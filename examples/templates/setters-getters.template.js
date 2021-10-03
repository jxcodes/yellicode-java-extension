"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../out/Person.java' }, (output) => {
    const classDefinition = {
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
    const java = new java_1.JavaWriter(output);
    java.writeClassBlock(classDefinition, () => {
        java.writeLine('// Properties');
        (classDefinition.properties || []).forEach((p) => {
            java.writeProperty(p);
            java.writeLine();
        });
        java.writeLine('// Setters');
        (classDefinition.properties || []).forEach((p) => {
            java.writeSetterMethod(p);
            java.writeLine();
        });
        java.writeLine('// Getters');
        (classDefinition.properties || []).forEach((p) => {
            java.writeGetterMethod(p);
            java.writeLine();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGVycy1nZXR0ZXJzLnRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGVycy1nZXR0ZXJzLnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0RBQWtEO0FBQ2xELHlDQUE2RDtBQUU3RCxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsRUFDcEMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7SUFDckIsTUFBTSxlQUFlLEdBQW9CO1FBQ3ZDLElBQUksRUFBRSxRQUFRO1FBQ2QsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFLENBQUMsa0JBQWtCLENBQUM7UUFDaEMsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixZQUFZLEVBQUUsTUFBTTthQUNyQjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsY0FBYyxFQUFFLFNBQVM7YUFDMUI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsY0FBYyxFQUFFLFNBQVM7YUFDMUI7U0FDRjtLQUNGLENBQUM7SUFHRixNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBRXpDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxlQUFlLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDLGVBQWUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxlQUFlLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDIn0=