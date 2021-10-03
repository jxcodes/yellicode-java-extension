"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../out/HelloWold.java' }, (output) => {
    const classDefinition = {
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
    const java = new java_1.JavaWriter(output);
    java.writeClassBlock(classDefinition, () => {
        (classDefinition.properties || []).forEach((p) => {
            java.writeProperty(p);
            java.writeLine();
        });
        java.writeMainMethod(() => {
            java.writeLine('System.out.println(HelloWold.message);');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8td29ybGQtY2xhc3MudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWxsby13b3JsZC1jbGFzcy50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNEQUFrRDtBQUNsRCx5Q0FBNkQ7QUFFN0Qsc0JBQVMsQ0FBQyxRQUFRLENBQ2hCLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLEVBQ3ZDLENBQUMsTUFBa0IsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sZUFBZSxHQUFvQjtRQUN2QyxJQUFJLEVBQUUsV0FBVztRQUNqQixjQUFjLEVBQUUsUUFBUTtRQUN4QixVQUFVLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztRQUNsRCxVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLFVBQVUsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUNoQyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxZQUFZLEVBQUUsZUFBZTthQUM5QjtTQUNGO0tBQ0YsQ0FBQztJQUdGLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFFekMsQ0FBQyxlQUFlLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9