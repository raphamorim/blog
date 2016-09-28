class ParagraphBlock extends React.Component {

  propTypes: {
    text: React.PropTypes.string
  }

  constructor (props) {
    super(props);

    this.state = {
      published: this.props.published || false,
      ctrlPressed: false,
      value: this.props.text || ""
    }

    this.CTRL = 17;
    this.CMD = 91;
    this.L = 76;
  }

  /**
   * Set the state for CTRL key pressed
   */
  handleKeyDown (event) {

    const key = event.keyCode;

    if(key == this.CTRL || key == this.CMD) {
      this.state.ctrlPressed = true;
    }
  }

  /**
   * Handle B or I keys pressed. The selection start and end are also read.
   * For each key, bold or italic are used. If the key is CTRL the state is
   * updated.
   */
  handleKeyUp (event) {

    event.preventDefault();

    const key = event.keyCode;
    const selection = window.getSelection();
    const start = selection.anchorOffset;
    const end = selection.focusOffset;

    if(key == this.L && this.state.ctrlPressed) {
      this.addLink();
    } else if (key == this.CTRL || key == this.CMD) {
      this.state.ctrlPressed = false;
    }
  }


  /**
   * Adds links at start and end text selection
   */
  addLink () {

    if (window.getSelection().toString()) {
        var a = document.createElement('a');
            a.href = 'https://pantuza.com';
            window.getSelection().getRangeAt(0).surroundContents(a);
    }
    event.preventDefault();
  }

  change (event) {
    this.setState({value: event.target.value});
  }

  allowEdition (event) {
    event.target.contentEditable = true;
  }

  closeEdition (event) {
    event.target.contentEditable = false;
  }

  render () {

    const form = (
      <p className="paragraph-block-form">
        <BlockRemove class="paragraph-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Paragraph</label>
        <div
          className="unpublished"
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          onChange={this.change.bind(this)}
          onClick={this.allowEdition.bind(this)}
          onBlur={this.closeEdition.bind(this)}
          name={"article[blocks][" + this.props.order + "][paragraph]"}>
          {this.state.value}
        </div>
      </p>
    );

    const paragraph = (
      <p className="published">{this.state.value}</p>
    );

    if(this.state.published) {
        return paragraph;
    } else {
        return form;
    }
  }
}
