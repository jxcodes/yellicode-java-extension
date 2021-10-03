import * as elements from '@yellicode/elements';
import * as opts from './options';
import {
  ClassDefinition,
  InterfaceDefinition,
  EnumDefinition,
  EnumMemberDefinition,
  DefinitionBase,
  TypeDefinition,
  AccessModifier,
  PackageDefinition,
  MethodDefinition,
  ParameterDefinition,
  PropertyDefinition,
} from './model';
import { ParameterDirectionKind } from '@yellicode/elements';
import { JavaTypeNameProvider } from './java-type-name-provider';

export class DefinitionBuilder {
  constructor(private typeNameProvider: elements.TypeNameProvider) {}

  public buildPackageDefinition(
    pack: elements.Package,
    options?: opts.NamespaceOptions
  ): PackageDefinition {
    if (!options) options = {};
    // We have no namespace features yet, but the NamespaceFeatures type is there for future extension
    const features =
      options.features === undefined
        ? opts.NamespaceFeatures.All
        : options.features;
    let name: string;
    if (options.writeFullName) {
      const allPackages = pack.getNestingPackages();
      allPackages.push(pack); // add the package itself
      name = allPackages.map((p) => p.name).join('.');
    } else name = pack.name;
    return { name: name };
  }

  public buildClassDefinition(
    type: elements.Type,
    options?: opts.ClassOptions
  ): ClassDefinition {
    // Initialize options and features
    if (!options) options = {};
    const features =
      options.features === undefined
        ? opts.ClassFeatures.All
        : options.features;

    // Build the base definition
    const definition = DefinitionBuilder.buildTypeDefinition<ClassDefinition>(
      type,
      !!(features & opts.ClassFeatures.XmlDocSummary),
      options
    );

    // Build the class-specific definition
    const addInherist = options.extends ? [options.extends] : undefined;
    const exts = DefinitionBuilder.buildInherits(type, addInherist);
    // When multiple extends only the first is used
    if (exts && exts?.length > 1) {
      console.warn(
        `Java only allows inheritance from  a sigle class, many extends detected: (${exts.join(
          ', '
        )}) for class: ${type.name}, only ${exts[0]} will be used.`
      );
    }
    definition.extends = exts ? exts[0] : undefined;
    definition.implements = DefinitionBuilder.buildImplements(
      type,
      options.implements
    );
    if (elements.isClass(type)) {
      definition.isStatic = options.isStatic;
      definition.isAbstract = type.isAbstract || options.isAbstract;
    }
    return definition;
  }

  public buildInterfaceDefinition(
    type: elements.Type,
    options?: opts.InterfaceOptions
  ): InterfaceDefinition {
    // Initialize options and features
    if (!options) options = {};
    const features =
      options.features === undefined
        ? opts.InterfaceFeatures.All
        : options.features;

    // Build the base definition
    const definition =
      DefinitionBuilder.buildTypeDefinition<InterfaceDefinition>(
        type,
        !!(features & opts.InterfaceFeatures.XmlDocSummary),
        options
      );

    // Build the interface-specific definition
    definition.extends = DefinitionBuilder.buildInherits(type, options.extends);

    return definition;
  }

  public buildEnumMemberDefinition(
    literal: elements.EnumerationLiteral,
    isLast?: boolean,
    options?: opts.EnumMemberOptions
  ): EnumMemberDefinition {
    // Initialize options and features
    if (!options) options = {};
    const features =
      options.features === undefined
        ? opts.EnumMemberFeatures.All
        : options.features;
    const buildInitializers = !!(features & opts.EnumFeatures.Initializers);

    // Build the base definition
    const definition: EnumMemberDefinition =
      DefinitionBuilder.buildDefinitionBase<EnumMemberDefinition>(
        literal,
        !!(features & opts.EnumMemberFeatures.XmlDocSummary)
      );

    // Build the member-specific definition
    definition.isLast = isLast || false;

    if (buildInitializers && literal.specification != null) {
      // using '!=' on purpose
      const specification = literal.specification;
      definition.value = elements.isLiteralInteger(specification)
        ? specification.value
        : undefined;
    }

    return definition;
  }

