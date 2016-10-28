class ParagraphBlock extends React.Component {

  propTypes: {
    text: React.PropTypes.string
  }

  constructor (props) {
    super(props);

    this.state = {
      published: this.props.published || false,
      ctrlPressed: false,
      anchor: false,
      value: this.props.text || "",
      focus: false
    }

    this.CTRL = 17;
    this.L = 76;
    this.currentAnchor = undefined;
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

    event.preventDefault();

    const key = event.keyCode;
    const selection = window.getSelection();
    const start = selection.anchorOffset;
    const end = selection.focusOffset;

    if(key == this.L && this.state.ctrlPressed) {
      this.insertLinkInput(event);
    } else if (key == this.CTRL) {
      this.state.ctrlPressed = false;
    }
  }


  /**
   * Inserts tag a after paragraph to use as link url
   */
  insertLinkInput (event) {

    if (window.getSelection().toString()) {

        this.currentAnchor = document.createElement('a');
        this.currentAnchor.target = "_blank";
        window.getSelection().getRangeAt(0).surroundContents(this.currentAnchor);

        this.setState({
          anchor: true
        });
    }

    event.preventDefault();
  }


  /**
   * Sets the current anchor url based on input url
   */
  setLinkUrl (event) {

      const url = event.target.value;
      this.currentAnchor.href = url;
      this.currentAnchor = undefined;

      this.setState({
        anchor: false,
      });

      const div = document.getElementById("div-paragraph-" + this.props.order);
      div.focus();
      event.stopPropagation();
  }

  change (event) {
    let input = document.getElementById("paragraph-" + this.props.order);
    input.value = event.target.innerHTML;
  }


  /**
   * Allows paragraph div edition
   */
  allowEdition (event) {

    const element = event.target;
    if(!element.isContentEditable) {

        element.contentEditable = true;
        element.style.backgroundColor = "#111";
    }
  }


  /**
   * Closes paragraph div edition
   */
  closeEdition (event) {

    const element = event.target;
    if(element.isContentEditable) {

        element.contentEditable = false;
        element.style.backgroundColor = "black";
    }
  }


  render () {

    let anchor = "";
    if(this.state.anchor) {
        anchor = (
          <input
            className="anchor-input"
            type="url"
            autoFocus
            onBlur={this.setLinkUrl.bind(this)}
            name="anchor-input-url" />
        );
    }

    const form = (
      <p className="paragraph-block-form">
        <BlockRemove class="paragraph-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Paragraph</label>
        <div
          id={"div-paragraph-" + this.props.order}
          className="unpublished"
          onKeyDown={this.handleKeyDown.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          onInput={this.change.bind(this)}
          onClick={this.allowEdition.bind(this)}
          onBlur={this.closeEdition.bind(this)}
          dangerouslySetInnerHTML={{__html: this.state.value}} />
        {anchor}
        <input
          type="hidden"
          id={"paragraph-" + this.props.order}
          name={"article[blocks][" + this.props.order + "][paragraph]"} />
      </p>
    );

    const paragraph = (
      <p className="published" dangerouslySetInnerHTML={{__html: this.state.value}} />
    );

    if(this.state.published) {
        return paragraph;
    } else {
        return form;
    }
  }
}
