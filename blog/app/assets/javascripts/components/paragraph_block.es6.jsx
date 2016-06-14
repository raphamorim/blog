class ParagraphBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false,
        ctrlPressed: false
      }

      this.CTRL = 17;
      this.B = 66;
  }

  handleKeyDown (event) {

    const key = event.keyCode;
    if(key == this.CTRL) {
        this.state.ctrlPressed = true;
        console.log("ctrl pressed");
    }
  }

  handleKeyUp (event) {

    const key = event.keyCode;
    if(key == this.B && this.state.ctrlPressed) {
        debugger;
    }
  }

  render () {

    const form = (
      <p className="paragraph-block-form">
        <BlockRemove class="paragraph-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Paragraph</label>
        <textarea rows="5"
                  columns="60"
                  onKeyDown={this.handleKeyDown.bind(this)}
                  onKeyUp={this.handleKeyUp.bind(this)}>
        </textarea>
      </p>
    );

    const paragraph = (
      <p >{this.props.text}</p>
    );

    if(this.state.published) {
        return paragraph;
    } else {
        return form;
    }
  }
}

ParagraphBlock.propTypes = {
  text: React.PropTypes.string
};