  public buildEnumDefinition(
    type: elements.Type,
    options?: opts.EnumOptions
  ): EnumDefinition {
    // Initialize options and features
    if (!options) options = {};
    const features =
      options.features === undefined ? opts.EnumFeatures.All : options.features;

    // Build the base definition
    const definition = DefinitionBuilder.buildDefinitionBase<EnumDefinition>(
      type,
      !!(features & opts.EnumFeatures.XmlDocSummary)
    );

    // Build the enum-specific definition
    definition.accessModifier = DefinitionBuilder.getAccessModifierString(
      type.visibility
    );

    // Build enum members
    if (elements.isEnumeration(type) && type.ownedLiterals) {
      const members: EnumMemberDefinition[] = [];
      // Pass on enum features to enum member features
      let memberFeatures = opts.EnumMemberFeatures.None;
      if (features & opts.EnumFeatures.XmlDocSummary)
        memberFeatures |= opts.EnumMemberFeatures.XmlDocSummary;
      if (features & opts.EnumFeatures.Initializers)
        memberFeatures |= opts.EnumMemberFeatures.Initializers;

      type.ownedLiterals.forEach((literal, index) => {
        let isLast: boolean = index === type.ownedLiterals.length - 1;
        const member = this.buildEnumMemberDefinition(literal, isLast, {
          features: memberFeatures,
        });
        members.push(member);
      });

      definition.members = members;
    }
    return definition;
  }

  public buildPropertyDefinition(
    property: elements.Property,
    options?: opts.PropertyOptions
  ): PropertyDefinition {
    // Initialize options and features
    if (!options) options = {};
    const features =
      options.features === undefined
        ? opts.PropertyFeatures.All
        : options.features;
    const ownerIsInterface = elements.isInterface(property.owner);

    // Build the base definition
    const definition =
      DefinitionBuilder.buildDefinitionBase<PropertyDefinition>(
        property,
        !!(features & opts.PropertyFeatures.XmlDocSummary)
      );

    // Build the property-specific definition
    const typename = this.getFullTypeName(
      property,
      options.collectionType || null,
      'object'
    )!;
    definition.isVirtual = options.virtual;
    definition.typeName = typename;

    if (!ownerIsInterface && features & opts.PropertyFeatures.AccessModifier)
      definition.accessModifier = DefinitionBuilder.getAccessModifierString(
        property.visibility
      );

    if (
      features & opts.PropertyFeatures.OptionalModifier &&
      property.lower === 0 &&
      JavaTypeNameProvider.canBeNullable(property, typename)
    ) {
      definition.isNullable = true;
    }

    definition.noSetter = property.isReadOnly || property.isDerived;
    definition.defaultValue = DefinitionBuilder.getDefaultValueString(
      property.defaultValue
    );
    return definition;
  }

  public buildMethodDefinition(
    operation: elements.Operation,
    options?: opts.MethodOptions
  ): MethodDefinition {
    if (!options) options = {};
    const features =
      options.features === undefined
        ? opts.MethodFeatures.All
        : options.features;
    const ownerIsInterface = elements.isInterface(operation.owner);

    // Build the base definition
    const definition = DefinitionBuilder.buildDefinitionBase<MethodDefinition>(
      operation,
      !!(features & opts.MethodFeatures.XmlDocSummary)
    );

    definition.isConstructor = operation.isConstructor;
    definition.isStatic = operation.isStatic;
    definition.isPublic = options.isPublic;

    if (!operation.isConstructor) {
      definition.isAbstract = options.isAbstract;
    }
    if (!ownerIsInterface)
      definition.accessModifier = DefinitionBuilder.getAccessModifierString(
        operation.visibility
      );

    // Get the return type and documentation
    if (!operation.isConstructor) {
      var returnParameter = operation.getReturnParameter();
      if (returnParameter) {
        definition.returnTypeName = this.getFullTypeName(
          returnParameter,
          options.collectionType || null
        );
        if (features & opts.MethodFeatures.XmlDocReturns) {
          definition.xmlDocReturns =
            DefinitionBuilder.buildXmlDocSummary(operation);
        }
      }
    }

    // Build parameter definitions
    definition.parameters = this.buildParameterDefinitions(
      operation.ownedParameters,
      options
    );
    return definition;
  }

  public buildParameterDefinitions(
    params: elements.Parameter[],
    options?: opts.MethodOptions
  ): ParameterDefinition[] {
    if (!options) options = {};
    const features =
      options.features === undefined
        ? opts.MethodFeatures.All
        : options.features;

    const inOutParameters: ParameterDefinition[] = [];
    if (!params) return inOutParameters;

    params.forEach((p) => {
      if (p.direction === ParameterDirectionKind.return) return;
      const typeName = this.getFullTypeName(
        p,
        options!.collectionType || null,
        'object'
      )!;
      const paramDefinition: ParameterDefinition =
        DefinitionBuilder.buildDefinitionBase<ParameterDefinition>(
          p,
          !!(features & opts.MethodFeatures.XmlDocParameters)
        );
      paramDefinition.isNullable =
        p.lower === 0 && JavaTypeNameProvider.canBeNullable(p, typeName);
      paramDefinition.typeName = typeName;
      (paramDefinition.defaultValue = DefinitionBuilder.getDefaultValueString(
        p.defaultValue
      )),
        inOutParameters.push(paramDefinition);
    });
    return inOutParameters;
  }

  private static buildInherits(
    type: elements.Type,
    additional: string[] | undefined
  ): string[] | undefined {
    if (!elements.isClassifier(type)) {
      return;
    }

    const allNames: string[] = [];
    if (type.generalizations) {
      // todo: allow qualifiedName
      allNames.push(...type.generalizations.map((g) => g.general.name));
    }
    if (additional) {
      allNames.push(...additional);
    }
    return allNames.length ? allNames : undefined;
  }

  private static buildImplements(
    type: elements.Type,
    additional: string[] | undefined
  ): string[] | undefined {
    if (!elements.isBehavioredClassifier(type)) {
      return;
    }
    const allNames: string[] = [];
    if (type.interfaceRealizations) {
      // todo: allow qualifiedName
      allNames.push(
        ...type.interfaceRealizations.map((ir) => ir.contract.name)
      );
    }
    if (additional) {
      allNames.push(...additional);
    }
    return allNames.length ? allNames : undefined;
  }

  public static buildXmlDocSummary(
    element: elements.Element
  ): string[] | undefined {
    if (!element.ownedComments || !element.ownedComments.length) {
      return undefined;
    }

    return element.ownedComments.map((c) => c.body);
  }

  private static buildTypeDefinition<TDefinition extends TypeDefinition>(
    type: elements.Type,
    buildXmlDocSummary: boolean | undefined,
    options: { isPublic?: boolean; extends?: string | string[] }
  ): TDefinition {
    var definition = DefinitionBuilder.buildDefinitionBase<TDefinition>(
      type,
      buildXmlDocSummary
    );

    definition.accessModifier = DefinitionBuilder.getAccessModifierString(
      type.visibility
    );
    definition.isPublic = options.isPublic;
    return definition;
  }

  private static buildDefinitionBase<TDefinition extends DefinitionBase>(
    element: elements.NamedElement,
    buildXmlDocSummary: boolean | undefined
  ): TDefinition {
    var definition = {
      name: element.name,
      docComment: buildXmlDocSummary
        ? DefinitionBuilder.buildXmlDocSummary(element)
        : undefined,
    };
    return definition as TDefinition;
  }

  private static getDefaultValueString(
    defaultValue: elements.ValueSpecification | null
  ): string | undefined {
    if (!defaultValue) return undefined;

    return elements.isLiteralString(defaultValue)
      ? `"${defaultValue.value}"`
      : defaultValue.getStringValue();
  }

  public static getAccessModifierString(
    visibility: elements.VisibilityKind | null
  ): AccessModifier | undefined {
    switch (visibility) {
      case elements.VisibilityKind.public:
        return 'public';
      case elements.VisibilityKind.private:
        return 'private';
      case elements.VisibilityKind.protected:
        return 'protected';
      default:
        return undefined;
    }
  }

  private getFullTypeName(
    typedElement: elements.TypedElement,
    collectionType: opts.CollectionType | null,
    fallback?: string
  ): string | undefined {
    const typeName =
      this.typeNameProvider.getTypeName(typedElement) || fallback;
    if (!typeName) return; // no type name and no fallback

    if (
      elements.isMultiplicityElement(typedElement) &&
      typedElement.isMultivalued()
    ) {
      switch (collectionType) {
        case opts.CollectionType.IList:
          return `IList<${typeName}>`;
        case opts.CollectionType.IEnumerable:
          return `IEnumerable<${typeName}>`;
        default:
          return `ICollection<${typeName}>`;
      }
    } else return typeName;
  }
}
