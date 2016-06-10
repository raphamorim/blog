class ParagraphBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false
      }
  }

  render () {

    const form = (
      <p>
        <label>Paragraph</label>
        <textarea rows="5" columns="60"></textarea>
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
