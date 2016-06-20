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

    /* Key Codes */
    this.CTRL = 17;
    this.B = 66;
    this.I = 73;

    /* Tag bold symbols */
    this.boldTags = {
      OPEN: "<b>",
      CLOSE: "</b>"
    }

    /* Tag italic symbols */
    this.italicTags = {
      OPEN: "<i>",
      CLOSE: "</i>"
    }
  }

  /**
   * Set the state for CTRL key pressed
   */
  handleKeyDown (event) {

    const key = event.keyCode;

    if(key == this.CTRL) {
      this.state.ctrlPressed = true;
    }
  }

  /**
   * Handle B or I keys pressed. The selection start and end are also read.
   * For each key, bold or italic are used. If the key is CTRL the state is
   * updated.
   */
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

  /**
   * Verifies the current style and sets new one
   */
  checkStyle (data, tagType) {

    const current = this.state.textStyle;

    if(current == this.styles.BOLD || current == this.styles.ITALIC) {
      data.tag = tagType.CLOSE;
      data.newStyle = this.styles.NONE;
      data.length = 4;
    }
  }

  /**
   * Open or close tags at cursor place
   */
  openOrCloseTag(data, start, end) {

    /* Appends tag on text */
    data.newValue += data.tag;

    /* Inserts tag in the middle of a text */
    if(end < this.state.value.length) {

      const before = this.state.value.substring(0, start);
      const after = this.state.value.substring(end);

      data.newValue = before + data.tag + after;
      data.length = data.tag.length;
    }
  }

  /**
   * Wraps selected text with the tag type (bold or italic)
   */
  wrapSelectionWithTag (data, start, end, tagType) {

    const before = this.state.value.substring(0, start) + data.tag;
    const current = this.state.value.substring(start, end);
    let after = this.state.value.substring(end) + tagType.CLOSE;

    if(end < this.state.value.length)
      data.after = tagType.CLOSE + this.state.value.substring(end);

    data.newValue = before + current + after;
    data.newStyle = this.styles.NONE;
  }

  /**
   * Sets the style of the current selection or open/close bold or italic tags
   */
  setStyle (start, end, event, tagType) {

    let data = {
      tag: tagType.OPEN,
      newStyle: (tagType==this.boldTags)? this.styles.BOLD: this.styles.ITALIC,
      newValue: this.state.value,
      length: 3,
    };

    this.checkStyle(data, tagType);

    if(start == end) {
      this.openOrCloseTag(data, start, end);

    } else {
      this.wrapSelectionWithTag(data, start, end, tagType);
    }

    this.setState({
      value: data.newValue,
      textStyle: data.newStyle
    });

    event.target.selectionEnd += data.length;
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
                  value={this.state.value}
                  name="article[blocks][paragraph]">
        </textarea>
      </p>
    );

    const paragraph = (
      <p>{this.props.text}</p>
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
