/**
 * A fully generated Interface
 */
public interface InterfazDeclarationExample {

  String basicMethod();

  String withParameters(String param1, Integer param2);

  String withExecptions() throws Exception;

  public String whitPublicModifier();

  default void whitDefultMethodImlementation() {
    // Write your code here!
  }
  default void whitDefultMethodImlementationAndThrowsEx() throws Exception {
    throw new Exception("Something went wrong.");
  }

}
