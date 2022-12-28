import React, { Component, FormEvent, ChangeEvent } from "react";
import Button from "../UI/Button";
import "./FirstForm.scss";

type Props = {
  colors: (string | null)[];
  onUpdateColors: (elements: (string | null)[]) => void;
};

const inputValidation = new RegExp(/^#([A-F0-9]{3}|[A-F0-9]{6})$/i);

class FirstForm extends Component<Props> {
  state = {
    userInput: "",
    errorMessage: "",
    colors: this.props.colors,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.colors !== this.state.colors) {
      this.setState({ colors: this.props.colors });
    }
  }

  onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ userInput: e.target.value });
  };

  formValidation = () => {
    const { userInput } = this.state;
    let isValid = false;
    const errorMessage =
      'Your HEX color is incorrect, it must contain "#" at the beginning, and the next 6 characters must be a combination of numbers 0-9 and letters a-f';
    if (inputValidation.test(userInput)) {
      isValid = true;
      this.setState({ errorMessage: "" });
    } else {
      isValid = false;
      this.setState({ errorMessage });
    }
    return isValid;
  };

  submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = this.formValidation();

    const color = this.state.userInput;

    if (isFormValid) {
      const { colors } = this.state;
      const isColorAdded = colors.includes(color);
      if (isColorAdded) {
        alert("You have already added this color");
        return;
      } else {
        colors.push(color);
      }
      localStorage.setItem("colors", JSON.stringify(colors));
      this.props.onUpdateColors(colors);
    } else {
      return;
    }

    this.setState({ userInput: "" });
  };

  render() {
    const { userInput, errorMessage } = this.state;
    return (
      <section className="firstForm-container">
        <h2 className="firstForm-heading">Add HEX Color to database:</h2>
        <form className="firstForm-form" onSubmit={this.submitFormHandler}>
          <div className="firstForm-form--container">
            <input
              type="text"
              value={userInput}
              onChange={this.onChangeInputHandler}
              className="firstForm-input"
              placeholder="color"
            />
            <input
              type="color"
              value={userInput.length < 7 ? "#FFFFFF" : userInput}
              onChange={this.onChangeInputHandler}
              className="firstForm-div--color"
            />
          </div>
          <p className="firstForm-error--message">{errorMessage}</p>
          <Button className="firstForm-button">Submit</Button>
        </form>
      </section>
    );
  }
}

export default FirstForm;
