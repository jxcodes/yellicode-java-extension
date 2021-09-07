"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../code/Persona.java' }, (output) => {
    const classDefinition = {
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
    const java = new java_1.JavaWriter(output);
    java.writeClassBlock(classDefinition, () => {
        (classDefinition.properties || []).forEach((p) => {
            java.writeProperty(p);
            java.writeLine();
        });
        java.writeMainMethod(() => {
            java.writeLine('System.out.println(Persona.nombre);');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8td29ybGQyLWNsYXNzLnRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8td29ybGQyLWNsYXNzLnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0RBQWtEO0FBQ2xELHlDQUE2RDtBQUU3RCxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsRUFDdEMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7SUFDckIsTUFBTSxlQUFlLEdBQW9CO1FBQ3ZDLElBQUksRUFBRSxTQUFTO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFO1lBQ1YsNERBQTREO1NBQzdEO1FBQ0QsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDcEMsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsWUFBWSxFQUFFLE1BQU07YUFDckI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGNBQWMsRUFBRSxRQUFRO2FBQ3pCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGNBQWMsRUFBRSxRQUFRO2FBQ3pCO1NBQ0Y7S0FDRixDQUFDO0lBR0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUV6QyxDQUFDLGVBQWUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FDRixDQUFDIn0=