class CodeBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false,
        value: ""
      }

      this.TAB = 9;
  }

  indent (event) {

    if(event.keyCode == this.TAB) {

        const value = event.target.value;
        const start = value.substring(0, event.target.selectionStart);
        const end = value.substring(event.target.selectionEnd);

        this.setState({value: start + "\t" + end});
        event.target.selectionStart = start + 1;
    } else {
        this.setState({value: event.target.value + event.keyCode});
    }
  }

  render () {
    const form = (
      <p className="code-block-form">
        <BlockRemove class="code-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Source Code</label>
        <textarea rows="15" cols="80" onKeyDown={this.indent.bind(this)} value={this.state.value}>
        </textarea>
      </p>
    );

    const source = (
        <pre className="prettyprint linenums">{this.props.source}</pre>
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
