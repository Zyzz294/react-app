import React, { Component } from "react";

class CaesarCipher extends Component {
  state = {
    text: "",
    errors: "",
    mode: 1,
  };

  inputText = React.createRef();
  inputTextDecrypt = React.createRef();
  EncryptKey = React.createRef();
  DecryptKey = React.createRef();

  handelSubmit = (e) => {
    e.preventDefault();
    if (this.state.mode === 2) {
      const userInput = this.inputTextDecrypt.current.value;
      const results = this.ceaserCipher(
        userInput,
        parseInt(this.DecryptKey.current.value),
        2
      );
      this.setState({ text: results });
    } else {
      const userInput = this.inputText.current.value;
      const results = this.ceaserCipher(
        userInput,
        parseInt(this.EncryptKey.current.value),
        1
      );
      this.setState({ text: results });
    }
  };
  handelClick = (opt) => {
    this.setState({ text: "" });
    if (opt === 1) this.setState({ mode: 1 });
    else this.setState({ mode: 2 });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handelSubmit}>
          {this.renderInputFields()}
          <hr />
          <h5>{this.formatResult()}</h5>
          <hr />
          <button
            onClick={() => this.handelClick(1)}
            className="btn"
            type="button"
          >
            Decrypt
          </button>
          <button
            onClick={() => this.handelClick(2)}
            className="btn"
            type="button"
          >
            Encrypt
          </button>
          <button className="btn" type="submit">
            RUN
          </button>
        </form>
      </React.Fragment>
    );
  }

  renderInputFields() {
    const { mode } = this.state;
    return mode === 1 ? (
      <div>
        <label htmlfor="inputText" class="visually-hidden">
          Please Enter the text you want to decrypt:  </label>
        <textarea
          type="text"
          id="inputText"
          className="form-control"
          placeholder="Text To Encrypt"
          ref={this.inputText}
          autoFocus
          required
        ></textarea>
        <textarea
          type="number"
          id="EncryptKey"
          className="form-control"
          placeholder="Encryption Key"
          ref={this.EncryptKey}
          required
        ></textarea>
      </div>
    ) : (
      <div>
        <label htmlfor="inputTextDecrypt" class="visually-hidden">
          Please Enter the text you want to encrypt
        </label>
        <textarea
          type="text"
          id="inputTextDecrypt"
          className="form-control"
          placeholder="Text To Decrypt"
          ref={this.inputTextDecrypt}
          required
        ></textarea>
        <textarea
          type="number"
          id="DecryptKey"
          className="form-control"
          placeholder="Decryption Key"
          ref={this.DecryptKey}
          required
        ></textarea>
      </div>
    );
  }

  ceaserCipher(text, key, option) {
    let decipher = "";
    
    if (option === 1) {
      
      for (let i = 0; i < text.length; i++) {
        
        if (text[i] === " ") decipher += " ";
        
        else if (this.isUpperCase(text[i])) {
          decipher += String.fromCharCode(
            ((text.charCodeAt(i) - key - 39) % 26) + 65
          );
        } else {
          
          decipher += String.fromCharCode(
            ((text.charCodeAt(i) - key - 71) % 26) + 97
          );
        }
      }
      return decipher;
    } else if (option === 2) {
     
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") decipher += " ";
        else if (this.isUpperCase(text[i])) {
          decipher += String.fromCharCode(
            ((text.charCodeAt(i) + key - 39) % 26) + 65
          );
        } else {
          decipher += String.fromCharCode(
            ((text.charCodeAt(i) + key - 71) % 26) + 97
          );
        }
      }
      return decipher;
    } else {
      console.log("Invalid Option for ceaserCipher Method");
    }
  }

  isUpperCase(text) {
    return text === text.toUpperCase();
  }

  formatResult() {
    const { text } = this.state;
    return text.length === 0 ? <span>-</span> : text;
  }
}

export default CaesarCipher;