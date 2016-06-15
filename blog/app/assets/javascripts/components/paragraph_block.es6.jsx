class ParagraphBlock extends React.Component {

  constructor () {
      super();

      this.styles = {
        NONE: 0,
        BOLD: 1,
        ITALIC: 2
      }

      this.state = {
        visible: false,
        published: false,
        ctrlPressed: false,
        textStyle: this.styles.NONE,
        value: ""
      }

      this.CTRL = 17;
      this.B = 66;
      this.I = 73;

      this.boldTags = {
        OPEN: "<b>",
        CLOSE: "</b>"
      }

      this.italicTags = {
        OPEN: "<i>",
        CLOSE: "</i>"
      }
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
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    if(key == this.B && this.state.ctrlPressed) {

      this.setStyle(start, end, event, this.boldTags);
    } else if(key == this.I && this.state.ctrlPressed) {

      this.setStyle(start, end, event, this.italicTags);
    } else if (key == this.CTRL) {
      this.state.ctrlPressed = false;
    }
  }

  setStyle (start, end, event, currentTag) {

    let tag = currentTag.OPEN;
    let newStyle = this.styles.BOLD;
    let newValue = this.state.value;
    let length = 3;

    if(this.state.textStyle == this.styles.BOLD) { // TODO: use italic too
      tag = currentTag.CLOSE;
      newStyle = this.styles.NONE;
      length = 4;
    }

    if(start == end) {
      newValue += tag;
      if(end < this.state.value.length) {
        newValue = this.state.value.substring(0, start) + tag + this.state.value.substring(end);
        length = tag.length;
      }
    } else {
      const before = this.state.value.substring(0, start) + tag;
      const current = this.state.value.substring(start, end);
      let after = this.state.value.substring(end) + currentTag.CLOSE;
      if(end < this.state.value.length)
        after = currentTag.CLOSE + this.state.value.substring(end);
      newValue = before + current + after;
      newStyle = this.styles.NONE;
    }

    this.setState({
      value: newValue,
      textStyle: newStyle
    });

    event.target.selectionEnd += length;
    event.preventDefault();
  }

  change (event) {
    this.setState({value: event.target.value});
  }

  render () {

    const form = (
      <p className="paragraph-block-form">
        <BlockRemove class="paragraph-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Paragraph</label>
        <textarea rows="5"
                  columns="60"
                  onKeyDown={this.handleKeyDown.bind(this)}
                  onKeyUp={this.handleKeyUp.bind(this)}
                  onChange={this.change.bind(this)}
                  value={this.state.value}>
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
