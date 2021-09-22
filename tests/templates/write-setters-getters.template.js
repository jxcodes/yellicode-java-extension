"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../code/Person.java' }, (output) => {
    const classDefinition = {
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
    const java = new java_1.JavaWriter(output);
    java.writeClassBlock(classDefinition, () => {
        (classDefinition.properties || []).forEach((p) => {
            java.writeProperty(p);
            java.writeLine();
        });
        java.writeSetterMethod({ name: 'nombre', typeName: 'String' });
        java.writeSetterMethod({ name: 'apellido', typeName: 'String' });
        java.writeSetterMethod({ name: 'edad', typeName: 'Integer' });
        java.writeGetterMethod({ name: 'nombre', typeName: 'String' });
        java.writeGetterMethod({ name: 'apellido', typeName: 'String' });
        java.writeGetterMethod({ name: 'edad', typeName: 'Integer' });
        java.writeGetterMethod({ name: 'nEdad', typeName: 'Integer' });
        java.writeGetterMethod({ name: 'edad', typeName: 'Integer' }, 'nEdad');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtc2V0dGVycy1nZXR0ZXJzLnRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGUtc2V0dGVycy1nZXR0ZXJzLnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0RBQWtEO0FBQ2xELHlDQUE2RDtBQUU3RCxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUUsRUFDckMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7SUFDckIsTUFBTSxlQUFlLEdBQW9CO1FBQ3ZDLElBQUksRUFBRSxRQUFRO1FBQ2QsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFO1lBQ1YsNERBQTREO1NBQzdEO1FBQ0QsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDcEMsWUFBWSxFQUFFLE1BQU07YUFDckI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGNBQWMsRUFBRSxTQUFTO2FBQzFCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGNBQWMsRUFBRSxTQUFTO2FBQzFCO1NBQ0Y7S0FDRixDQUFDO0lBR0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUV6QyxDQUFDLGVBQWUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUNGLENBQUMifQ==