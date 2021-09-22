/**
 * Enumerates the valid Java access modifiers.
 */
export type AccessModifier = 'public' | 'private' | 'protected' | 'default';

/**
 * The base interface for all Java definitions.
 */
export interface DefinitionBase {
  /**
   * Get or sets the name of the code element. This field is required.
   */
  name: string;
  /**
   * Gets the XML documentation summary of the element. Each string in this
   * array will be written on a new line. This field is optional.
   */
  docComment?: string[];
}

/**
 * Represents a Java namespace.
 */
export interface PackageDefinition extends DefinitionBase {
  // Nothing specific yet.
}

/**
 * Represents a single Java file.
 */
export interface FileDefinition {
  /**
   * The file package name
   */
  package?: string;
  imports?: string[];
}
/**
 * The base interface for all Java type definitions, such as class- and interface
 * definitions.
 */
export interface TypeDefinition extends DefinitionBase {
  /**
   * Gets the type's access modifier. By default, no access modifier will be written.
   */
  accessModifier?: AccessModifier;
  /**
   * Indicates whether the type should be written with the 'public' keyword.
   * The default value is false.
   */
  isPublic?: boolean;
}

/**
 * Represents a Java struct.
 */
export interface StructDefinition extends TypeDefinition {
  /**
   * Contains the names of the interfaces that the struct should implement.
   * This field is optional.
   */
  implements?: string[];
  /**
   * Gets the struct properties.
   */
  properties?: PropertyDefinition[];
  /**
   * Gets the struct methods.
   */
  methods?: MethodDefinition[];
}

/**
 * Represents a Java class.
 */
export interface ClassDefinition extends TypeDefinition {
  /**
   * Indicates if the class should be a static class.
   * The default value is false.
   */
  isStatic?: boolean;
  /**
   * Indicates whether the class should be abstract.
   * The default value is false.
   */
  isAbstract?: boolean;
  /**
   * Contains the names of the interfaces that the class should implement.
   * This field is optional.
   */
  implements?: string[];
  /**
   * Contains the names of the classes from which the class should extend.
   * This field is optional.
   */
  extends?: string[];
  /**
   * Gets the class properties.
   */
  properties?: PropertyDefinition[];
  /**
   * Gets the class methods.
   */
  methods?: MethodDefinition[];
}

/**
 * Represents a Java interface.
 */
export interface InterfaceDefinition extends TypeDefinition {
  /**
   * Contains the names of the interfaces from which the interfaces should inherit.
   * This field is optional.
   */
  inherits?: string[];
  /**
   * Gets the interface properties.
   */
  properties?: PropertyDefinition[];
  /**
   * Gets the interface methods.
   */
  methods?: MethodDefinition[];
}

/**
 * Represents a Java enumeration member.
 */
export interface EnumMemberDefinition extends DefinitionBase {
  /**
   * Gets the numeric value of the member.
   * This field is optional. By default, no value will be written.
   */
  value?: number;
  /**
   * Indicates if the member is the last member of the containing enumeration.
   * This value is only used to control if a delimiter is written.
   */
  isLast?: boolean;
}

/**
 * Represents a Java enumeration.
 */
export interface EnumDefinition extends DefinitionBase {
  // Note: an enum cannot be partial, therefore we cannot extend TypeDefinition

  /**
   * Gets the type's access modifier. By default, no access modifier will be written.
   */
  accessModifier?: AccessModifier;
  /**
   * Gets the enum members.
   */
  members: EnumMemberDefinition[];
}

/**
 * Represents a Java method.
 */
export interface MethodDefinition extends DefinitionBase {
  /**
   * The full type name of the method return type. If the method returns a collection,
   * the collection must be part of the name (e.g. 'List<string>'). If this value
   * is empty, the method will be 'void'.
   */
  returnTypeName?: string;
  /**
   * Contains the documentation of the return value.
   */
  xmlDocReturns?: string[];
  /**
   * Contains the method's input/output parameters.
   */
  parameters?: ParameterDefinition[];
  /**
   * Gets the method's access modifier. By default, no access modifier will be written.
   */
  accessModifier?: AccessModifier;
  /**
   * Indicates if the method should be a static method.
   * The default value is false.
   */
  isStatic?: boolean;
  /**
   * Indicates if the method should be an abstract method. This value
   * is ignored if the method is a static method. The default value is false.
   */
  isAbstract?: boolean;
  /**
   * Indicates if the method should be a virtual method. This value
   * is ignored if the method is a static or abstract method. The default value is false.
   */
  isVirtual?: boolean;
  /**
   * Indicates if the method is a constructor. The default value is false.
   */
  isConstructor?: boolean;
  /**
   * Indicates whether the method should be written with the 'public' keyword.
   * The default value is false.
   */
  isPublic?: boolean;
}

/**
 * Represents a Java method parameter.
 */
export interface ParameterDefinition extends DefinitionBase {
  /**
   * The full type name of the parameter. If the type is a collection,
   * the collection must be part of the name (e.g. 'List<string>').
   */
  typeName: string;
  /**
   * Indicates if the parameter value should be passed by reference. The default value is false.
   */
  isReference?: boolean;
  /**
   * Indicates if the parameter should be nullable. The caller should ensure that
   * the type specified by typeName is a nullable type. The default value is false.
   */
  isNullable?: boolean;
  /**
   * Gets the default value of the parameter.
   */
  defaultValue?: string;
}

/**
 * Represents a Java property.
 */
export interface PropertyDefinition extends DefinitionBase {
  /**
   * The full type name of the property. If the type is a collection,
   * the collection must be part of the name (e.g. 'List<string>').
   */
  typeName: string;
  /**
   * Gets the property's access modifier. By default, no access modifier will be written.
   */
  accessModifier?: AccessModifier;
  /**
   * Indicates if a property getter should be written. The default value is false.
   * @deprecated A getter is now written by default. Please use noGetter if you want to omit the getter.
   */
  hasGetter?: boolean;
  /**
   * Indicates if a property getter should be omitted. By default, a getter will be written.
   */
  noGetter?: boolean;
  /**
   * Indicates if a property setter should be written. The default value is false.
   * @deprecated A setter is now written by default. Please use noSetter if you want to omit the setter.
   */
  hasSetter?: boolean;
  /**
   * Indicates if a property setter should be omitted. By default, a setter will be written.
   */
  noSetter?: boolean;
  /**
   * Indicates if the property should be a virtual property.
   */
  isVirtual?: boolean;
  /**
   * Indicates if the property should be a static property.
   * The default value is false.
   */
  isStatic?: boolean;
  /**
   * Indicates if the property should be nullable. The caller should ensure that
   * the type specified by typeName is a nullable type. The default value is false.
   */
  isNullable?: boolean;
  /**
   * The default value of the property.
   */
  defaultValue?: string;
}
