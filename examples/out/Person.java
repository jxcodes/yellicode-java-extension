/**
 * The person class
 */
public class Person {
  // Properties
  private String name = "Pepe";

  private String lastName;

  private Integer age;

  // Setters
  public void setName(String name) {
    this.name = name;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  // Getters
  public String getName() {
    return this.name;
  }

  public String getLastName() {
    return this.lastName;
  }

  public Integer getAge() {
    return this.age;
  }

}
