class CodeBlock extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        published: this.props.published || false,
        value: ""
      }

      this.TAB = 9;

      if (typeof this.props.code == "string" && this.props.code.length > 0) {

        this.state.value = this.props.code;
      }
  }

  indent (event) {

    const key = event.keyCode;

    if(key == this.TAB) {

        const value = event.target.value;
        const start = value.substring(0, event.target.selectionStart);
        const end = value.substring(event.target.selectionEnd);

        this.setState({value: start + "    " + end});
        event.target.selectionStart = start + 4;
        event.preventDefault();
    }
  }

  change (event) {
    this.setState({value: event.target.value});
  }

  render () {

    const form = (
      <p className="code-block-form">
        <BlockRemove class="code-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Source Code</label>
        <textarea rows="15"
                  cols="80"
                  onKeyDown={this.indent.bind(this)}
                  onChange={this.change.bind(this)}
                  value={this.state.value}
                  name="article[blocks][code]">
        </textarea>
      </p>
    );

    const source = (
      <pre>
        <code>
          {this.state.value}
        </code>
      </pre>
    );

    if(this.state.published) {
        return source;
    } else {
        return form;
    }
  }
}

CodeBlock.propTypes = {
  source: React.PropTypes.string
};
